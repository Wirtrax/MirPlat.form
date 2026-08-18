export interface adminButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  withPlus?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
