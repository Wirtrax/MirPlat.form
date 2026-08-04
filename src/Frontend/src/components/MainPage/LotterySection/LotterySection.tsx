import CardLottery from './CardLottery/CardLottery';
import LotteryCountdown from './LotteryCountdown/LotteryCountdown';
import s from './LotterySection.module.scss';
import clsx from 'clsx';

export default function LotterySection() {
  return (
    <section className={clsx(s.lottery)}>
      <div className="container">
        <h2 className={s.title}>Супер-розыгрыш</h2>
        <p className={s.description}>
          Распечатай свой лотерейный чек и получи шанс выиграть суперприз
          <span>
            {' '}
            — <br /> MacBook Neo!
          </span>
        </p>
        <h3 className={s.titleCards}>Условия участия:</h3>
        <CardLottery />

        <p className={s.results}>
          Если назвали твой номер, подойди к ведущему и покажи свой лотерейный билет. <span>Удачи!</span>
        </p>

        <LotteryCountdown endDate="2026-08-09T15:00:00+03:00" />
      </div>
    </section>
  );
}
