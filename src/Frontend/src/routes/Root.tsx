import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Background from '../components/Background/Background';

export default function Root() {
  return (
    <>
      <Background>
        {/* <Header /> */}
        <div className={'container'}>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </Background>
    </>
  );
}
