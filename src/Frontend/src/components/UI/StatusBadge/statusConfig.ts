export type StatusVariant =
  | 'pending' // В ожидании (заказы)
  | 'received' // Получен (заказы)
  | 'cancelled' // Отменён (заказы)
  | 'active' // Активен (товары)
  | 'hidden' // Скрыт (товары)
  | 'admin'; // Админ (участники)

export const STATUS_LABELS: Record<StatusVariant, string> = {
  pending: 'В ожидании',
  received: 'Получен',
  cancelled: 'Отменён',
  active: 'Активен',
  hidden: 'Скрыт',
  admin: 'Админ',
};
