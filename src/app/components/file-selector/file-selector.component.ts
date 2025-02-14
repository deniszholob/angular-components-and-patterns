import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileDropDirective, FileSelectDirective } from 'src/app/utils';
import { FileSelection } from 'src/app/utils/file-selection/file-selection.model';

export const DEFAULT_FILE_SELECTOR_TEXT: string =
  'Drag & drop or click to upload';
@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, FileDropDirective, FileSelectDirective],
})
export class FileSelectorComponent {
  @Input()
  public text: string = DEFAULT_FILE_SELECTOR_TEXT;
  @Input()
  public multiple: boolean = false;
  @Input()
  public webkitdirectory: boolean = false;

  @Output()
  public filesSelected: EventEmitter<FileSelection[]> = new EventEmitter<
    FileSelection[]
  >();

  protected files: FileSelection[] = [];

  public onFileSelect(files: FileSelection[]): void {
    this.files = files;
    this.filesSelected.emit(files);
  }
}
