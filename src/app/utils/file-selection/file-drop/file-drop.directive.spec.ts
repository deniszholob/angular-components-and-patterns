import { ChangeDetectorRef } from '@angular/core';

import {
  createMockDataTransfer,
  createMockDragEvent,
  createMockFsDirectoryEntry,
  createMockFsFileEntry,
} from '../browser-mocks.util';
import {
  expectSelectedFiles,
  expectSelectedFolderFiles,
  expectSelectedSubFolderFiles,
  testFilePath1,
  testFilePath2,
  testFolderFilePath,
  testFolderName,
  testParentFolderName,
  testSubFolderFilePath1,
  testSubFolderFilePath2,
  testSubfolderName1,
  testSubfolderName2,
} from '../spec.data';
import {
  DEFAULT_DRAG_OVER_CLASS,
  FileDropDirective,
} from './file-drop.directive';

describe('FileDropDirective', () => {
  let directive: FileDropDirective;
  let mockChangeDetectorRef: ChangeDetectorRef;
  let mockDragOver: jest.SpyInstance;

  beforeEach(() => {
    mockChangeDetectorRef = {
      detectChanges: jest.fn(),
    } as unknown as ChangeDetectorRef;
    directive = new FileDropDirective(mockChangeDetectorRef);
    mockDragOver = jest.spyOn(directive.dragOver, 'emit');
  });

  afterEach(() => {
    jest.clearAllMocks(); // This will clear all mocks and spies
  });

  test('should emit selected files when 2 files are dropped', (done) => {
    const file1 = createMockFsFileEntry(testFilePath1);
    const file2 = createMockFsFileEntry(testFilePath2);

    const dataTransfer = createMockDataTransfer([file1, file2]);
    const dropEvent: DragEvent = createMockDragEvent('drop', dataTransfer);

    // Subscribe to the event and call `done()` when it emits
    directive.filesSelected.subscribe((files) => {
      expect(files).toEqual([
        expect.objectContaining(expectSelectedFiles.file1),
        expect.objectContaining(expectSelectedFiles.file2),
      ]);
      done();
    });

    directive.onDrop(dropEvent);
  });

  test('should emit selected file when a folder with a file is dropped', (done) => {
    const file1 = createMockFsFileEntry(testFolderFilePath);
    const folder = createMockFsDirectoryEntry(testFolderName, [file1]);

    const dataTransfer = createMockDataTransfer([folder]);
    const dropEvent: DragEvent = createMockDragEvent('drop', dataTransfer);

    // Subscribe to the event and call `done()` when it emits
    directive.filesSelected.subscribe((files) => {
      expect(files).toEqual([
        expect.objectContaining(expectSelectedFolderFiles.file1),
      ]);
      done();
    });

    directive.onDrop(dropEvent);
  });

  test('should emit files from nested folders', (done) => {
    const file1 = createMockFsFileEntry(testSubFolderFilePath1);
    const file2 = createMockFsFileEntry(testSubFolderFilePath2);

    const childFolder1 = createMockFsDirectoryEntry(testSubfolderName1, [
      file1,
    ]);
    const childFolder2 = createMockFsDirectoryEntry(testSubfolderName2, [
      file2,
    ]);
    const parentFolder = createMockFsDirectoryEntry(testParentFolderName, [
      childFolder1,
      childFolder2,
    ]);

    const dataTransfer = createMockDataTransfer([parentFolder]);
    const dropEvent: DragEvent = createMockDragEvent('drop', dataTransfer);

    // Subscribe to the event and call `done()` when it emits
    directive.filesSelected.subscribe((files) => {
      expect(files).toEqual([
        expect.objectContaining(expectSelectedSubFolderFiles.file1),
        expect.objectContaining(expectSelectedSubFolderFiles.file2),
      ]);
      done();
    });

    directive.onDrop(dropEvent);
  });

  test('should not emit anything when itemList is empty', (done) => {
    const dataTransfer = createMockDataTransfer([]); // Empty item list
    const dropEvent: DragEvent = createMockDragEvent('drop', dataTransfer);

    // Spy on the filesSelected event
    const spy = jest.spyOn(directive.filesSelected, 'emit');

    directive.onDrop(dropEvent);

    // Give some time for async processing, but ensure nothing is emitted
    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled(); // Ensure the event was not emitted
      done();
    }, 100); // 100ms timeout for async check
  });

  test('should emit dragOver when drag event occurs', () => {
    const event = createMockDragEvent('drop', createMockDataTransfer([]));

    directive.onDragOver(event);

    expect(mockDragOver).toHaveBeenCalledWith(true);
    expect(directive.isDragOver).toBe(true);
  });

  test('should emit dragOver false when drag leaves', () => {
    const event = createMockDragEvent('drop', createMockDataTransfer([]));

    directive.onDragLeave(event);

    expect(mockDragOver).toHaveBeenCalledWith(false);
    expect(directive.isDragOver).toBe(false);
  });

  test('should return dragOverClass when isDragOver is true', () => {
    directive.isDragOver = true;

    // elementClass is protected, workaround with cast to any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((directive as any).elementClass).toBe(directive.dragOverClass);
  });

  test('should return DEFAULT_DRAG_OVER_CLASS when isDragOver is false', () => {
    directive.isDragOver = false;

    // elementClass is protected, workaround with cast to any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((directive as any).elementClass).toBe(DEFAULT_DRAG_OVER_CLASS);
  });
});
