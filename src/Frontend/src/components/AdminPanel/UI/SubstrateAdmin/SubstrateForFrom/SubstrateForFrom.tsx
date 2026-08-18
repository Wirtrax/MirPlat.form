import s from './SubstrateForFrom.module.scss';
interface SubstrateForFromProps {
  children: React.ReactNode;
  title?: string;
  count?: number;
}

const SubstrateForFrom: React.FC<SubstrateForFromProps> = ({ children, title, count }) => {
  return (
    <div className={s.substrate}>
      <h3 className={s.title}>
        {title} <span className={s.title__count}>{count}</span>
      </h3>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default SubstrateForFrom;
