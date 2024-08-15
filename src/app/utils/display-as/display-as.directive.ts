import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, startWith, Subject, takeUntil } from 'rxjs';

import { typedNullCheck } from '../object/object.util';

/** @usage 
 ```html
<input 
  [formControl]="control"
  [appDisplayAs]="displayAs"
/>
```
 */
@Directive({ selector: '[appDisplayAs]' })
export class DisplayAsDirective implements OnInit, OnDestroy {
  private static readonly DEFAULT_DISPLAY_FIELD: string = 'displayAs';
  private readonly clearSub$: Subject<void> = new Subject<void>();

  @Input()
  public appDisplayAs?: string;

  constructor(private ngControl: NgControl) {}

  public ngOnInit(): void {
    this.ngControl.control?.valueChanges
      .pipe(
        startWith(this.ngControl.control?.value),
        filter(typedNullCheck),
        takeUntil(this.clearSub$),
      )
      .subscribe((v: any): void => {
        const displayAs: string =
          this.appDisplayAs ?? DisplayAsDirective.DEFAULT_DISPLAY_FIELD;
        this.ngControl.valueAccessor?.writeValue(v[displayAs] ?? v);
      });
  }

  public ngOnDestroy(): void {
    this.clearSub$.next();
    this.clearSub$.complete();
  }
}
