import type { SwiperOptions } from 'swiper/types';
import type { ReactNode } from 'react';

export interface sliderPropsI {
  children: ReactNode[];
  options?: SwiperOptions;
  slidesPerView?: number;
  showDots?: boolean;
  onSlideChange?: (index: number) => void;
}

export interface sliderHandleI {
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  canScrollNext: () => boolean;
  selectedIndex: () => number;
}
