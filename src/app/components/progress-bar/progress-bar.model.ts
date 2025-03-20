import { NotificationType } from '../notifications/notification-type.enum';

export interface ProgressBar {
  type: NotificationType;
  percentage: number;
}
