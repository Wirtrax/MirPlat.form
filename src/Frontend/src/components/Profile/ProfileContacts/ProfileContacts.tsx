import s from './ProfileContacts.module.scss'
import EmailIcon from '../../../assets/profile/contacts/email.svg?react'
import PhoneIcon from '../../../assets/profile/contacts/phone.svg?react'

interface ProfileContactsProps {
    email: string
    phone: string
}

export default function ProfileContacts({ email, phone }: ProfileContactsProps) {
    return (
        <div className={s['card-contacts']}>
            <h3 className={s['contacts-title']} >Контакты</h3>
            <div className={s['contacts']}>
                <div className={s['contacts-email']}>
                    <EmailIcon />
                    <div className={s['details']}>
                        <div className={s['details-title']}>E-mail</div>
                        <div className={s['email']}>{email}</div>
                    </div>
                </div>
                <div className={s['contacts-phone']}>
                    <PhoneIcon />
                    <div className={s['details']}>
                        <div className={s['details-title']}>Номер телефона</div>
                        <div className={s['phone']}>{phone}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
