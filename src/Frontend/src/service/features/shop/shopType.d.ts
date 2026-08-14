import type { User } from '../user/userType';

export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  is_active: boolean;
};

export type productState = {
  products: Product[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
};

export type createOrderResponse = {
  code: string;
  id: number;
  item: Product;
  status: string;
  user: User;
};
