export type AvatarTheme = 'default' | 'theme-2' | 'theme-3';

export const AVATAR_THEMES: { id: AvatarTheme; color: string }[] = [
    { id: 'default', color: 'var(--color-accent)' },
    { id: 'theme-2', color: '#ff8300' },
    { id: 'theme-3', color: '#276bdc' },
];