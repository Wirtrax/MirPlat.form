import { auth } from './auth';
import type { CreateUser, User } from './features/user/userType';

import { request } from './utils/query';

const getInitData = (): string => {
  return window.Telegram?.WebApp?.initData || 'devtest2'
}

export const login = () => {
  return request<{ token: string }>('/auth/signin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
    },
  });
};

export const postUser = (data: CreateUser) => {

  return request('/user', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getUser = () => {
  return request<User>('/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${auth.getToken()}`,
    },
  });
};
