export interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}
export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

interface ProductModalProps {
  src: string;
  title: string;
  price: number;
  userBalance?: number;
  onClick: () => void;
}
