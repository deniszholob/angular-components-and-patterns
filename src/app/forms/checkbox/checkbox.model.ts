import { ObjectInfo } from 'src/app/utils';

export interface Checkbox<T = unknown> extends ObjectInfo {
  /** Checkbox state */
  checked: boolean;
  /** Optional disabled state */
  disabled?: boolean;
  /** Optional data associated with the checkbox entry */
  data?: T;
}

export interface CheckboxSection<T = unknown> {
  display: string;
  items: Checkbox<T>[];
}
