import React from 'react';
import styles from './CornerSquare.module.scss';
import clsx from 'clsx';
import type { CornerSquarePropsI } from './cornerSquareProps';

export const CornerSquare: React.FC<CornerSquarePropsI> = ({
  position,
  className,
  mainSize = 49,
  accentWidth = 20,
  accentHeight = 20,
  accentColor,
}) => {
  return (
    <span
      className={clsx(styles.square, styles[`square--${position}`], className)}
      style={{
        '--square-size': `${mainSize}px`,
        '--accent-height': `${accentHeight}px`,
        '--accent-width': `${accentWidth}px`,
        ...(accentColor && { '--accent-color': accentColor }),
      }}
    />
  );
};
