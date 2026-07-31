export interface Purchase {
  id: number;
  image: string;
  title: string;
}

export interface User {
  background: string;
  userName: string;
  uniqId: number;
  balance: number;
  aboutCard: AboutCard;
  contactCard: ContactCard;
  purchases: Purchase[];
}

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
