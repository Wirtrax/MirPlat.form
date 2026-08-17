import s from './SuccessStep.module.scss';

import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '../../../routes/routes';

import ResultStep from '../ResultStep/ResultStep';
import Background from '../../UI/Background/Background';

export default function SuccessStep() {
  const navigate = useNavigate();

  return (
    <Background variant="alternative">
      <div className={clsx('container', s.wrapper)}>
        <ResultStep
          title="Ты в игре!"
          description="Чтобы приложение было всегда под рукой, добавь его на экран телефона"
          buttonText="ДОБАВИТЬ НА ЭКРАН"
          onButtonClick={() => navigate(ROUTES.INSTRUCTION)}>
          <Link to={ROUTES.HOME}>ПРОПУСТИТЬ</Link>
        </ResultStep>
      </div>
    </Background>
  );
}
