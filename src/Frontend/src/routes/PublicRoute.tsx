import s from './Route.module.scss';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';
import { ROUTES } from './routes';

import Loader from '../components/UI/Loader/Loader';

export default function PublicRoute() {
    const { user, status } = useAppSelector(state => state.user);

    if (status === 'loading' || status === 'idle') {
        return <Loader className={s.height} />;
    }

    if (user) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}