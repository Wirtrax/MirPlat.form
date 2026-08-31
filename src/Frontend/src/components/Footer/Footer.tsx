import s from './Footer.module.scss';

import footerLogo from '../../assets/interface/plat.formFooter.webp';
import VK_Icon from '../../assets/footer/vk.svg?react';
import TG_Icon from '../../assets/footer/tg.svg?react';
// import Habr from '../../assets/footer/habr.svg?react';
import Habr_Icon from '../../assets/footer/habr.png';

import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export default function Footer() {
  return (
    <div className={s.footer}>
      <img src={footerLogo} className={s['footer-logo']} />

      <a href="mailto:MirEvent@nspk.ru"
        className={s['footer-text']}>
        MirEvent@nspk.ru
      </a>

      <Link to={ROUTES.HOME} className={s['footer-text']}>
        пользовательское соглашение
      </Link>

      <div className={s['footer-contacts']}>
        <a href={import.meta.env.VITE_VK_URL}
          target="_blank"
          rel="noreferrer">
          <VK_Icon />
        </a>

        <a href={import.meta.env.VITE_TELEGRAM_URL}
          target="_blank"
          rel="noreferrer">
          <TG_Icon />
        </a>

        <a href={import.meta.env.VITE_HABR_URL}
          target="_blank"
          className={s['habr-link']}
          rel="noreferrer">
          <img src={Habr_Icon} alt="Habr" className={s['habr-icon']} />
        </a>

      </div>
    </div>
  );
}
