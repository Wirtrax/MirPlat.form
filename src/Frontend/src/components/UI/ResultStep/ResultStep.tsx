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
  className,
  closeButton = false,
  hideBachground = false,
}: ResultStepProps) {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/main');
  }

  const renderCard = () => {
    return (
      <div className={clsx(s['resultCard'], className)}>
        <h2 className={s.resultTitle}>{title}</h2>
        <div className={s.resultDescription}>{description}</div>
        <Button onClick={onButtonClick}>{buttonText}</Button>
        <div className={s.btnSkip}>{children}</div>
      </div>
    )
  }
  if (hideBachground) return renderCard()

  return (

    <Background variant="alternative">
      <div className={clsx('container', s['result__wrapper'])}>
        {
          closeButton &&
          <span className={s['close-icon']} onClick={handleClose}>
            <CloseIcon />
          </span>
        }
        {renderCard()}
      </div>
    </Background>

  );
}
