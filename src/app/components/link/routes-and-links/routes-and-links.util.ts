// Routes And Links Utilities

import { toWordCase } from 'src/app/utils';

import { Link } from '../link.model';

export function routeStringToLink(route: string): Link {
  return {
    url: route,
    display: toWordCase(route.replace('_', ' ')),
  };
}
