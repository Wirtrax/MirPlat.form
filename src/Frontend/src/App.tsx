import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { devLoginUser, fetchUser, loginUser } from './service/features/user/userSlice';

import Root from './routes/Root';
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import Instruction from './components/Instructions/Instruction';
import MainPage from './components/MainPage/MainPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import PublicAdminRoute from './routes/PublicAdminRoute';
import Shop from './components/Shop/Shop';
import AdminLayout from './components/AdminPanel/Page/AdminLayout';
import UsersPage from './components/AdminPanel/Page/UsersPage/UsersPage';
import AdminLoginForm from './components/AdminPanel/Page/AdminLoginForm/AdminLoginForm';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import ItemsPage from './components/AdminPanel/Page/ItemsPage/ItemsPage';
import OrderPage from './components/AdminPanel/Page/OrderPage/OrderPage';
import UserPage from './components/AdminPanel/Page/UserPage/UserPage';

const DEV_AUTH = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Публичные роуты обычного пользователя */}
      <Route element={<PublicRoute />}>
        <Route path="registration" element={<Registration />} />
      </Route>

      {/* Публичный роут для входа админа — отдельный guard, не зависит от обычного user */}
      <Route element={<PublicAdminRoute />}>
        <Route path="/admin/registration" element={<AdminLoginForm />} />
      </Route>

      {/* Защищённые роуты обычного пользователя */}
      <Route element={<ProtectedRoute />}>
        <Route path="instruction" element={<Instruction />} />
        <Route path="/" element={<Root />}>
          <Route path="main" element={<MainPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
        </Route>
      </Route>

      {/* Защищённые роуты админки */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/items" element={<ItemsPage />} />
          <Route path="/admin/orders" element={<OrderPage />} />
          <Route path="/admin/user/:id" element={<UserPage />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initApp = async () => {
      try {
        if (import.meta.env.DEV) {
          if (DEV_AUTH) {
            await dispatch(devLoginUser()).unwrap();
          } else {
            await dispatch(loginUser()).unwrap();
            await dispatch(fetchUser()).unwrap();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    initApp();
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
