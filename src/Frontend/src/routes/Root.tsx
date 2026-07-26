import s from './Root.module.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

export default function Root() {
    return (
        <div className={s.container}>
            <Outlet />
            <Footer />
        </div>
    )
}
