import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';

export default function PhotoBoothSuccess() {
    const navigate = useNavigate()

    return (
        <>
            <ResultStep
                title="Готово!"
                description="Баллы за активность уже начислены на твой счёт"
                buttonText="В ПРОФИЛЬ"
                onButtonClick={() => navigate('/profile')}
                closeButton={true}
            >
                <Link to={'/main#activities'}>К ДРУГИМ АКТИВНОСТЯМ</Link>
            </ResultStep>

            <ResultStep
                title="Задание выполнено!"
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
