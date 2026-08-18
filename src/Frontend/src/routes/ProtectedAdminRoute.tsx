import s from './Route.module.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Loader from '../components/UI/Loader/Loader';

export default function ProtectedAdminRoute() {
  const { user, status } = useAppSelector((state) => state.user);
  const { superAdmin } = useAppSelector((state) => state.superAdmin);

  if (status === 'loading') {
    return <Loader className={s.height} />;
  }

  const isAdmin = superAdmin === true || (user && user.is_admin === true);

  if (!isAdmin) {
    return <Navigate to="/admin/registration" replace />;
  }

  return <Outlet />;
}
