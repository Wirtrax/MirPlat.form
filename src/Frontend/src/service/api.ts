import type { CreateUser, User } from './features/user/userType';

import { getAuthToken, setAuthToken, request } from './utils/query';

interface AuthResponse {
  token: string;
}

const getInitData = (): string => {
  return window.Telegram?.WebApp?.initData || 'devtest2'
}

export const login = async () => {
  // const data = await request<{ token: string }>('/auth/signin', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${getInitData()}`,
  //     'Content-Type': 'application/json',
  //   },
  // });

  // document.cookie = `token=${data.token}; path=/`
  const data = await request<AuthResponse>('/auth/signin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
      'Content-Type': 'application/json',
    },
  });
  setAuthToken(data.token);
  return data
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
      // Authorization: `Bearer ${getInitData()}`,
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

