// import * as ViewPages from './pages';
import { isDevMode } from '@angular/core';
import { Route } from '@angular/router';

import { PAGE_ROUTES } from './core';
import * as ViewPages from './pages';

const DEV_ROUTE: Route[] = [];
// https://angular.dev/api/core/isDevMode?tab=description
if (isDevMode()) {
  DEV_ROUTE.push({
    path: PAGE_ROUTES.DEV_PAGE_ROOT,
    loadComponent: () =>
      import('./pages/dev-page/dev-page.component').then(
        (m) => m.DevPageComponent,
      ),
  });
}

export const appRoutes: Route[] = [
  { path: '', redirectTo: PAGE_ROUTES.HOME_PAGE_ROOT, pathMatch: 'full' },
  { path: PAGE_ROUTES.HOME_PAGE_ROOT, component: ViewPages.HomePageComponent },
  // ======================================================================== //
  // TODO: Add your routes here
  // ======================================================================== //
  ...DEV_ROUTE,
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ViewPages.NotFoundPageComponent },
];
