export enum TooltipPosition {
  'UP' = 'UP',
  'DOWN' = 'DOWN',
  'LEFT' = 'LEFT',
  'RIGHT' = 'RIGHT',
  'UP_LEFT' = 'UP_LEFT',
  'UP_RIGHT' = 'UP_RIGHT',
  'DOWN_LEFT' = 'DOWN_LEFT',
  'DOWN_RIGHT' = 'DOWN_RIGHT',
}

export const TOOLTIP_POSITION_OPTIONS: TooltipPosition[] =
  Object.values(TooltipPosition);

export function isTooltipPosition(value: string): value is TooltipPosition {
  return TOOLTIP_POSITION_OPTIONS.includes(value as TooltipPosition);
}

// ====== Simple Enum Association: enum => string ===== //
export const TOOLTIP_POSITION_CLASSES: Record<TooltipPosition, string> = {
  [TooltipPosition.UP]: 'tooltip-up',
  [TooltipPosition.DOWN]: 'tooltip-down',
  [TooltipPosition.LEFT]: 'tooltip-left',
  [TooltipPosition.RIGHT]: 'tooltip-right',
  [TooltipPosition['UP_LEFT']]: 'tooltip-up-left',
  [TooltipPosition['UP_RIGHT']]: 'tooltip-up-right',
  [TooltipPosition['DOWN_LEFT']]: 'tooltip-down-left',
  [TooltipPosition['DOWN_RIGHT']]: 'tooltip-down-right',
};

export const TOOLTIP_POSITION_CLASSES_UNIQUE: string[] =
  TOOLTIP_POSITION_OPTIONS.map(
    (o: TooltipPosition): string => TOOLTIP_POSITION_CLASSES[o],
  );

// ====== Advanced Enum Association: enum => object ===== //
// export interface TooltipPositionInfo {
//   id: TooltipPosition;
//   display: string;
// }

// export const TOOLTIP_POSITION_INFO: Record<TooltipPosition, TooltipPositionInfo> = {
//   [TooltipPosition.OptionId1]: {
//     id: TooltipPosition.OptionId1,
//     display: 'Option Id 1',
//   },
// } as const;

// export const TOOLTIP_POSITION_INFO_OPTIONS: TooltipPositionInfo[] =
//   TOOLTIP_POSITION_OPTIONS.map(
//     (o: TooltipPosition): TooltipPositionInfo => TOOLTIP_POSITION_INFO[o],
//   );

// ====== Visualize Data ===== //
// console.log({ TOOLTIP_POSITION_OPTIONS, TOOLTIP_POSITION_DISPLAY, TOOLTIP_POSITION_INFO, TOOLTIP_POSITION_INFO_OPTIONS });
