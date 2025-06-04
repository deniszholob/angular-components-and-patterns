export interface Card {
  id: string;
  disabled?: boolean;
  title: string;
  subtitle?: string;
  selectable?: boolean;
  selected?: boolean;
}
