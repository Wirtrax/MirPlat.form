export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CodeTask {
    id: number;
    difficulty: Difficulty;
    codeLines: string[];
    correctLineIndex: number;
}

export const TASKS_DATA: CodeTask[] = [
    {
        id: 1,
        difficulty: 'easy',
        codeLines: [
            'function calculateTotal(price, count) {',
            '  const total = price * count',
            '  if (total = 0) {',
            '    return "Free";',
            '  }',
            '  return total;',
            '}'
        ],
        correctLineIndex: 2 // Ошибка: присваивание "=" вместо сравнения "==="
    },
    {
        id: 2,
        difficulty: 'easy',
        codeLines: [
            'const user = { name: "Anna", age: 25 };',
            'const keys = Object.keys(user);',
            'for (let i = 0; i <= keys.length; i++) {',
            '  console.log(user[keys[i]]);',
            '}'
        ],
        correctLineIndex: 2 // Ошибка: "i <= keys.length" выйдет за пределы массива (нужно "<")
    },
    {
        id: 3,
        difficulty: 'easy',
        codeLines: [
            'bool loadQM (Translator &translator, QIODevice &dev) {',
            '  case Tag_Translation:',
            '    int len = read32(m);',
            '    if (len % 1)',
            '      cd.appendError("QM-Format error");',
            '    return false;',
            '}'
        ],
        correctLineIndex: 3 // Ошибка: "len % 1" всегда равен 0
    },
    {
        id: 4,
        difficulty: 'medium',
        codeLines: [
            'const fetchUserData = async (userId) => {',
            '  const response = fetch(`/api/users/${userId}`);',
            '  const data = await response.json();',
            '  return data;',
            '};'
        ],
        correctLineIndex: 1 // Ошибка: пропущен "await" перед fetch(...)
    },
    {
        id: 5,
        difficulty: 'medium',
        codeLines: [
            'const numbers = [10, 20, 30, 40];',
            'const doubled = numbers.map((num) => {',
            '  num * 2;',
            '});',
            'console.log(doubled);'
        ],
        correctLineIndex: 2 // Ошибка: нет "return" в фигурных скобках стрелочной функции
    },
    {
        id: 6,
        difficulty: 'hard',
        codeLines: [
            'const state = { count: 0, items: [] };',
            'function addItem(newState, item) {',
            '  newState.items.push(item);',
            '  return { ...newState, count: newState.count + 1 };',
            '}'
        ],
        correctLineIndex: 2 // Ошибка: прямая мутация состояния ".push(item)" вместо иммутабельного массива
    },
    {
        id: 7,
        difficulty: 'hard',
        codeLines: [
            'useEffect(() => {',
            '  const interval = setInterval(() => {',
            '    setSeconds((prev) => prev + 1);',
            '  }, 1000);',
            '  return clearInterval(interval);',
            '}, []);'
        ],
        correctLineIndex: 4 // Ошибка: вызов "clearInterval(interval)" сразу вместо передачи колбэка "() => clearInterval(interval)"
    }
];