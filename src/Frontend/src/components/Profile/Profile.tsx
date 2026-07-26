import s from './Profile.module.scss'
import ProfileContacts from './ProfileContacts/ProfileContacts'


export default function Profile() {
    const email = 'rrrr'
    const phone = '6895086954'


    return (
        <div className={s.profilePage}>
            <ProfileContacts email={email} phone={phone} />
        </div>
    )
}
