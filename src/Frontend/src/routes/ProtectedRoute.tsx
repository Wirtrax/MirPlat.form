import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Loader from '../components/UI/Loader/Loader';

export default function ProtectedRoute() {
  const { isRegistered, status } = useAppSelector((state) => state.user);

  if (status === 'idle') return <Loader />
  if (!isRegistered) {
    return <Navigate to="/registration" replace />;
  }

  return <Outlet />;
}
