import 'swiper/css';
import s from './Slider.module.scss';
import clsx from 'clsx';

import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Swiper as SwiperType } from 'swiper';
import type { sliderPropsI, sliderHandleI } from './sliderProps';

const Slider = forwardRef<sliderHandleI, sliderPropsI>(function Slider(
  { children, options, slidesPerView = 1, showDots = true, onSlideChange },
  ref
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(children.length);
  const swiperRef = useRef<SwiperType | null>(null);

  const goTo = (index: number) => {
    swiperRef.current?.slideTo(index);
  }

  useImperativeHandle(
    ref,
    () => ({
      scrollNext: () => swiperRef.current?.slideNext(),
      scrollPrev: () => swiperRef.current?.slidePrev(),
      scrollTo: (index: number) => swiperRef.current?.slideTo(index),
      canScrollNext: () => (swiperRef.current ? !swiperRef.current.isEnd : false),
      selectedIndex: () => swiperRef.current?.activeIndex ?? 0,
    }),
    []
  );

  return (
    <div className={s['embla']}>
      <Swiper
        {...options}
        slidesPerView={slidesPerView}
        className={clsx(s['embla__viewport'])}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setSlidesCount(swiper.slides.length);
        }}
        onSlideChange={(swiper) => {
          setSelectedIndex(swiper.activeIndex);
          onSlideChange?.(swiper.activeIndex);
        }}
        onUpdate={(swiper) => setSlidesCount(swiper.slides.length)}>
        {children.map((slide, index) => (
          <SwiperSlide key={index} className={clsx(s['embla__slide'])}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {showDots && (
        <div className={s['embla__dots']}>
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              type="button"
              className={clsx(s['embla__dot'], index === selectedIndex && s['embla__dot--selected'])}
              key={index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default Slider;
