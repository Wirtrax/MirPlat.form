import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes/routes';

import ResultStep from '../../UI/ResultStep/ResultStep';

export default function SuccessStep() {
  const navigate = useNavigate();

  return (
        <ResultStep
          title="Ты в игре!"
          description="Чтобы приложение было всегда под рукой, добавь его на экран телефона"
          buttonText="ДОБАВИТЬ НА ЭКРАН"
          onButtonClick={() => navigate(ROUTES.INSTRUCTION)}>
          <Link to={ROUTES.HOME}>ПРОПУСТИТЬ</Link>
        </ResultStep>
  );
}
