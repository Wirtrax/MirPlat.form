import type { EmblaOptionsType } from 'embla-carousel';
import type { ReactNode } from 'react';

export interface sliderPropsI {
  children: ReactNode[];
  options?: EmblaOptionsType;
  slidesPerView?: number;
  showDots?: boolean;
}

export interface sliderHandleI {
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  canScrollNext: () => boolean;
  selectedIndex: () => number;
}
