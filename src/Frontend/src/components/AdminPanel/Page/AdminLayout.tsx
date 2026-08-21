import s from './AdminLayout.module.scss';

import SideBar from '../UI/SideBar/SideBar';
import StatCard from '../UI/StatCard/StatCard';

import UsersIcon from '../../../assets/ico/admin/users.svg?react';
import GameIcon from '../../../assets/ico/admin/game.svg?react';
import ProductIcon from '../../../assets/ico/admin/product.svg?react';
import AllOrderIcon from '../../../assets/ico/admin/allOrder.svg?react';
import LogoIcon from '../../../assets/ico/app/plat.romIco.png';
import { Outlet } from 'react-router-dom';

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <div className={s['wrapper']}>
      <SideBar
        logo={LogoIcon}
        title="Leska"
        subtitle="ADMIN PANEL"
        navItems={[
          { label: 'Пользователи', path: '/admin/users', count: 0, icon: <UsersIcon /> },
          { label: 'Товары', path: '/admin/items', count: 0, icon: <ProductIcon /> },
          { label: 'Все заказы', path: '/admin/orders', count: 0, icon: <AllOrderIcon /> },
          { label: 'Участники игр', path: '/admin/attempts', count: 0, icon: <GameIcon /> },
        ]}
        adminName="Админ Дежурный"
        adminRole="Суперадмин"
        adminAvatar="АД"
        onDownloadReport={() => {}}
        onLogout={() => {}}
      />
      <main className={s['main']}>
        <section className={s['stat-card__container']}>
          <StatCard icon={<AllOrderIcon />} value={10} title="Заказов в ожидании" />
          <StatCard className={s['stat-card--deafult-blue']} icon={<GameIcon />} value={10} title="Попыток в играх" />
          <StatCard className={s['stat-card--dark-blue']} icon={<UsersIcon />} value={10} title="Всего участников" />
        </section>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
