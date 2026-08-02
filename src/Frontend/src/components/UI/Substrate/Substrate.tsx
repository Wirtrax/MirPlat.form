import clsx from 'clsx';
import s from './Substrate.module.scss';
import type { substrateT } from './substrateProps';

<<<<<<< HEAD
function Substrate({ children, className }: substrateT) {
  console.log('Рендер компонента Substrate');
  return <div className={clsx(s.substrate, className)}>{children}</div>;
=======
function Substrate({ children, className, ...props }: substrateT) {
  return <div className={clsx(s.substrate, className)}  {...props}>{children}</div>;
>>>>>>> frontend-main
}

export default Substrate;
