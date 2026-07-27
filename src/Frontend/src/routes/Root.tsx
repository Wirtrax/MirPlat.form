import s from './Root.module.scss';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Background from '../components/Background/Background';
import Button from '../components/Button/Button';

export default function Root() {
  return (
    <Background variant="minimal">
      <div className={s.container}>
        <Header />
        <Outlet />
        <Footer />

        <Button>открыть</Button>
      </div>
    </Background>
  );
}
