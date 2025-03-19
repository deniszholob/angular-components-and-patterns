export const PAGE_ROUTES = {
  HOME_PAGE_ROOT: 'home',
  DEV_PAGE_ROOT: 'dev',
  //   SETTINGS_PAGE_ROOT: 'settings',
} as const;

export const ROUTE_KEYWORDS = {
  ROOT: '',
  NEW_ITEM: 'new',
  DETAIL_ITEM: ':id',
  FILTER: '?filter',
} as const;
