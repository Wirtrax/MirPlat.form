import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import RadioList from '../components/UI/RadioList/RadioList'

export default function Root() {
    return (
        <>
            <Header />
            <div className={'container'}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
  }
