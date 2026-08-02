import s from './Profile.module.scss'
import ProfileInfoCard from './ProfileInfoCard/ProfileInfoCard'
import { aboutCardMock, contactCardMock } from '../../mock/profileCard'
import clsx from 'clsx'

export default function Profile() {

    return (
        <div>
            <div className={clsx(s.cardsWrapper, 'container')}>
                <ProfileInfoCard {...aboutCardMock} />
                <ProfileInfoCard {...contactCardMock} />
            </div>
        </div>
    )  
}
