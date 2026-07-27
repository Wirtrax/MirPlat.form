import type { ProfileItem, ProfileInfoCardProps } from '../components/Profile/ProfileInfoCard/ProfileInfoCard.types'
import EmailIcon from '../assets/profile/contacts/email.svg?react'
import PhoneIcon from '../assets/profile/contacts/phone.svg?react'
import SpecializationIcon from '../assets/profile/contacts/specialization.svg?react'
import LevelIcon from '../assets/profile/contacts/level.svg?react'

export const contactCardMock: ProfileInfoCardProps = {
    title: 'Контакты',
    items: [
        {
            id: 'email',
            icon: <EmailIcon />,
            label: 'E-mail',
            value: 'MirEvent@nspk.ru',
        },
        {
            id: 'phone',
            icon: <PhoneIcon />,
            label: 'Номер телефона',
            value: '+7 999-999-99-99',
        },
    ],
}

export const aboutCardMock: ProfileInfoCardProps = {
    title: 'О тебе',
    items: [
        {
            id: 'spec',
            icon: <SpecializationIcon />,
            label: 'Специализация',
            value: 'ML инженер',
        },
        {
            id: 'level',
            icon: <LevelIcon             />,
            label: 'Уровень',
            value: 'Сеньор (senior)',
        },
    ],
}