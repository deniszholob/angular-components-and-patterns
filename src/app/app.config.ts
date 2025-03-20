import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';

// import { environment } from '../environments/environment';
import { APP_BUILD_DATE, APP_BUILD_VERSION } from './app.build';
import { appRoutes } from './app.routes';
import { AppErrorsModule, AppTitleService } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(
      appRoutes,
      // withEnabledBlockingInitialNavigation(),
      // withInMemoryScrolling({
      //   anchorScrolling: 'enabled',
      //   scrollPositionRestoration: 'enabled',
      // }),
      // withRouterConfig({
      //   onSameUrlNavigation: 'reload',
      // })
    ),
    importProvidersFrom(BrowserModule, AppErrorsModule),
    { provide: Window, useValue: window },
    { provide: TitleStrategy, useClass: AppTitleService },
    // { provide: 'ENVIRONMENT', useValue: environment },
    /** @use in constructor: @Inject('APP_BUILD_VERSION') protected readonly APP_BUILD_VERSION: string */
    { provide: 'APP_BUILD_VERSION', useValue: APP_BUILD_VERSION },
    /** @use in constructor: @Inject('APP_BUILD_DATE') protected readonly APP_BUILD_DATE: number */
    { provide: 'APP_BUILD_DATE', useValue: APP_BUILD_DATE },
  ],
};
