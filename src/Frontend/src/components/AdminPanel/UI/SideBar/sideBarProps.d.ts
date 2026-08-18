export interface sideBarNavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  count?: number | string;
}

export interface sideBarProps {
  logo?: React.ReactNode | string;
  title: string;
  subtitle?: string;
  navItems: SideBarNavItem[];
  adminName?: string;
  adminRole?: string;
  adminAvatar?: React.ReactNode | string;
  onDownloadReport?: () => void;
  downloadLabel?: string;
  onLogout?: () => void;
  logoutLabel?: string;
  className?: string;
}
