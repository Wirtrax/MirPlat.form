import s from './Tetris.module.scss';
import clsx from 'clsx';

import CloseIcon from '../../../assets/icons/closeIcon.svg?react'
import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';
import Background from '../../UI/Background/Background';

export default function TetrisSuccess() {
  const navigate = useNavigate()

  const handleClose = () => {
      navigate('/main');
  
  }

  return (
    <Background variant="alternative">
      <div className={clsx('container', s['tetris__success-wrapper'])}>
        <span className={s['close-icon']} onClick={handleClose}>
          <CloseIcon />
        </span>
        <ResultStep
          title="Готово!"
          description="Фото отправлено на проверку. Мы начислим баллы после модерации. "
          buttonText="В ПРОФИЛЬ"
          onButtonClick={() => navigate('/profile')}>
          <Link to={'/main#activities'}>К ДРУГИМ АКТИВНОСТЯМ</Link>
        </ResultStep>
      </div>
    </Background>
  )
}
