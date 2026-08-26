import s from './ErrorPage.module.scss'

import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'

import Background from '../UI/Background/Background'
import Button from '../UI/Button/Button'

export default function ErrorPage() {
    return (
        <Background>
            <main className={s.error}>
                <h1 className={s.error__title}>404</h1>

                <p className={s.error__text}>
                    Страница не найдена
                </p>

                <Link to={ROUTES.HOME}>
                    <Button>НА ГЛАВНУЮ</Button>
                </Link>
            </main>
        </Background>
    )
}