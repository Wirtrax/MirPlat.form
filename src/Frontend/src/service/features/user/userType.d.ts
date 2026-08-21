import type { createOrderResponse, Product } from '../shop/shopType';
export interface CreateUser {
  first_name: string;
  last_name: string;
  patronym: string;
  specialization: string;
  programming_level: string;
  email: string;
  phone_number: string;
  send_notifications: boolean;
}

export interface User extends CreateUser {
  id: number;
  telegram_id: string;
  balance: number;
  is_admin: boolean;
  profile_picture: string;
  purchases: createOrderResponse[];
  attempts: any[];
}

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}
