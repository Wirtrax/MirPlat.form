import s from './WelcomeSection.module.scss';

import clsx from 'clsx';

import { CornerSquare } from '../../UI/CornerSquare/CornerSquare';

export default function BackgroundMain() {
  return (
    <div className={s.backgroundDecor}>
      <div className={s.squareBlur}>
        <CornerSquare
          position="top-left"
          mainSize={72}
          accentHeight={30}
          accentWidth={30}
          className={clsx(s['square--top-left'])}
        />
      </div>

      <div className={s.squareBlur}>
        <CornerSquare position="none" mainSize={30} className={clsx(s['square--top-right'])} />
      </div>

      <div className={s.squareBlur}>
        <CornerSquare
          position="bottom-left"
          mainSize={61}
          accentHeight={25}
          accentWidth={25}
          className={clsx(s['square--bottom-main'])}
        />
      </div>

      <div className={s.squareBlur}>
        <CornerSquare
          position="bottom-left"
          accentHeight={40}
          accentWidth={40}
          className={clsx(s['square--left-main'])}
        />
      </div>
    </div>
  );
}
