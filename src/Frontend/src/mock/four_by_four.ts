import WhiteUser from '../assets/activity/fourByFour/whiteUser.svg?react'
import BlueUser from '../assets/activity/fourByFour/blueUser.svg?react'
import GreenUser from '../assets/activity/fourByFour/greenUser.svg?react'
import GreenFillUser from '../assets/activity/fourByFour/greenFillUser.svg?react'

export interface CardItem {
    id: number;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    groupId: 'white' | 'blue' | 'green' | 'greenFill';
}

export const fourGameCards: CardItem[] = [
    { id: 1, Icon: WhiteUser, groupId: 'white' },
    { id: 2, Icon: WhiteUser, groupId: 'white' },
    { id: 3, Icon: WhiteUser, groupId: 'white' },
    { id: 4, Icon: WhiteUser, groupId: 'white' },

    { id: 5, Icon: BlueUser, groupId: 'blue' },
    { id: 6, Icon: BlueUser, groupId: 'blue' },
    { id: 7, Icon: BlueUser, groupId: 'blue' },
    { id: 8, Icon: BlueUser, groupId: 'blue' },

    { id: 9, Icon: GreenUser, groupId: 'green' },
    { id: 10, Icon: GreenUser, groupId: 'green' },
    { id: 11, Icon: GreenUser, groupId: 'green' },
    { id: 12, Icon: GreenUser, groupId: 'green' },

    { id: 13, Icon: GreenFillUser, groupId: 'greenFill' },
    { id: 14, Icon: GreenFillUser, groupId: 'greenFill' },
    { id: 15, Icon: GreenFillUser, groupId: 'greenFill' },
    { id: 16, Icon: GreenFillUser, groupId: 'greenFill' },

    { id: 17, Icon: WhiteUser, groupId: 'white' },
    { id: 18, Icon: WhiteUser, groupId: 'white' },
    { id: 19, Icon: WhiteUser, groupId: 'white' },
    { id: 20, Icon: WhiteUser, groupId: 'white' },

    { id: 21, Icon: BlueUser, groupId: 'blue' },
    { id: 22, Icon: BlueUser, groupId: 'blue' },
    { id: 23, Icon: BlueUser, groupId: 'blue' },
    { id: 24, Icon: BlueUser, groupId: 'blue' },

    { id: 25, Icon: GreenUser, groupId: 'green' },
    { id: 26, Icon: GreenUser, groupId: 'green' },
    { id: 27, Icon: GreenUser, groupId: 'green' },
    { id: 28, Icon: GreenUser, groupId: 'green' },

    { id: 29, Icon: GreenFillUser, groupId: 'greenFill' },
    { id: 30, Icon: GreenFillUser, groupId: 'greenFill' },
    { id: 31, Icon: GreenFillUser, groupId: 'greenFill' },
    { id: 32, Icon: GreenFillUser, groupId: 'greenFill' },
]