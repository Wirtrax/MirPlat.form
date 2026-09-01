import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchUser } from '../../../service/features/user/userSlice';
import { ROUTES } from '../../../routes/routes';

import ResultStep from '../../UI/ResultStep/ResultStep';

export default function SuccessStep() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goNext = async (route: string) => {
    await dispatch(fetchUser()).unwrap();
    navigate(route);
  };

  return (
    <ResultStep
      title="Ты в игре!"
      description="Чтобы приложение было всегда под рукой, добавь его на экран телефона"
      buttonText="ДОБАВИТЬ НА ЭКРАН"
      onButtonClick={() => goNext(ROUTES.INSTRUCTION)}
    >
      <Link
        to={ROUTES.HOME}
        onClick={(e) => {
          e.preventDefault();
          goNext(ROUTES.HOME);
        }}
      >
        ПРОПУСТИТЬ
      </Link>
    </ResultStep>
  );
}