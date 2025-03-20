import { Meta, StoryObj } from '@storybook/angular';
import { fireEvent, userEvent } from '@storybook/test';
import {
  createMockDataTransfer,
  createMockDragEvent,
  createMockFile,
  createMockFsDirectoryEntry,
  createMockFsFileEntry,
} from 'src/app/utils';
import {
  testFilePath1,
  testFilePath2,
  testFolderFilePath,
  testFolderName,
  testParentFolderName,
  testSubFolderFilePath1,
  testSubFolderFilePath2,
  testSubfolderName1,
  testSubfolderName2,
} from 'src/app/utils/file-selection/spec.data';

import {
  DEFAULT_FILE_SELECTOR_TEXT,
  FileSelectorComponent,
} from './file-selector.component';

const originalFireEventDrop = fireEvent.drop;

type ComponentWithCustomControls = FileSelectorComponent;
type Story = StoryObj<ComponentWithCustomControls>;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'Components/File Selector',
  component: FileSelectorComponent,
  // decorators: [moduleMetadata({ imports: [] }), applicationConfig({ providers: [ importProvidersFrom() ]})],
  parameters: {
    docs: { description: { component: `FileSelector` } },
  },
  argTypes: {
    /** === Output Actions === */
    filesSelected: { action: 'filesSelected', table: { disable: true } },
  },
  args: {
    text: DEFAULT_FILE_SELECTOR_TEXT,
    multiple: true,
    webkitdirectory: true,
  },
};
export default meta;

export const FileSelector: Story = {};

export const FileSelectorTests: Story = {
  play: async ({ canvasElement, step }) => {
    await step('2 files', async () => {
      await filesSelectHandler(canvasElement);
      await filesDropHandler(canvasElement);
    });

    await step('a folder with a file', async () => {
      await folderSelectHandler(canvasElement);
      await folderDropHandler(canvasElement);
    });

    await step('nested folders with files', async () => {
      await nestedFolderSelectHandler(canvasElement);
      await nestedFolderDropHandler(canvasElement);
    });
  },
};

// #region Drop
/**  Simulate file drop and check if the "filesSelected" action is triggered */
async function filesDropHandler(canvasElement: HTMLElement) {
  const dropZone = canvasElement.querySelector('[appFileDrop]') as HTMLElement;
  if (!dropZone) throw new Error('Drop zone not found');

  const files = [testFilePath1, testFilePath2].map(createMockFsFileEntry);
  const dataTransfer = createMockDataTransfer(files);

  await fireEvent.dragOver(dropZone);

  // Small delay to simulate realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 100));

  // const dropEvent = createMockDragEvent('drop', dataTransfer);
  // console.log(`dropEvent`, dropEvent);
  // fireEvent.drop(dropZone, dropEvent);

  // const myDropEvent = createEvent.drop(dropZone);
  // Object.defineProperty(myDropEvent, 'dataTransfer', {
  //   value: dataTransfer,
  //   writable: true,
  // });
  // console.log(`myDropEvent`, myDropEvent);
  // await fireEvent(dropZone, myDropEvent);

  patchFireEventDrop(dataTransfer);
  await fireEvent.drop(dropZone);
}

/** Simulate folder drop with a file inside and check if the "filesSelected" action is triggered */
async function folderDropHandler(canvasElement: HTMLElement) {
  const dropZone = canvasElement.querySelector('[appFileDrop]') as HTMLElement;
  if (!dropZone) throw new Error('Drop zone not found');

  const file1 = createMockFsFileEntry(testFolderFilePath);
  const folder = createMockFsDirectoryEntry(testFolderName, [file1]);

  const dataTransfer = createMockDataTransfer([folder]);

  await fireEvent.dragOver(dropZone);
  await new Promise((resolve) => setTimeout(resolve, 100));
  patchFireEventDrop(dataTransfer);
  await fireEvent.drop(dropZone);
}

/**Simulate nested folder drop and check if the "filesSelected" action is triggered */
async function nestedFolderDropHandler(canvasElement: HTMLElement) {
  const dropZone = canvasElement.querySelector('[appFileDrop]') as HTMLElement;
  if (!dropZone) throw new Error('Drop zone not found');

  const file1 = createMockFsFileEntry(testSubFolderFilePath1);
  const file2 = createMockFsFileEntry(testSubFolderFilePath2);

  const childFolder1 = createMockFsDirectoryEntry(testSubfolderName1, [file1]);
  const childFolder2 = createMockFsDirectoryEntry(testSubfolderName2, [file2]);
  const parentFolder = createMockFsDirectoryEntry(testParentFolderName, [
    childFolder1,
    childFolder2,
  ]);

  const dataTransfer = createMockDataTransfer([parentFolder]);

  await fireEvent.dragOver(dropZone);
  await new Promise((resolve) => setTimeout(resolve, 100));
  patchFireEventDrop(dataTransfer);
  await fireEvent.drop(dropZone);
}
// #endregion

// #region Select
/** Simulates file selection via file input (file-select.directive.ts) */
async function filesSelectHandler(canvasElement: HTMLElement) {
  await selectFiles(canvasElement, [
    createMockFile(testFilePath1),
    createMockFile(testFilePath2),
  ]);
}

/** Simulates folder selection via file input (file-select.directive.ts) */
async function folderSelectHandler(canvasElement: HTMLElement) {
  await selectFiles(canvasElement, [createMockFile(testFolderFilePath)]);
}

/** Simulates nested folder selection via file input (file-select.directive.ts) */
async function nestedFolderSelectHandler(canvasElement: HTMLElement) {
  await selectFiles(canvasElement, [
    createMockFile(testSubFolderFilePath1),
    createMockFile(testSubFolderFilePath2),
  ]);
}
// #endregion

// #region Utils
/** Simulates file selection via file input (file-select.directive.ts) */
async function selectFiles(canvasElement: HTMLElement, files: File[]) {
  const input = canvasElement.querySelector(
    '[appFileSelect]',
  ) as HTMLInputElement;
  await userEvent.upload(input, files);
}

/**
 * Monkey patching storybooks drop event to get both the log and the dataTransfer set correctly,
 * otherwise its either or and i could not figure out why.
 */
function patchFireEventDrop(dataTransfer: DataTransfer) {
  fireEvent.drop = async (element, options): Promise<true> => {
    // Call the original fireEvent.drop() so Storybook logs the event
    const result = await originalFireEventDrop(element, options);

    // Create a mock drag event with attached dataTransfer prop
    const dropEvent = createMockDragEvent('drop', dataTransfer);
    element.dispatchEvent(dropEvent);

    return result as true; // Ensure correct return type
  };
}
// #endregion
