export type ThemeType = {
    name: string;
    isDark?: boolean;
    noOverlay?: boolean;
    css: {
        [key: string]: string;
    };
};

export const themes: ThemeType[] = [
    {
        name: 'Default',
        noOverlay: true,
        css: {
            '--discord-background': '',
        },
    },
    {
        name: 'Discord Light',
        noOverlay: true,
        css: {
            '--discord-background': '#FFFFFF',
        },
    },
    {
        name: 'Discord Dark',
        noOverlay: true,
        isDark: true,
        css: {
            '--discord-background': '#313338',
        },
    },
    {
        name: 'Mint apple',
        isDark: false,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(166 39.7% 52.5% /1) 6.15%, hsl(119 40.4% 55.9% /1) 48.7%, hsl(87 48.3% 59.8% /1) 93.07%)',
        },
    },
    {
        name: 'Aurora',
        isDark: true,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(220 86.5% 17.5%) 6.15%, hsl(238 76.4% 41.6%) 48.7%, hsl(184 78% 33.9%) 93.07%)',
        },
    },
    {
        name: 'Chroma',
        isDark: true,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(183 86.3% 40.2%) 6.15%, hsl(258 89.8% 46.3%) 48.7%, hsl(298 90.9% 34.3%) 93.07%)',
        },
    },
    {
        name: 'Citrus',
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(40 88.7% 58.2%) 6.15%, hsl(18 81.5% 63.9%) 93.07%)',
        },
    },
    {
        name: 'Cotton',
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(349 76.8% 81.4%) 6.15%, hsl(226 92.6% 84.1%) 93.07%)',
        },
    },
    {
        name: 'Crimson',
        isDark: true,
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(0 88.6% 31%) 6.15%, hsl(0 0% 0%) 93.07%)',
        },
    },
    {
        name: 'Desert',
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(29 32.4% 86.1%) 6.15%, hsl(40 41.3% 78.6%) 48.7%, hsl(50 49.6% 75.9%) 93.07%)',
        },
    },
    {
        name: 'Dusk',
        isDark: true,
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(293 13.5% 36.3%) 6.15%, hsl(223 41% 69.4%) 93.07%)',
        },
    },
    {
        name: 'Easter',
        isDark: true,
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(227 58.4% 65.1%) 6.15%, hsl(227 31% 44.3%) 93.07%)',
        },
    },
    {
        name: 'Forest',
        isDark: true,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(124 25.9% 10.6%) 6.15%, hsl(143 26.2% 23.9%) 48.7%, hsl(76 20.6% 24.7%) 93.07%)',
        },
    },
    {
        name: 'Hanami',
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(352 68.3% 80.2%) 6.15%, hsl(43 73.6% 76.3%) 48.7%, hsl(116 43.1% 74.5%) 93.07%)',
        },
    },
    {
        name: 'Lofi',
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(220 83.8% 80.6%) 6.15%, hsl(184 57.8% 78.6%) 48.7%, hsl(130 46.3% 78.8%) 93.07%)',
        },
    },
    {
        name: 'Mars',
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(15 36.3% 39.4%) 6.15%, hsl(0 36.2% 41.2%) 93.07%)',
        },
    },
    {
        name: 'Midnight',
        isDark: true,
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(245 55.1% 53.7%) 6.15%, hsl(259 74.5% 10.8%) 93.07%)',
        },
    },
    {
        name: 'Neon',
        isDark: true,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(176 98.8% 33.1%) 6.15%, hsl(259 39.5% 55.3%) 48.7%, hsl(314 52.5% 46.3%) 93.07%)',
        },
    },
    {
        name: 'Retro',
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(202 47% 42.9%) 6.15%, hsl(241 29.6% 61%) 93.07%)',
        },
    },
    {
        name: 'Sepia',
        isDark: true,
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(33 14.2% 45.7%) 6.15%, hsl(36 46.8% 24.3%) 93.07%)',
        },
    },
    {
        name: 'Strawberry',
        isDark: true,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(327 74.1% 39.4%) 6.15%, hsl(28 71.7% 44.3%) 48.7%, hsl(40 80.2% 52.5%) 93.07%)',
        },
    },
    {
        name: 'Sunrise',
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(327 42% 43.9%) 6.15%, hsl(27 44.9% 58%) 48.7%, hsl(50 46.3% 44.5%) 93.07%)',
        },
    },
    {
        name: 'Sunset',
        isDark: true,
        css: {
            '--discord-background': 'linear-gradient(180deg, hsl(259 55.6% 35.3%) 6.15%, hsl(22 66.7% 57.6%) 93.07%)',
        },
    },
    {
        name: 'Under the Sea',
        isDark: true,
        css: {
            '--discord-background':
                'linear-gradient(180deg, hsl(115 10.5% 42.9%) 6.15%, hsl(159 20.4% 43.3%) 48.7%, hsl(175 10.9% 46.7%) 93.07%)',
        },
    },
];
