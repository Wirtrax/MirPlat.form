import React from 'react';
import s from './ModalOverlay.module.scss';
import type { ModalOverlayProps } from '../modalProp';

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
