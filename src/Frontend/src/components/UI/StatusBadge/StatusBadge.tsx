import s from './StatusBadge.module.scss';

import clsx from 'clsx';

import { STATUS_LABELS, type StatusVariant } from './statusConfig';

interface StatusBadgeProps {
  variant: StatusVariant;
  label?: string;
}

function StatusBadge({ variant, label }: StatusBadgeProps) {
  return <span className={clsx(s['status'], s[`status--${variant}`])}>{label ?? STATUS_LABELS[variant]}</span>;
}

export default StatusBadge;
