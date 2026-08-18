export function getFirstLetters(input: string, limit?: number): string {
  const words = input.split(/[\s,;:.!?()"'-]+/).filter((word) => word.length > 0);
  const letters = words.map((word) => word[0] || '');

  if (limit !== undefined && limit > 0) {
    return letters.slice(0, limit).join('');
  }

  return letters.join('');
}

export function generateBlueGray(format: 'hex' | 'rgb' = 'hex'): string {
  const isBlue = Math.random() > 0.5;
  const brightness = 0.2 + Math.random() * 0.6;
  const base = Math.round(brightness * 255);

  let r: number, g: number, b: number;

  if (isBlue) {
    r = Math.round(base * 0.1);
    g = Math.round(base * 0.1);
    b = Math.round(base + (255 - base) * (0.5 + Math.random() * 0.5));
  } else {
    r = base;
    g = base;
    b = base;
  }
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

  const rFinal = clamp(r);
  const gFinal = clamp(g);
  const bFinal = clamp(b);

  return format === 'hex'
    ? `#${rFinal.toString(16).padStart(2, '0')}${gFinal.toString(16).padStart(2, '0')}${bFinal.toString(16).padStart(2, '0')}`
    : `rgb(${rFinal}, ${gFinal}, ${bFinal})`;
}
