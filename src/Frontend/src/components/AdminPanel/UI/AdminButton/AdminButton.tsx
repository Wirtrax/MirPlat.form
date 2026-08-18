import React from 'react';
import s from './AdminButton.module.scss';
import type { adminButtonProps } from './adminButtonProps';

const AdminButton: React.FC<adminButtonProps> = ({
  children,
  onClick,
  className = '',
  withPlus = false,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${s.button} ${className}`}>
      {withPlus && <span className={s.plus}>+</span>}
      {children}
    </button>
  );
};

export default AdminButton;
