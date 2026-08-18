import React from 'react';
import styles from './StatCard.module.scss';
import type { statCardProps } from './statCardProps';
import clsx from 'clsx';

const StatCard: React.FC<statCardProps> = ({ title, value, icon, className }) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <img src={icon} alt="" />;
    }
    return icon;
  };

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{renderIcon()}</span>}
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default StatCard;
