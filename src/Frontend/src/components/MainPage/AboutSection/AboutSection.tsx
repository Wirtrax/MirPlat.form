import s from './AboutSection.module.scss';
import AboutSpeakers from './AboutSpeakers/AboutSpeakers';
import AboutTeam from './AboutTeam/AboutTeam';
import city from '../../../assets/interface/city2.png'

export default function AboutSection() {
  return (
      <section className={s.wrapper}>
        <AboutTeam />
        <AboutSpeakers />
        <img src={city} alt='city_image' />
      </section>
  )
}
