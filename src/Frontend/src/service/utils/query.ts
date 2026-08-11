import { checkResponse } from './responseCheck';

const API_URL = 'https://bootcamp.game-back.ru/api';
const TOKEN_STORAGE_KEY = 'authToken';

let authToken: string | null = typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null;

export const setAuthToken = (token: string | null): void => {
  authToken = token;
  if (typeof localStorage === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

export const getAuthToken = (): string | null => authToken;

export const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const headers = new Headers(options.headers);
  if (!headers.has('Authorization') && authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    // credentials: 'include',
    ...options,
    headers
  });
  return checkResponse(res);
};
