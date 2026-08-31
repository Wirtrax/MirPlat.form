import s from './AboutSection.module.scss';

import city from '../../../assets/interface/city2.png';

import { memo } from 'react';

import AboutSpeakers from './AboutSpeakers/AboutSpeakers';
import AboutTeam from './AboutTeam/AboutTeam';


const AboutSection = memo(function AboutSection() {
  return (
    <section className={s.wrapper}>
      <AboutTeam />
      <AboutSpeakers />
      <img src={city} alt="city_image" />
    </section>
  );
})

export default AboutSection