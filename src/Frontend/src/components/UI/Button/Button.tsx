import s from './Button.module.scss';

import React from 'react';
import clsx from 'clsx';

import type { ButtonProps } from './buttonProps';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  inactive,
  className = '',
  type = 'button',
  ariaLabel,
  style,
}) => {
  console.log('Рендер компонента Button');
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(s.button, disabled && s['button--disable'], inactive && s['button--disable'], className)}
      type={type}
      aria-label={ariaLabel}
      style={style}>
      {children}
    </button>
  );
};

export default Button;
