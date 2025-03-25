import { INotification } from '../notification.model';

export interface ToastInfo extends INotification {
  title: string;
  subtitle?: string;
  duration?: number;
}

export interface Toast extends ToastInfo {
  id: string;
  percentage?: number;
  created: number;
}
