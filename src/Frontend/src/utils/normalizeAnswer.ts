export const normalizeAnswer = (value: string) => {
    return value
        .trim()
        .toLocaleLowerCase('ru-RU')
        .replace(/\s+/g, ' ');
}
