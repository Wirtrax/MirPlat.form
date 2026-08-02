interface Lottery {
    id: number;
    description: string;
}

export const lotteryCardMock: Lottery[] = [
    {
        id: 1,
        description: 'Распечатай лотерейный чек в активности «Фотобудка СБП»',
    },
    {
        id: 2,
        description: 'Сфотографируй или сохрани чек до начала розыгрыша',
    },
    {
        id: 3,
        description: 'Подпишись на одну из социальных сетей Мир Plat.Form: ',
    },
    {
        id: 4,
        description: 'Подойди к стенду Мир Plat.Form к началу розыгрыша (28 апреля в 17:30)',
    },
    {
        id: 5,
        description: 'Победителя определит рандомайзер',
    }
]