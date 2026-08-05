import s from './Loader.module.scss';

import Background from '../Background/Background';

export default function Loader() {
  return (
    <Background>
      <div className={s.wrapper}>
        <span className={s.loader}></span>
      </div>
    </Background>
  );
}
