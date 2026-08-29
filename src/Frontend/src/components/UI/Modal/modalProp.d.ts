export interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}
export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}
export interface ProductModalProps {
  src: string;
  title: string;
  price?: number;
  onClick?: () => void;
  userBalance?: number;
  code?: string;
  isLoading?: boolean;
  errorMessage?: string;
  received?: boolean;
}
export interface PurchaseSuccessContentProps {
  qrValue: string;
}
