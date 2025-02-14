/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import {
  createFileInputChangeEvent,
  createMockDataTransfer,
  createMockDragEvent,
  createMockFile,
  createMockFsFileEntry,
} from './browser-mocks.util';
import { FileDropDirective } from './file-drop/file-drop.directive';
import { FileSelectDirective } from './file-select/file-select.directive';
import { FileSelection } from './file-selection.model';
import { expectSelectedFiles, testFilePath1, testFilePath2 } from './spec.data';

// #region Tests
// ========================================================================== //
describe('FileDropDirective & FileSelectDirective', () => {
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileDropDirective, FileSelectDirective, TestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  test.each([
    {
      description: 'Test A - 2 files',
      inputFilePaths: [testFilePath1, testFilePath2],
      expectedObjects: [expectSelectedFiles.file1, expectSelectedFiles.file2],
    },
    // {
    //   description: 'Test B - A folder with a file',
    //   inputFilePaths: [testFolderFilePath],
    //   expectedObjects: [expectSelectedFolderFiles.file1],
    // },
    // {
    //   description: 'Test C - Nested folders with files',
    //   inputFilePaths: [testSubFolderFilePath1, testSubFolderFilePath2],
    //   expectedObjects: [
    //     expectSelectedSubFolderFiles.file1,
    //     expectSelectedSubFolderFiles.file2,
    //   ],
    // },
  ])('$description', async ({ inputFilePaths, expectedObjects }) => {
    // Set up listeners before triggering events
    const droppedPromise = firstValueFrom(component.filesDropped);
    const selectedPromise = firstValueFrom(component.filesSelected);

    // Trigger events
    triggerFileDrop(inputFilePaths);
    triggerFileSelect(inputFilePaths);

    // Wait for both promises to resolve
    const [droppedFiles, selectedFiles] = await Promise.all([
      droppedPromise,
      selectedPromise,
    ]);

    expect(droppedFiles.length).toBe(selectedFiles.length);
    expect(droppedFiles.length).toBe(2);

    expect(droppedFiles).toEqual(
      expectedObjects.map((o) => expect.objectContaining(o)),
    );

    expect(droppedFiles.map(getFileSelectionBaseName)).toEqual(
      selectedFiles.map(getFileSelectionBaseName),
    );
    expect(droppedFiles.map(getFileSelectionBaseName)).toEqual(inputFilePaths);
  });
});

function getFileSelectionBaseName(files: FileSelection): string {
  return files.baseName;
}

// #endregion

// #region Helper mock methods
// ========================================================================== //
function triggerFileDrop(inputFilePaths: string[]) {
  // TODO: Handle auto folder creation from paths
  const fileEntries: FileSystemFileEntry[] = inputFilePaths.map(
    createMockFsFileEntry,
  );
  const dataTransfer: DataTransfer = createMockDataTransfer(fileEntries);
  const dropEvent: DragEvent = createMockDragEvent('drop', dataTransfer);
  const dropElement = document.querySelector('[appFileDrop]') as HTMLElement;
  dropElement.dispatchEvent(dropEvent);
}

function triggerFileSelect(inputFilePaths: string[]) {
  const files: File[] = inputFilePaths.map((fp) => createMockFile(fp));

  const inputElement = document.querySelector(
    '[appFileSelect]',
  ) as HTMLInputElement;

  // Object.defineProperty(inputElement, 'files', {
  //   value: [...files],
  //   writable: false,
  // });

  // const changeEvent = new Event('change');

  const changeEvent = createFileInputChangeEvent(files);
  inputElement.dispatchEvent(changeEvent);
}
// #endregion

// #region Mock Component
// ========================================================================== //
@Component({
  template: `
    <div (filesSelected)="onFilesDropped($event)" appFileDrop></div>
    <input
      (filesSelected)="onFilesSelected($event)"
      type="file"
      appFileSelect
      multiple
      webkitdirectory
    />
  `,
  imports: [FileDropDirective, FileSelectDirective],
})
export class TestComponent {
  public filesSelected = new EventEmitter<FileSelection[]>();
  public filesDropped = new EventEmitter<FileSelection[]>();

  onFilesSelected(files: FileSelection[]) {
    this.filesSelected.emit(files);
  }

  onFilesDropped(files: FileSelection[]) {
    this.filesDropped.emit(files);
  }
}
// #endregion
