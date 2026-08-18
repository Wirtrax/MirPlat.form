import s from './SubstrateForUser.module.scss';

export interface SubstrateForUserProps {
  children: React.ReactNode;
}

const SubstrateForUser: React.FC<SubstrateForUserProps> = ({ children }) => {
  return <div className={s.substrate}>{children}</div>;
};

export default SubstrateForUser;
