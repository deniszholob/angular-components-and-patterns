// #region File Mock
export function createMockFile(
  path: string = 'test-file.txt',
  lastModified: number = Date.now(),
  type = 'text/plain',
): File {
  const name = path.split('/').pop() ?? path;
  const file = new File(['Test File Content'], name, { type, lastModified });
  // From manual testing:
  // if uploading a file then webkitRelativePath will be empty
  // if uploading a folder then webkitRelativePath will have a path
  const browserApiPath = path.includes('/') ? path : '';
  Object.defineProperty(file, 'webkitRelativePath', { value: browserApiPath });
  return file;
}

export function createMockFileList(files: File[]): FileList {
  return {
    length: files.length,
    item: (index: number) => files[index] || null,
    [Symbol.iterator]() {
      return files.values();
    },
  } as FileList;
}
// #endregion

// #region FileSystemEntry DataTransfer mocks
export function createMockFsFileEntry(path: string): FileSystemFileEntry {
  const name = path.split('/').pop() ?? path;

  return {
    isFile: true,
    isDirectory: false,
    // file: jest.fn((callback) => callback(createMockFile(name))),
    file(callback: (file: File) => void) {
      callback(createMockFile(name));
    },
    fullPath: path.startsWith('/') ? path : `/${path}`,
  } as unknown as FileSystemFileEntry;
}

export function createMockFsDirectoryEntry(
  name: string,
  children: FileSystemEntry[],
): FileSystemDirectoryEntry {
  return {
    isDirectory: true,
    isFile: false,
    name,
    fullPath: `/${name}`,
    createReader: () => ({
      readEntries: (callback: (entries: FileSystemEntry[]) => void) => {
        callback(children);
      },
    }),
  } as unknown as FileSystemDirectoryEntry;
}

export function createMockDataTransfer(entry: FileSystemEntry[]): DataTransfer {
  return {
    items: entry.map((item) => createMockDataTransferItem(item)),
  } as unknown as DataTransfer;
}

function createMockDataTransferItem(entry: FileSystemEntry): DataTransferItem {
  return {
    kind: 'file',
    webkitGetAsEntry: () => entry,
  } as unknown as DataTransferItem;
}
// #endregion

// #region Event creation
export function createMockDragEvent(
  type: 'drop' | 'dragover',
  dataTransfer: DataTransfer,
): DragEvent {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  }) as DragEvent;

  Object.defineProperty(event, 'dataTransfer', {
    value: dataTransfer,
    writable: false,
  });

  return event;
}

export function createFileInputChangeEvent(files: File[] | null): Event {
  const event: Event = new Event('change', { bubbles: true });
  Object.defineProperty(event, 'target', {
    writable: false,
    value: { files },
  });
  return event;
}

export function setUpMockFileInput(files: FileList): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file'; // Make sure this is a file input element
  Object.defineProperty(input, 'files', {
    value: files,
    configurable: true,
    writable: true, // Allow writing to files property
  });

  return input;
}
// #endregion

// #region Event triggers
export function mockDragFiles(
  dropZoneElement: HTMLElement,
  dataTransfer: DataTransfer,
): void {
  const dragEvent: DragEvent = createMockDragEvent('dragover', dataTransfer);
  dropZoneElement.dispatchEvent(dragEvent);
}

export function mockDropFiles(
  dropZoneElement: HTMLElement,
  dataTransfer: DataTransfer,
): void {
  const dropEvent: DragEvent = createMockDragEvent('drop', dataTransfer);
  dropZoneElement.dispatchEvent(dropEvent);
}
// #region
