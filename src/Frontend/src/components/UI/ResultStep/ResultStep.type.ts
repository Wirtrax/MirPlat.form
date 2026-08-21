import type { ReactNode } from 'react';

export interface ResultStepProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
  children?: ReactNode;
  closeButton?: boolean;
  hideBachground?: boolean;
}
