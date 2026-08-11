import s from './ResultStep.module.scss';
import clsx from 'clsx';

import CloseIcon from '../../../assets/icons/closeIcon.svg?react'

import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import Background from '../Background/Background';

import type { ResultStepProps } from './ResultStep.type';

export default function ResultStep({
  title,
  description,
  buttonText,
  onButtonClick,
  children,
  closeButton = false, 
}: ResultStepProps) {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/main');
  }

  return (

    <Background variant="alternative">
      <div className={clsx('container', s['result__wrapper'])}>
        {
          closeButton &&
          <span className={s['close-icon']} onClick={handleClose}>
            <CloseIcon />
          </span>
        }
        <div className={s['resultCard']}>
          <h2 className={s.resultTitle}>{title}</h2>
          <p className={s.resultDescription}>{description}</p>
          <Button onClick={onButtonClick}>{buttonText}</Button>
          <div className={s.btnSkip}>{children}</div>
        </div>
      </div>
    </Background>

  );
}
