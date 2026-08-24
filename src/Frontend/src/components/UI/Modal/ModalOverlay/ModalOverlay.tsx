import React from 'react';
import s from './ModalOverlay.module.scss';
import clsx from 'clsx';

import type { ModalOverlayProps } from '../modalProp';

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children, className }) => {
  return (
    <div className={clsx(s.overlay, className)} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
