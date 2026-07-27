import { Link } from 'react-router-dom'
import s from './Footer.module.scss'
import footerLogo from '../../assets/interface/plat.formFooter.webp'
import VK_Icon from '../../assets/footer/vk.svg?react'
import TG_Icon from '../../assets/footer/tg.svg?react'
import Splash_Icon from '../../assets/footer/splash.svg?react'

export default function Footer() {
    return (
        <div className={s.footer}>
            <img src={footerLogo} className={s['footer-logo']} />
            <Link to={'https://mir-platform.ru/'} className={s['footer-text']}>MirEvent@nspk.ru</Link>
            <Link to={'/'} className={s['footer-text']}>пользовательское соглашение</Link>
            <div className={s['footer-contacts']}>
                <Link to={'https://vk.com/mir_plat.form'}>
                    <VK_Icon />
                </Link>
                <Link to={'https://t.me/mir_platform'}>
                    <TG_Icon />
                </Link>
                <Link to={'https://habr.com/ru/specials/978610/'}>
                    <Splash_Icon />
                </Link>



            </div>
        </div>
    )
}
