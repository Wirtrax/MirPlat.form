import s from './Modal.module.scss';

import ReactDOM from 'react-dom';
import clsx from 'clsx';

import React, { useEffect } from 'react';

import ModalOverlay from './ModalOverlay/ModalOverlay';
import type { ModalProps } from './modalProp';

const Modal: React.FC<ModalProps> = ({ children, onClose, className }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={clsx(s.modal, className)} onClick={(e) => e.stopPropagation()}>
        <button className={s['modal__btn']} onClick={onClose} type="button">
          <span className={s['modal__btn-icon-close']}></span>
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
