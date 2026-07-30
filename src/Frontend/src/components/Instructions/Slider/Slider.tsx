import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import s from './Slider.module.scss';
import clsx from 'clsx';
import type { sliderPropsI, sliderHandleI } from './sliderProps';

const Slider = forwardRef<sliderHandleI, sliderPropsI>(function Slider(
  { children, options, slidesPerView = 1, showDots = true },
  ref
) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(children.length);

  const goTo = useCallback(
    (index: number) => {
      swiperInstance?.slideTo(index);
    },
    [swiperInstance]
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollNext: () => swiperInstance?.slideNext(),
      scrollPrev: () => swiperInstance?.slidePrev(),
      scrollTo: (index: number) => swiperInstance?.slideTo(index),
      canScrollNext: () => (swiperInstance ? !swiperInstance.isEnd : false),
      selectedIndex: () => swiperInstance?.activeIndex ?? 0,
    }),
    [swiperInstance]
  );

  return (
    <div className={s['embla']}>
      <Swiper
        {...options}
        slidesPerView={slidesPerView}
        className={clsx(s['embla__viewport'])}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setSlidesCount(swiper.slides.length);
        }}
        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
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
