import s from './Header.module.scss';

import BurgerMenu from '../../assets/header/burgerMenu.svg?react';
import headerLogo from '../../assets/interface/plat.formFooter.webp';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className={s.header}>
      <div className={s['header-menu']}>
        <img src={headerLogo} className={s['header-logo']} />
        <BurgerMenu onClick={() => setOpen((prev) => !prev)} />
      </div>

      <nav className={`${s.menu} ${open ? s.open : ''}`}>
        <Link to={ROUTES.HOME} onClick={() => setOpen(false)} className={s['menu-item']}>
          Главная
        </Link>
        <Link to={ROUTES.PROFILE} onClick={() => setOpen(false)} className={s['menu-item']}>
          Профиль
        </Link>
        <Link to={ROUTES.ACTIVITIES} onClick={() => setOpen(false)} className={s['menu-item']}>
          Активности
        </Link>
        <Link to={ROUTES.SHOP} onClick={() => setOpen(false)} className={s['menu-item']}>
          Магазин
        </Link>
      </nav>

      <div className={`${s.overlay} ${open ? s.open : ''}`} onClick={() => setOpen(false)} />
    </div>
  );
}
