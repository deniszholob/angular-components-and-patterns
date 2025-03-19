export enum NotificationType {
  'Info' = 'Info', // Typically blue
  'Success' = 'Success', // Typically green
  'Warning' = 'Warning', // Typically yellow
  'Error' = 'Error', // Typically red
  'Neutral' = 'Neutral', // Typically gray
  'Primary' = 'Primary',
  'Secondary' = 'Secondary',
  'Tertiary' = 'Tertiary',
}

export const NOTIFICATION_TYPE_OPTIONS: NotificationType[] =
  Object.values(NotificationType);

export function isNotificationType(value: string): value is NotificationType {
  return NOTIFICATION_TYPE_OPTIONS.includes(value as NotificationType);
}

// ====== Simple Enum Association: enum => string ===== //
// export const NOTIFICATION_TYPE_DISPLAY: Record<NotificationType, string> = {
//   [NotificationType.option1]: 'Option 1',
// };

// ====== Advanced Enum Association: enum => object ===== //
// export interface NotificationTypeInfo {
//   id: NotificationType;
//   display: string;
// }

// export const NOTIFICATION_TYPE_INFO: Record<NotificationType, NotificationTypeInfo> = {
//   [NotificationType.OptionId1]: {
//     id: NotificationType.OptionId1,
//     display: 'Option Id 1',
//   },
// } as const;

// export const NOTIFICATION_TYPE_INFO_OPTIONS: NotificationTypeInfo[] =
//   NOTIFICATION_TYPE_OPTIONS.map(
//     (o: NotificationType): NotificationTypeInfo => NOTIFICATION_TYPE_INFO[o],
//   );

// ====== Visualize Data ===== //
// console.log({ NOTIFICATION_TYPE_OPTIONS, NOTIFICATION_TYPE_DISPLAY, NOTIFICATION_TYPE_INFO, NOTIFICATION_TYPE_INFO_OPTIONS });
