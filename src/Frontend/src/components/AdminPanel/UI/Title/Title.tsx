import style from './Title.module.scss';
import type { titleProps } from './titleProps';

const Title: React.FC<titleProps> = ({ title, subtitle }) => {
  return (
    <div className={style['title-block']}>
      <h1 className={style['title-block__main-title']}>{title}</h1>
      <h3 className={style['title-block__subtitle']}>{subtitle}</h3>
    </div>
  );
};

export default Title;
