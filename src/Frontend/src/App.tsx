import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { devLoginUser, fetchUser, loginUser } from './service/features/user/userSlice';

import Root from './routes/Root';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import Instruction from './components/Instructions/Instruction';
import MainPage from './components/MainPage/MainPage';
import Shop from './components/Shop/Shop';
import { ROUTES } from './routes/routes';
import TetrisPage from './components/Activity/Tetris/TetrisPage';
import PhotoCheckPage from './components/Activity/PhotoCheck/PhotoCheckPage';
import FourByFourPage from './components/Activity/FourByFour/FourByFourPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.INSTRUCTION} element={<Instruction />} />
        <Route path={ROUTES.TETRIS} element={<TetrisPage />} />
        <Route path={ROUTES.PHOTO_CHECK} element={<PhotoCheckPage />} />
        <Route path={ROUTES.FOUR_BY_FOUR} element={<FourByFourPage />} />

        <Route path={ROUTES.HOME} element={<Root />}>
          <Route index element={<MainPage />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SHOP} element={<Shop />} />
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
          await dispatch(devLoginUser()).unwrap()
        } else {
          await dispatch(loginUser()).unwrap()
          await dispatch(fetchUser()).unwrap()
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