import clsx from 'clsx';
import s from './Substrate.module.scss';
import type { substrateT } from './substrateProps';

function Substrate({ children, className, ...props }: substrateT) {
  return <div className={clsx(s.substrate, className)}  {...props}>{children}</div>;
}

export default Substrate;
