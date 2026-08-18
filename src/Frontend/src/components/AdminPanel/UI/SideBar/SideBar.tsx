import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminButton from '../AdminButton/AdminButton';
import styles from './SideBar.module.scss';
import type { sideBarNavItem, sideBarProps } from './sideBarProps';
import DownloadIcon from '../../../../assets/ico/admin/dowload.svg?react';

const SideBar: React.FC<sideBarProps> = ({
  logo,
  title,
  subtitle,
  navItems,
  adminName,
  adminRole,
  adminAvatar,
  onDownloadReport,
  downloadLabel = 'Скачать отчёт',
  onLogout,
  logoutLabel = 'Выйти',
  className = '',
}) => {
  const renderMedia = (media: React.ReactNode | string | undefined) => {
    if (!media) return null;
    if (typeof media === 'string') {
      const isImage = /\.(png|jpe?g|svg|webp|gif)$/i.test(media);
      return isImage ? <img src={media} alt="" /> : <span>{media}</span>;
    }
    return media;
  };

  const renderNavItem = (item: sideBarNavItem) => {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
      `${styles['sidebar__nav-item']} ${isActive ? styles['sidebar__nav-item--active'] : ''}`;

    return (
      <NavLink key={item.path} to={item.path} className={getNavLinkClass}>
        {item.icon && <span className={styles['sidebar__nav-icon']}>{renderMedia(item.icon)}</span>}
        <span className={styles['sidebar__nav-label']}>{item.label}</span>
        {item.count !== undefined && <span className={styles['sidebar__nav-badge']}>{item.count}</span>}
      </NavLink>
    );
  };

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <div className={styles['sidebar__logo']}>
        {logo && <div className={styles['sidebar__logo-icon']}>{renderMedia(logo)}</div>}
        <div className={styles['sidebar__logo-text']}>
          <span className={styles['sidebar__logo-title']}>{title}</span>
          {subtitle && <span className={styles['sidebar__logo-subtitle']}>{subtitle}</span>}
        </div>
      </div>

      <nav className={styles['sidebar__nav']}>{navItems.map(renderNavItem)}</nav>

      <div className={styles['sidebar__spacer']} />

      {onDownloadReport && (
        <div className={styles['sidebar__actions']}>
          <AdminButton className={styles['sidebar__download-btn']} onClick={onDownloadReport}>
            <DownloadIcon />
            {downloadLabel}
          </AdminButton>
        </div>
      )}

      {(adminName || adminAvatar || adminRole) && (
        <div className={styles['sidebar__footer']}>
          {adminAvatar && <div className={styles['sidebar__avatar']}>{renderMedia(adminAvatar)}</div>}
          <div className={styles['sidebar__profile-info']}>
            {adminName && <span className={styles['sidebar__profile-name']}>{adminName}</span>}
            {adminRole && <span className={styles['sidebar__profile-role']}>{adminRole}</span>}
          </div>
        </div>
      )}

      {onLogout && (
        <AdminButton className={styles['sidebar__logout-btn']} onClick={onLogout}>
          {logoutLabel}
        </AdminButton>
      )}
    </aside>
  );
};

export default SideBar;
