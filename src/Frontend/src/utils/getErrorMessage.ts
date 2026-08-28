const errorMessages: Record<string, string> = {
    // покупки
    'Sorry, this item is sold out': 'К сожалению, товар закончился.',
    'This item is not for sale': 'Этот товар сейчас недоступен для покупки.',
    'Purchase already received or cancelled': 'Покупка уже получена или отменена.',

    // активности
    'Attempt is already exist': 'Эта активность уже пройдена.',
    'Invalid number of right answers': 'Некорректное количество правильных ответов.',
    'Invalid number of right questions': 'Некорректное количество правильных ответов.',
}

export const getErrorMessage = (message: string | null) => {
    if (!message) {
        return 'Что-то пошло не так. Попробуйте ещё раз.'
    }

    return errorMessages[message]
        ?? 'Что-то пошло не так. Попробуйте ещё раз.'
}