export enum AppColors {
  'bg' = 'bg',
  'fg' = 'fg',
}

export const APP_COLORS_OPTIONS: AppColors[] = Object.values(AppColors);

export const APP_COLORS_DISPLAY: Record<AppColors, string> = {
  [AppColors.bg]: '#333333',
  [AppColors.fg]: '#fefefe',
};

export interface AppColor {
  title: string;
  color: string;
}

export const APP_COLORS: AppColor[] = APP_COLORS_OPTIONS.map(
  (option: AppColors): AppColor => {
    return {
      color: APP_COLORS_DISPLAY[option],
      title: option,
    };
  },
);
