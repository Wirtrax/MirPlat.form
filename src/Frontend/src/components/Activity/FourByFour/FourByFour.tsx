import s from './FourByFour.module.scss'

import ActivityLayout from '../ActivityLayout/ActivityLayout'
import Timer from '../Timer/Timer'

export default function FourByFour() {
    return (
        <ActivityLayout
            title='4x4'
            description='Объедини 4 тематические карточки'
            buttonText='ЗАВЕРШИТЬ'
            timer={<Timer duration={5 * 60} danger={4 * 60} />}
        >
            FourByFour
        </ActivityLayout>
    )
}
