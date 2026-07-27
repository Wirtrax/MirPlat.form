export type CornerPositionT = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' | 'none';

export interface CornerSquarePropsI {
  position: CornerPositionT;
  className?: string;
  mainSize?: number;
  accentWidth?: number;
  accentHeight?: number;
  accentColor?: string;
}
