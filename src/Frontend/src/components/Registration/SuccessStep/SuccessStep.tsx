import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes/routes';

import ResultStep from '../../UI/ResultStep/ResultStep';


export default function SuccessStep() {
  const navigate = useNavigate();

  const handleContinue = async () => {
    navigate(ROUTES.INSTRUCTION);
  };

  return (
    <ResultStep
      title="Ты в игре!"
      description="Чтобы приложение было всегда под рукой, добавь его на экран телефона"
      buttonText="ДОБАВИТЬ НА ЭКРАН"
      onButtonClick={handleContinue}>
      <Link
        to={ROUTES.HOME}
        onClick={async (e) => {
          e.preventDefault();
          navigate(ROUTES.HOME);
        }}
      >ПРОПУСТИТЬ</Link>
    </ResultStep>
  );
}
