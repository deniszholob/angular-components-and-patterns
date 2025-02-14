import { EventEmitter } from '@angular/core';

export interface FileSelectionDirectiveI {
  /** Emits an array of FileSelection when files are selected */
  filesSelected: EventEmitter<FileSelection[]>;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 * @see https://nodejs.org/api/path.html#pathparsepath
 */
export interface FileSelection {
  /* Web Api File Object */
  file: File;
  /** Relative to selected/dragged folder root
   * /folder/fileName.fileExtension */
  relativePath: string;
  /** fileName.fileExtension */
  baseName: string;
  /** bytes */
  size: number;
  /** unix timestamp */
  lastModified: number;
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types */
  mimeType: string;
}

export function getFileSelectionFromFile(file: File): FileSelection {
  // console.log('getFileSelectionFromFile', file);
  let relativePath = file.webkitRelativePath;
  if (!relativePath || relativePath.length === 0) {
    relativePath = file.name;
  }
  return {
    file,
    relativePath,
    baseName: file.name,
    size: file.size,
    lastModified: file.lastModified,
    mimeType: file.type,
  };
}
