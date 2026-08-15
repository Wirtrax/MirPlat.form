import s from './Substrate.module.scss';

import clsx from 'clsx';

import type { substrateT } from './substrateProps';

function Substrate({ children, className, ...props }: substrateT) {
  console.log('Рендер компонента Substrate');
  return (
    <div className={clsx(s.substrate, className)} {...props}>
      {children}
    </div>
  );
}

export default Substrate;
