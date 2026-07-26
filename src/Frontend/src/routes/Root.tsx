import s from './Root.module.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

export default function Root() {
    return (
        <div className={s.container}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
