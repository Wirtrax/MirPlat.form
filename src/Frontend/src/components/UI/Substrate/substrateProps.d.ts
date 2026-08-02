import type { HTMLAttributes } from "react";

export type substrateT = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};
