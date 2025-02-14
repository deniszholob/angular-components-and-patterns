import {
  createFileInputChangeEvent,
  createMockFile,
} from '../browser-mocks.util';
import {
  expectSelectedFiles,
  expectSelectedFolderFiles,
  expectSelectedSubFolderFiles,
  testFilePath1,
  testFilePath2,
  testFolderFilePath,
  testSubFolderFilePath1,
  testSubFolderFilePath2,
} from '../spec.data';
import { FileSelectDirective } from './file-select.directive';

describe('FileSelectDirective', () => {
  let directive: FileSelectDirective;
  let eventEmitterSpy: jest.SpyInstance;

  beforeEach(() => {
    directive = new FileSelectDirective();
    eventEmitterSpy = jest.spyOn(directive.filesSelected, 'emit');
  });

  it('should emit filesSelected event when files are selected', () => {
    const file1 = createMockFile(testFilePath1);
    const file2 = createMockFile(testFilePath2);

    const fileSelectEvent = createFileInputChangeEvent([file1, file2]);
    directive.onFileSelect(fileSelectEvent);

    expect(eventEmitterSpy).toHaveBeenCalledWith([
      expect.objectContaining({
        ...expectSelectedFiles.file1,
        mimeType: 'text/plain',
        file: file1,
      }),
      expect.objectContaining({
        ...expectSelectedFiles.file2,
        mimeType: 'text/plain',
        file: file2,
      }),
    ]);
  });

  it('should emit event with correct relativePath for folder with a file', () => {
    const file1 = createMockFile(testFolderFilePath);

    const fileSelectEvent = createFileInputChangeEvent([file1]);
    directive.onFileSelect(fileSelectEvent);

    expect(eventEmitterSpy).toHaveBeenCalledWith([
      expect.objectContaining(expectSelectedFolderFiles.file1),
    ]);
  });

  it('should emit event with correct relativePath for nested folders with files', () => {
    const file1 = createMockFile(testSubFolderFilePath1);
    const file2 = createMockFile(testSubFolderFilePath2);

    const fileSelectEvent = createFileInputChangeEvent([file1, file2]);
    directive.onFileSelect(fileSelectEvent);

    expect(eventEmitterSpy).toHaveBeenCalledWith([
      expect.objectContaining(expectSelectedSubFolderFiles.file1),
      expect.objectContaining(expectSelectedSubFolderFiles.file2),
    ]);
  });

  it('should not emit filesSelected event if no files are selected', () => {
    const fileSelectEvent: Event = createFileInputChangeEvent(null);
    directive.onFileSelect(fileSelectEvent);

    expect(eventEmitterSpy).not.toHaveBeenCalled();
  });
});
