import { Link, useNavigate } from 'react-router-dom';
import ResultStep from '../ResultStep/ResultStep';
import Background from '../../UI/Background/Background';
import s from './SuccessStep.module.scss';
import clsx from 'clsx';

export default function SuccessStep() {
  const navigate = useNavigate();

  return (
    <Background variant="alternative">
      <div className={clsx('container', s.wrapper)}>
        <ResultStep
          title="Ты в игре!"
          description="Чтобы приложение было всегда под рукой, добавь его на экран телефона"
          buttonText="ДОБАВИТЬ НА ЭКРАН"
          onButtonClick={() => navigate('/instruction')}>
          <Link to={'/main'}>ПРОПУСТИТЬ</Link>
        </ResultStep>
      </div>
    </Background>
  );
}
