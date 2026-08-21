import s from './ChekboxAdmin.module.scss';

interface ChekboxAdminProps {
  label?: string;
  subtitle?: string;
  isCheck: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChekboxAdmin: React.FC<ChekboxAdminProps> = ({ label, subtitle, isCheck, name, onChange }) => {
  return (
    <div className={s['switch']}>
      <input
        type="checkbox"
        checked={isCheck}
        onChange={onChange}
        id={name}
        name={name}
        className={s['switch__input']}
      />
      <label htmlFor={name} className={s['switch__label']}>
        {label}
      </label>
      <span className={s['switch__info']}>{subtitle}</span>
    </div>
  );
};

export default ChekboxAdmin;
