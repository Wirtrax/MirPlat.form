import clsx from 'clsx';
import s from './SubstrateForUser.module.scss';

export interface SubstrateForUserProps {
  children: React.ReactNode;
  className?: string;
}

const SubstrateForUser: React.FC<SubstrateForUserProps> = ({ children, className = '' }) => {
  return <div className={clsx(s.substrate, className)}>{children}</div>;
};

export default SubstrateForUser;
