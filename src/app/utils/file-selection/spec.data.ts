// Input and Expected test values for both drop and select directives
// to make sure matching output for both

// #region select/drop 2 files
export const testFilePath1 = 'file1.txt';
export const testFilePath2 = 'file2.txt';
export const expectSelectedFiles = {
  file1: {
    baseName: testFilePath1,
    relativePath: testFilePath1,
  },
  file2: {
    baseName: testFilePath2,
    relativePath: testFilePath2,
  },
};
// #endregion

// #region select/drop file in folder
export const testFolderName = 'folder';
export const testFolderFilePath = `${testFolderName}/${testFilePath1}`;
export const expectSelectedFolderFiles = {
  file1: {
    baseName: testFilePath1,
    relativePath: testFolderFilePath,
  },
};
// #endregion

// #region select/drop nested: folder with 2 folders with 1 file inside each
export const testParentFolderName = 'parentFolder';
export const testSubfolderName1 = 'subfolder1';
export const testSubfolderName2 = 'subfolder2';
export const testSubFolderFilePath1 = `${testParentFolderName}/${testSubfolderName1}/${testFilePath1}`;
export const testSubFolderFilePath2 = `${testParentFolderName}/${testSubfolderName2}/${testFilePath2}`;
export const expectSelectedSubFolderFiles = {
  file1: {
    baseName: testFilePath1,
    relativePath: testSubFolderFilePath1,
  },
  file2: {
    baseName: testFilePath2,
    relativePath: testSubFolderFilePath2,
  },
};
// #endregion
