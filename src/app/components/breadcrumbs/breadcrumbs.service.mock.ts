import { Provider } from '@angular/core';
import { ObjectInfo } from 'src/app/utils';

import {
  BreadcrumbsService,
  getBreadcrumbLinksFromUrl,
} from './breadcrumbs.service';

export const MOCK_BreadCrumbUrl = '/home/dashboard/settings/';

export const MOCK_BreadCrumbLinks: ObjectInfo<string>[] =
  getBreadcrumbLinksFromUrl(MOCK_BreadCrumbUrl);

export const MOCK_BreadcrumbsService: Partial<BreadcrumbsService> = {
  getBreadCrumbs(cut: number = 0): ObjectInfo<string>[] {
    return MOCK_BreadCrumbLinks.slice(cut);
  },
};

export const MOCK_BreadcrumbsServiceProvider: Provider = {
  provide: BreadcrumbsService,
  useValue: MOCK_BreadcrumbsService,
};
