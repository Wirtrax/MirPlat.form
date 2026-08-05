import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ActivityLayout from '../components/Activity/ActivityLayout/ActivityLayout';

export default function Root() {
  return (
    <>
      <Header />
      <ActivityLayout />
      <Outlet />
      <Footer />
    </>
  );
}
