import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { EMPTY, from, mergeMap, Observable, take, tap, toArray } from 'rxjs';

import { typedNullCheck } from '../../object/object.util';
import { stripStartString } from '../../string/string.util';
import {
  FileSelection,
  getFileSelectionFromFile,
} from '../file-selection.model';

export const DEFAULT_DRAG_OVER_CLASS = 'dragover';

@Directive({ selector: '[appFileDrop]', standalone: true })
export class FileDropDirective {
  @Input()
  public dragOverClass: string = DEFAULT_DRAG_OVER_CLASS;
  @Output()
  public dragOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public filesSelected: EventEmitter<FileSelection[]> = new EventEmitter<
    FileSelection[]
  >();

  constructor(private cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  protected get elementClass(): string {
    return this.isDragOver ? this.dragOverClass : DEFAULT_DRAG_OVER_CLASS;
  }

  public isDragOver: boolean = false;

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    this.stopEventAndSetIsDragOver(event, true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    this.stopEventAndSetIsDragOver(event, false);
  }

  private stopEventAndSetIsDragOver(
    event: DragEvent,
    isDragOver: boolean = false,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.emit(isDragOver);
    this.isDragOver = isDragOver;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    this.onDragLeave(event);

    const itemList: DataTransferItemList | undefined =
      event.dataTransfer?.items;
    if (!itemList || itemList.length === 0) return;

    getFileSelectionsFromDataTransferItemList(itemList)
      .pipe(
        take(1),
        tap((selectedFiles: FileSelection[]): void => {
          console.log('Files selected from drop:', selectedFiles);
          this.filesSelected.emit(selectedFiles);
          this.cdr.detectChanges();
        }),
      )
      .subscribe();
  }
}

function getFileSelectionsFromDataTransferItemList(
  itemList: DataTransferItemList,
): Observable<FileSelection[]> {
  const fileSystemEntries: FileSystemEntry[] =
    getFileSystemEntriesFromDataTransferItems(Array.from(itemList));
  return from(fileSystemEntries).pipe(
    mergeMap((fileSystemEntries) => extractEntry(fileSystemEntries)),
    toArray(),
  );
}

/** @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry */
function getFileSystemEntriesFromDataTransferItems(
  items: DataTransferItem[],
): FileSystemEntry[] {
  return items
    .filter((item) => item.kind === 'file')
    .map((item) => item.webkitGetAsEntry())
    .filter(typedNullCheck);
}

/** Recursively extracts files from directories */
function extractEntry(entry: FileSystemEntry): Observable<FileSelection> {
  if (entry.isFile) {
    return readFileEntry(entry as FileSystemFileEntry);
  } else if (entry.isDirectory) {
    return readDirectoryEntry(entry as FileSystemDirectoryEntry);
  }
  return EMPTY; // Return empty observable if neither
}

/** Reads file entries */
function readFileEntry(
  fileEntry: FileSystemFileEntry,
): Observable<FileSelection> {
  return new Observable<FileSelection>((observer) => {
    fileEntry.file((file: File) => {
      const fileSelection = getFileSelectionFromFile(file);
      fileSelection.relativePath = stripStartString(fileEntry.fullPath, '/');

      observer.next(fileSelection);
      observer.complete();
    });
  });
}

/** Reads directories and processes their entries recursively */
function readDirectoryEntry(
  directoryEntry: FileSystemDirectoryEntry,
): Observable<FileSelection> {
  return new Observable<FileSystemEntry[]>((observer) => {
    const reader = directoryEntry.createReader();
    reader.readEntries((entries: FileSystemEntry[]) => {
      observer.next(entries);
      observer.complete();
    });
  }).pipe(
    mergeMap((entries) => from(entries)), // Flatten the array into an observable sequence
    mergeMap((entry) => extractEntry(entry)), // Recursively process each entry
  );
}
