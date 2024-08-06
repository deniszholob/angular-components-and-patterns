import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectInfo } from 'src/app/utils';

const URL_SEPARATOR = '/';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService {
  constructor(private router: Router) {}

  /**
   * @param cut - number of links to exclude from beginning
   * @returns breadcrumb links array from current page url
   */
  public getBreadCrumbs(cut: number = 0): ObjectInfo<string>[] {
    // [0] ?? '' is really to keep ts happy, split will always return at least 1 item
    const url: string =
      this.router.routerState.snapshot.url.split('?')[0] ?? '';
    const links: ObjectInfo[] = getBreadcrumbLinksFromUrl(url);
    return links.slice(cut);
  }
}

export function getBreadcrumbLinksFromUrl(url: string): ObjectInfo<string>[] {
  if (url.length <= 0) return [];
  let link: string = '';
  const links: ObjectInfo<string>[] = [];

  const pathSegments: string[] = url
    .split(URL_SEPARATOR)
    .filter((segment: string): boolean => segment.length > 0);

  pathSegments.forEach((segment: string): void => {
    link += segment;
    links.push({ id: link, display: segment });
    link += URL_SEPARATOR;
  });
  return links;
}
