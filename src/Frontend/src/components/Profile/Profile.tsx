import s from './Profile.module.scss'
import ProfileInfoCard from './ProfileInfoCard/ProfileInfoCard'
import { aboutCardMock, contactCardMock } from '../../mock/profileCard'

export default function Profile() {

    return (
        <div>
            <div className={s.cardsWrapper}>
                <ProfileInfoCard {...aboutCardMock} />
                <ProfileInfoCard {...contactCardMock} />
            </div>
        </div>
    )  
}
