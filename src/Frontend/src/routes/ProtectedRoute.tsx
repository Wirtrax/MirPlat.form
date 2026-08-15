import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Loader from '../components/UI/Loader/Loader';

export default function ProtectedRoute() {
  const { user, status } = useAppSelector((state) => state.user);

  if (status === 'loading') return <Loader />

  if (!user) {
    return <Navigate to="/registration" replace />;
  }

  return <Outlet />;
}
