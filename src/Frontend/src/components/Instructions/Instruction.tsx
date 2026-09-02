import s from './Instruction.module.scss';

import IOSFPage from '.././../assets/instructions/ios/step1I.webp';
import IOSSPage from '.././../assets/instructions/ios/step2I.webp';
import IOSTPage from '.././../assets/instructions/ios/step3I.webp';
import AndroidFPage from '.././../assets/instructions/android/step1A.webp';
import AndroidSPage from '.././../assets/instructions/android/step2A.webp';

import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../routes/routes';

import Button from '../UI/Button/Button';
import Slider from '../UI/Slider/Slider';
import Background from '../UI/Background/Background';

import type { sliderHandleI } from '../UI/Slider/sliderProps';

type Platform = 'ios' | 'android';

const images: Record<Platform, string[]> = {
  ios: [IOSFPage, IOSSPage, IOSTPage],
  android: [AndroidFPage, AndroidSPage],
};

const instructions: Record<Platform, string[]> = {
  ios: [
    'Нажми на три точки в правом нижнем углу.',
    'Нажми «Поделиться» и выбери пункт «Добавить на экран «Домой».',
    'Нажми кнопку «Добавить».',
  ],
  android: [
    'Нажми на три точки в правом верхнем углу.',
    'В выпадающем меню выбери пункт «Добавить на главный экран».',
    'Задай название ярлыка, если нужно, и нажми «Добавить».',
  ],
};

function Instruction() {
  const sliderRef = useRef<sliderHandleI>(null);
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<Platform>('ios');

  const handleNext = () => {
    if (sliderRef.current?.canScrollNext()) {
      sliderRef.current.scrollNext();
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
  };

  return (
    <Background>
      <section className={clsx(s['instruction'], 'container')}>
        <div>
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
            {instructions[platform].map((text, index) => (
              <li key={index} className={s['instruction__list-item']}>
                {text}
              </li>
            ))}
          </ol>

          <div className={s['instruction__slider']}>
            <Slider ref={sliderRef} options={{ loop: false }} slidesPerView={1} showDots={true}>
              {images[platform].map((src, index) => (
                <img key={index} src={src} alt="" className={s['instruction__image']} />
              ))}
            </Slider>
          </div>

          <Button className={s.btn} onClick={handleNext}>ГОТОВО</Button>
        </div>
      </section>
    </Background>
  );
}

export default Instruction;
