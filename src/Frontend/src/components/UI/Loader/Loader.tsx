import s from './Loader.module.scss';
import clsx from 'clsx';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={clsx(s.wrapper, className)}>
      <span className={s.loader}></span>
    </div>
  );
}
