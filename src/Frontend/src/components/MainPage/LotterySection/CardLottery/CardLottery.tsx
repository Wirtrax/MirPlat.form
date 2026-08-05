import s from './CardLottery.module.scss';

import avatar from '../../../../assets/avatar/default.webp';

import { lotteryCardMock } from '../../../../mock/lotteryCard';

export default function CardLottery() {
  return (
    <div className={s.cardList}>
      <img src={avatar} alt="fox" className={s.lotteryFox} />
      {lotteryCardMock.map((card) => (
        <div key={card.id} className={s.cardItem}>
          <div className={s.number}>{card.id}</div>
          <p className={s.description}>
            {card.description}
            {card.id === 3 && (
              <span className={s.links}>
                <a href="https://vk.com/mir_plat.form">Telegram</a>, <a href="https://t.me/mir_platform">ВКонтакте</a>,{' '}
                <a href="https://habr.com/ru/specials/978610/">Хабр</a>
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
