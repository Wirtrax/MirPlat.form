import Background from '../Background/Background'
import s from './Loader.module.scss'

export default function Loader() {
  return (
    <Background >
        <div className={s.wrapper}>
              <span className={s.loader}></span>
        </div>
    </Background>
  )
}
