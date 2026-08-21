import s from './AboutSpeakers.module.scss';

import { speakersMock } from '../../../../mock/speakers';

import Slider from '../../../Instructions/Slider/Slider';

export default function AboutSpeakers() {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Спикеры и эксперты</div>
      <Slider showDots={false} slidesPerView={1.37} options={{ spaceBetween: 16 }}>
        {speakersMock.map((speaker) => (
          <article className={s.speakerCard} key={speaker.id}>
            <img src={speaker.avatar} className={s.avatar} />
            <h3 className={s.name}>{speaker.name}</h3>
            <h3 className={s.subtitle}>{speaker.position}</h3>
            <p className={s.description}>{speaker.description}</p>
          </article>
        ))}
      </Slider>
    </div>
  );
}
