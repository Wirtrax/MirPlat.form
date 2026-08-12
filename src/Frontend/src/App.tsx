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
import TetrisPage from './components/Activity/Tetris/TetrisPage';
import PhotoCheckPage from './components/Activity/PhotoCheck/PhotoCheckPage';
import FourByFour from './components/Activity/FourByFour/FourByFour';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoute />}>
        <Route path="registration" element={<Registration />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="instruction" element={<Instruction />} />
        <Route path='tetris' element={<TetrisPage />} />
        <Route path='photo_check' element={<PhotoCheckPage />} />
        <Route path='four_by_four' element={<FourByFour />} />

        <Route path="/" element={<Root />}>
          <Route index element={<MainPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
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