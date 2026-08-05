import type { ReactNode } from 'react';

export interface ResultStepProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: ReactNode;
}
