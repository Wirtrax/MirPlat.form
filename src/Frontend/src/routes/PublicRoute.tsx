import s from './Route.module.scss'

import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "../hooks/redux"

import Loader from "../components/UI/Loader/Loader"
import { ROUTES } from './routes'

export default function PublicRoute() {
    const { user, status } = useAppSelector(state => state.user)

    if (status === 'loading' || status === 'idle') return <Loader className={s.height} />

    if (user) {
        return <Navigate to={ROUTES.HOME} replace />
    }

    return <Outlet />
}
