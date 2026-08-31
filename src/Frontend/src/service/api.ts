import type { OrderWithItemId } from '../types/OrderResponseType';
import type { createOrderResponse, Product } from './features/shop/shopType';
import type { CreateUser, User } from './features/user/userType';

import { getAuthToken, setAuthToken, request } from './utils/query';
interface AuthResponse {
  token: string;
}

const getInitData = (): string => {
  return window.Telegram?.WebApp?.initData || 'devtest1';
};

export const login = async () => {
  const data = await request<AuthResponse>('/auth/signin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
      'Content-Type': 'application/json',
    },
  });
  setAuthToken(data.token);
  return data;
};

export const logout = () => {
  setAuthToken(null);
  return request('/auth/logout', {
    method: 'POST',
  });
};

export const postUser = (data: CreateUser) => {
  return request<User>('/user', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getUser = () => {
  return request<User>('/user', {
    method: 'GET',
  });
};

export const devLogin = async (): Promise<User> => {
  await login();
  return getUser();
};

export const getProducts = () => {
  return request<Product[]>('/item', {
    method: 'GET',
  });
};

export const getItemByIdItem = (id: number): Promise<Product> => {
  return request(`/item/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const createOrder = (id: number): Promise<createOrderResponse> => {
  return request(`/item/${id}/purchase`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const getOrderByCode = (code: string): Promise<OrderWithItemId> => {
  return request(
    `/orders/by-code/${code}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
    'admin'
  );
};

export const cancelOrderViaCode = (
  code: string
): Promise<{
  success: boolean;
}> => {
  return request(`/purchase/${code}/cancel`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const acceptOrderViaCode = (
  code: string
): Promise<{
  success: boolean;
}> => {
  return request(`/purchase/${code}/receive`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};
