import s from './AboutTeam.module.scss';
import VK_Icon from '../../../../assets/footer/vk.svg?react';
import TG_Icon from '../../../../assets/footer/tg.svg?react';
import Habr_Icon from '../../../../assets/footer/splash.svg?react';
import Site_Icon from '../../../../assets/footer/site.svg?react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function AboutTeam() {
  return (
      <div className={clsx('container', s.wrapper)}>
          <h2 className={s.title}>О команде</h2>
          <div className={s.description}>
              Мир Plat.Form — технологическая команда Национальной системы платежных
              карт (НСПК).
              <br />
              <br />
              Мы развиваем продукты и сервисы ПС «Мир», улучшаем Систему быстрых
              платежей совместно с Банком России, а также обеспечиваем удобные и
              безопасные платежи с помощью биоэквайринга и универсальных QR-кодов.
          </div>
          <div className={s.icons}>
              <Link to={'https://mir-platform.ru/'}>
                  <Site_Icon />
              </Link>
              <Link to={'https://vk.com/mir_plat.form'}>
                  <VK_Icon />
              </Link>
              <Link to={'https://habr.com/ru/specials/978610/'}>
                  <Habr_Icon />
              </Link>
              <Link to={'https://t.me/mir_platform'}>
                  <TG_Icon />
              </Link>
          </div>
    </div>
  )
}
