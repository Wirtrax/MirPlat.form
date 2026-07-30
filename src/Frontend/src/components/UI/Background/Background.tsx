import clsx from 'clsx';
import { CornerSquare } from '../CornerSquare/CornerSquare';
import s from './Background.module.scss';
import type { backgroundT } from './backgroundProps';

function Background({ children, variant = 'default' }: backgroundT) {
  const renderBackground = () => {
    switch (variant) {
      case 'minimal':
        return (
          <span className={s['background']}>
            <CornerSquare position="top-left" />
            <CornerSquare position="none" mainSize={20} />
          </span>
        );

      case 'alternative':
        return (
          <span className={s['background']}>
            <CornerSquare
              position="top-right"
              mainSize={143}
              accentHeight={58}
              accentWidth={58}
              className={clsx(s['square--top-alternative'])}
            />
            <CornerSquare
              position="bottom-right"
              accentColor="var(--color-ocean-blue)"
              accentHeight={151}
              accentWidth={285}
              mainSize={142}
              className={clsx(s['square--bottom-alternative'])}
            />
          </span>
        );

      case 'default':
      default:
        return (
          <>
            <span className={s['background']}>
              <CornerSquare position="top-left" />
              <CornerSquare position="none" mainSize={20} />
              <CornerSquare position="bottom-right" />
            </span>
          </>
        );
    }
  };

  return (
    <>
      <span className={s['filter']}></span>
      {renderBackground()}
      <div className={s['main']}>{children}</div>
    </>
  );
}

export default Background;
