import clsx from 'clsx';
import s from './Substrate.module.scss';
import type { substrateT } from './substrateProps';

function Substrate({ children, className }: substrateT) {
  return <div className={clsx(s.substrate, className)}>{children}</div>;
}

export default Substrate;
