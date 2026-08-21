import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes/routes';

import { useAppDispatch } from '../../../hooks/redux';
import { fetchUser } from '../../../service/features/user/userSlice';

import ResultStep from '../../UI/ResultStep/ResultStep';


export default function SuccessStep() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleContinue = async () => {
    await dispatch(fetchUser()).unwrap();
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
          await dispatch(fetchUser()).unwrap();
          navigate(ROUTES.HOME);
        }}
      >ПРОПУСТИТЬ</Link>
    </ResultStep>
  );
}
