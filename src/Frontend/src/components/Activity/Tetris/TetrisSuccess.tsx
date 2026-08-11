import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';

interface TetrisSuccessProps {
  hasSubmittedPhoto: boolean;
}

export default function TetrisSuccess({ hasSubmittedPhoto }: TetrisSuccessProps) {
  const navigate = useNavigate()

  return (
    <>
      <ResultStep
        title={hasSubmittedPhoto
          ? "Фото уже отправлено"
          : "Готово!"
        }
        description={
          hasSubmittedPhoto
            ? "Статус: на проверке"
            : "Фото отправлено на проверку. Мы начислим баллы после модерации." 
        }
        buttonText="В ПРОФИЛЬ"
        onButtonClick={() => navigate('/profile')}
        closeButton={true}
      >
        <Link to={'/main#activities'}>К ДРУГИМ АКТИВНОСТЯМ</Link>
      </ResultStep>
    </>

  )
}
