import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';

export default function PublicAdminRoute() {
  const { user } = useAppSelector((state) => state.user);
  const { superAdmin } = useAppSelector((state) => state.superAdmin);

  const isAdmin = superAdmin === true || (user && user.is_admin === true);

  if (isAdmin) {
    return <Navigate to="/admin/users" replace />;
  }

  return <Outlet />;
}
