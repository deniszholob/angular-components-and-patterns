import { Router, RouterState } from '@angular/router';
import { DeepPartial, ObjectInfo } from 'src/app/utils';

import {
  BreadcrumbsService,
  getBreadcrumbLinksFromUrl,
} from './breadcrumbs.service';
import { MOCK_BreadCrumbUrl } from './breadcrumbs.service.mock';

class MockRouter implements DeepPartial<Router> {
  public routerState: DeepPartial<RouterState> = {
    snapshot: {
      url: MOCK_BreadCrumbUrl,
    },
  };
}

describe('BreadcrumbsService', () => {
  let service: BreadcrumbsService;
  let router: Router;

  beforeEach(() => {
    router = new MockRouter() as unknown as Router;
    service = new BreadcrumbsService(router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return breadcrumbs excluding the first link when cut is 1', () => {
    const result: ObjectInfo<string>[] = service.getBreadCrumbs(1);
    expect(result).toEqual([
      { id: 'home/dashboard', display: 'dashboard' },
      { id: 'home/dashboard/settings', display: 'settings' },
    ]);
  });

  it('should return all breadcrumbs when cut is 0', () => {
    const result: ObjectInfo<string>[] = service.getBreadCrumbs(0);
    expect(result).toEqual([
      { id: 'home', display: 'home' },
      { id: 'home/dashboard', display: 'dashboard' },
      { id: 'home/dashboard/settings', display: 'settings' },
    ]);
  });

  it('should return an empty array when cut is greater than the number of links', () => {
    const result: ObjectInfo<string>[] = service.getBreadCrumbs(5);
    expect(result).toEqual([]);
  });
});

describe('getBreadcrumbLinksFromUrl', () => {
  it('should return breadcrumb links for a given URL', () => {
    const result: ObjectInfo<string>[] =
      getBreadcrumbLinksFromUrl(MOCK_BreadCrumbUrl);

    expect(result).toEqual([
      { id: 'home', display: 'home' },
      { id: 'home/dashboard', display: 'dashboard' },
      { id: 'home/dashboard/settings', display: 'settings' },
    ]);
  });

  it('should return an empty array for an empty URL', () => {
    const result: ObjectInfo<string>[] = getBreadcrumbLinksFromUrl('');
    expect(result).toEqual([]);
  });
});
