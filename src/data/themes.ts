export type Theme = {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    darkPage: string;
    positive: string;
    negative: string;
    info: string;
    warning: string;
    textColor: string;
};

export const themes: Record<string, Theme> = {
    Wisteria: {
        primary: '#191927',
        secondary: '#8a8ab5',
        accent: '#b5b5db',
        dark: '#13131b',
        darkPage: '#262635',
        positive: '#8ad1a7',
        negative: '#e08686',
        info: '#8f8fd8',
        warning: '#e0d085',
        textColor: '#dcdce6'
    },
    Bluemoon: {
        primary: '#0d1422',
        secondary: '#5a7aa5',
        accent: '#88aadd',
        dark: '#0a0e18',
        darkPage: '#131d2f',
        positive: '#48B79C',
        negative: '#e68ba3',
        info: '#7799cc',
        warning: '#d8c080',
        textColor: '#d8e2f0'
    },
    Americano: {
        primary: '#151111',
        secondary: '#352C2A',
        accent: '#A68A7D',
        dark: '#130F0E',
        darkPage: '#221C1A',
        positive: '#85A595',
        negative: '#C27C84',
        info: '#9C8679',
        warning: '#B8957E',
        textColor: '#D9CBC2'
    },
    Aqua: {
        primary: '#0f1a24',
        secondary: '#3a7899',
        accent: '#66ccee',
        dark: '#0b131a',
        darkPage: '#152837',
        positive: '#6dd8ff',
        negative: '#ff8ba3',
        info: '#5faadd',
        warning: '#ffcc80',
        textColor: '#e0f0ff'
    },
    Vice: {
        primary: '#1e152e',
        secondary: '#c8709f',
        accent: '#ff99c2',
        dark: '#160d22',
        darkPage: '#2c1f3a',
        positive: '#88e8d8',
        negative: '#ff99c4',
        info: '#77b8ff',
        warning: '#ffccaa',
        textColor: '#ffd6ea'
    },
    Lilaq: {
        primary: '#121523',
        secondary: '#7a88d6',
        accent: '#a5aee6',
        dark: '#101220',
        darkPage: '#1b1d2e',
        positive: '#86c1e6',
        negative: '#e686a3',
        info: '#9696e6',
        warning: '#e0d1b5',
        textColor: '#e0e0e7'
    }
};
