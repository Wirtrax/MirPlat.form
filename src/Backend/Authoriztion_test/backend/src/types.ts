export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

export interface InitDataParsed {
  user: TelegramUser;
  query_id: string;
  auth_date: string;
  hash: string;
}