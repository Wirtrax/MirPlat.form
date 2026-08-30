export function getFirstLetters(input: string, limit?: number): string {
  const words = input.split(/[\s,;:.!?()"'-]+/).filter((word) => word.length > 0);
  const letters = words.map((word) => word[0] || '');

  if (limit !== undefined && limit > 0) {
    return letters.slice(0, limit).join('');
  }

  return letters.join('');
}
