import { Provider } from '@angular/core';

export const MOCK_APP_BUILD_DATE_Token: Provider = {
  provide: 'APP_BUILD_DATE',
  useValue: 0,
};
export const MOCK_APP_BUILD_VERSION_Token: Provider = {
  provide: 'APP_BUILD_VERSION',
  useValue: '0.0.0',
};
