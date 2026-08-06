import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { fetchUser, loginUser } from './service/features/user/userSlice';

import Root from './routes/Root';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import Instruction from './components/Instructions/Instruction';
import MainPage from './components/MainPage/MainPage';
import Tetris from './components/Activity/Tetris/Tetris';
import TetrisSuccess from './components/Activity/Tetris/TetrisSuccess';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      {/* <Route element={<PublicRoute />}>
        <Route path="registration" element={<Registration />} />
      </Route> */}

      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="instruction" element={<Instruction />} />
      <Route index element={<Tetris />} />
      <Route path='tetris' element={<Tetris />} /> 
      <Route path='/tetris/success' element={<TetrisSuccess />} /> 
      
      <Route path="/" element={<Root />}>
        <Route index element={<MainPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      {/* </Route> */}
    </>
  )
);

function App() {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const initApp = async () => {
  //     try {
  //       await dispatch(loginUser()).unwrap()
  //       await dispatch(fetchUser()).unwrap()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   initApp()
  // }, [dispatch])

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
