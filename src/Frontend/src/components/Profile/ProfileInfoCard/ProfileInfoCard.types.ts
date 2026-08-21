import type { ReactNode } from 'react';

export interface ProfileItem {
  id: string | number;
  icon: ReactNode;
  label: string;
  value: string;
}

export interface ProfileInfoCardProps {
  title: string;
  items: ProfileItem[];
}
