import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

import {
  FileSelection,
  FileSelectionDirectiveI,
  getFileSelectionFromFile,
} from '../file-selection.model';

@Directive({ selector: '[appFileSelect]', standalone: true })
export class FileSelectDirective implements FileSelectionDirectiveI {
  @Output()
  public filesSelected: EventEmitter<FileSelection[]> = new EventEmitter<
    FileSelection[]
  >();

  @HostListener('change', ['$event'])
  public onFileSelect(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = input.files;

    if (fileList && fileList.length > 0) {
      this.filesSelected.emit(getFileSelectionsFromFileList(fileList));
    }
    reset(input);
  }
}

function getFileSelectionsFromFileList(fileList: FileList): FileSelection[] {
  return Array.from(fileList).map(getFileSelectionFromFile);
}

/** Reset input value for next selection */
function reset(input: HTMLInputElement): void {
  input.value = '';
}
