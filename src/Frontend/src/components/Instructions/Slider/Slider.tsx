import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import s from './Slider.module.scss';
import clsx from 'clsx';
import type { sliderPropsI, sliderHandleI } from './sliderProps';

const Slider = forwardRef<sliderHandleI, sliderPropsI>(function Slider(
  { children, options, slidesPerView = 1, showDots = true },
  ref
) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const goTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const setupSnaps = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const setActiveSnap = useCallback((api: EmblaCarouselType) => {
    setSelectedSnap(api.selectedScrollSnap());
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      scrollNext: () => emblaApi?.scrollNext(),
      scrollPrev: () => emblaApi?.scrollPrev(),
      scrollTo: (index: number) => emblaApi?.scrollTo(index),
      canScrollNext: () => emblaApi?.canScrollNext() ?? false,
      selectedIndex: () => emblaApi?.selectedScrollSnap() ?? 0,
    }),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    setupSnaps(emblaApi);
    setActiveSnap(emblaApi);

    emblaApi.on('reInit', setupSnaps);
    emblaApi.on('reInit', setActiveSnap);
    emblaApi.on('select', setActiveSnap);
  }, [emblaApi, setupSnaps, setActiveSnap]);

  return (
    <div className={s['embla']}>
      <div className={s['embla__viewport']} ref={emblaRef}>
        <div className={s['embla__container']}>
          {children.map((slide, index) => (
            <div key={index} className={s['embla__slide']} style={{ flex: `0 0 ${100 / slidesPerView}%` }}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showDots && (
        <div className={s['embla__dots']}>
          {scrollSnaps.map((_, index) => (
            <button
              className={clsx(s['embla__dot'], index === selectedSnap && s['embla__dot--selected'])}
              key={index}
              onClick={() => goTo(index)}></button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Slider;
