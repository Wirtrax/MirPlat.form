import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export default function ProtectedRoute() {
  const { isRegistered, status } = useAppSelector((state) => state.user);

  if (!isRegistered) {
    return <Navigate to="/registration" replace />;
  }

  return <Outlet />;
}
