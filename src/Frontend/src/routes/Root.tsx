import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import RadioList from '../components/UI/RadioList/RadioList';
import Background from '../components/UI/Background/Background';
import Instruction from '../components/Instructions/Instruction';

export default function Root() {
  return (
    <>
      <Background>
        {/* <Outlet /> */}
        <Instruction />
      </Background>
    </>
  );
}
