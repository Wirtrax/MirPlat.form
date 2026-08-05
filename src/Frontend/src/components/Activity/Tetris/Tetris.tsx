import s from './Tetris.module.scss';

import ActivityLayout from "../ActivityLayout/ActivityLayout";


export default function Tetris() {
  const description = 'Собери головоломку из деталей, повторяя принцип тетриса. Когда конструкция будет готова — загрузи фото результата. После проверки модератором ты получишь баллы.'
  return (
    <ActivityLayout
      title='Стек-тетрис'
      description={description}
      buttonText='ОТПРАВИТЬ'
    >

    </ActivityLayout>
  )
}
