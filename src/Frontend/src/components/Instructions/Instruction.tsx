import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import s from './Instruction.module.scss';
import Slider from './Slider/Slider';
import type { sliderHandleI } from './Slider/sliderProps';

import IOSFPage from '.././../assets/instructions/ios/step1I.webp';
import IOSSPage from '.././../assets/instructions/ios/step2I.webp';
import IOSTPage from '.././../assets/instructions/ios/step3I.webp';

import AndroidFPage from '.././../assets/instructions/android/step1A.webp';
import AndroidSPage from '.././../assets/instructions/android/step2A.webp';

type Platform = 'ios' | 'android';

const images: Record<Platform, string[]> = {
  ios: [IOSFPage, IOSSPage, IOSTPage],
  android: [AndroidFPage, AndroidSPage],
};
function Instruction() {
  const sliderRef = useRef<sliderHandleI>(null);
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<Platform>('ios');

  const handleNext = () => {
    if (sliderRef.current?.canScrollNext()) {
      sliderRef.current.scrollNext();
    } else {
      // navigate('/');
    }
  };

  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
  };

  return (
    <section className={s['instruction']}>
      <h1 className={s['instruction__title']}>Инструкция</h1>
      <div className={s['instruction__button-block']}>
        <Button inactive={platform !== 'ios'} onClick={() => handlePlatformChange('ios')}>
          IOS
        </Button>
        <Button inactive={platform !== 'android'} onClick={() => handlePlatformChange('android')}>
          Android
        </Button>
      </div>
      <ol className={s['instruction__list']}>
        <li className={s['instruction__list-item']}>Нажми на три точки в правом нижнем углу. </li>
        <li className={s['instruction__list-item']}>Нажми «Поделиться» и выбери пункт «Добавить на экран «Домой».</li>
        <li className={s['instruction__list-item']}>Нажми кнопку «Добавить».</li>
      </ol>

      <div className={s['instruction__slider']}>
        <Slider ref={sliderRef} options={{ loop: false }} slidesPerView={1} showDots={true}>
          {images[platform].map((src, index) => (
            <img key={index} src={src} alt="" className={s['instruction__image']} />
          ))}
        </Slider>
      </div>

      <Button onClick={handleNext}>ГОТОВО</Button>
    </section>
  );
}

export default Instruction;
