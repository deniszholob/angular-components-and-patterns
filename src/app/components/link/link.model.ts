export interface Link {
  display: string;
  url: string;
  /** Custom Title/Tooltip/Aria otherwise `display` is used*/
  title?: string;
  /** Font Awesome icon class */
  icon?: string;
  /** Open in new tab */
  external?: boolean;
  /** Additional text to display after `display` */
  note?: string;
}
