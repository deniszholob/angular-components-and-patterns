import { AbstractControl, FormControl, NgControl } from '@angular/forms';

import { DisplayAsDirective } from './display-as.directive';

class MockNgControl extends NgControl {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  public override viewToModelUpdate(newValue: any): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override get control(): AbstractControl<any, any> | null {
    return new FormControl();
  }
}

const MOCK_NgControl: NgControl = new MockNgControl();

describe('DisplayAsDirective', () => {
  let directive: DisplayAsDirective;

  beforeEach(() => {
    directive = new DisplayAsDirective(MOCK_NgControl);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
