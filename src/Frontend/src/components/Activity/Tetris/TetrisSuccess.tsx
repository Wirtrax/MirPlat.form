import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';

export default function TetrisSuccess() {
  const navigate = useNavigate()

  return (
    <ResultStep
      title="Готово!"
      description="Фото отправлено на проверку. Мы начислим баллы после модерации. "
      buttonText="В ПРОФИЛЬ"
      onButtonClick={() => navigate('/profile')}>
      <Link to={'/main#activities'}>К ДРУГИМ АКТИВНОСТЯМ</Link>
    </ResultStep>
  )
}
