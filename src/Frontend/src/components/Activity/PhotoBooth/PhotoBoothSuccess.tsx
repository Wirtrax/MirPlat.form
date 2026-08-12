import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';

interface PhotoBoothProps {
    hasSubmittedPhoto: boolean;
}

export default function PhotoBoothSuccess({ hasSubmittedPhoto }: PhotoBoothProps) {
    const navigate = useNavigate()

    return (
        <>
            <ResultStep
                title={
                    hasSubmittedPhoto
                        ? "Задание выполнено!"
                        : "Готово!"
                }
                description="Баллы за активность уже начислены на твой счёт"
                buttonText="В ПРОФИЛЬ"
                onButtonClick={() => navigate('/profile')}
                closeButton={true}
            >
                <Link to={'/main#activities'}>К ДРУГИМ АКТИВНОСТЯМ</Link>
            </ResultStep>
        </>
    )
}
