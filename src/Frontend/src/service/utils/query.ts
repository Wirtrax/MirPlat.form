const API_URL = import.meta.env.VITE_API_URL;
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

export const request = async <T>(
  endpoint: string,
  options: RequestInit = {},
  typeRoute: 'admin' | 'admin_panel' | 'api' = 'api'
): Promise<T> => {
  const headers = new Headers(options.headers);
  if (!headers.has('Authorization') && authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const res = await fetch(`${API_URL}${typeRoute}${endpoint}`, {
    // credentials: 'include',
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    const message = typeof errorData?.message === 'string' ? errorData.message : `Ошибка: ${res.status}`;

    throw new Error(message);
  }

  return res.json() as Promise<T>;
};
