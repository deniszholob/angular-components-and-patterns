import { NotificationType } from './notification-type.enum';

export interface INotification {
  type: NotificationType;
  text: string;
  // icon?: string;
}

export class Notification implements INotification {
  public type: NotificationType;
  public text: string;

  constructor(data?: Partial<Notification>) {
    this.type = data?.type ?? NotificationType.Info;
    this.text = data?.text ?? '';
  }
}
