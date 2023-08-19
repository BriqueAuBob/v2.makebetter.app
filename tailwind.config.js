/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['node_modules/tailvue/dist/tailvue.es.js'],
    darkMode: 'class',
    safelist: ['dark:bg-primary-950', 'dark:text-gray-100'],
    theme: {
        extend: {
            fontFamily: {
                display: 'Public Sans, Montserrat, Arial, sans-serif',
                sans: 'Public Sans, Open Sans, Arial, sans-serif',
            },
            colors: {
                tools: {
                    discord: {
                        blurple: '#5865F2',
                    },
                },
                primary: {
                    50: '#f2f7ff',
                    100: '#e5edff',
                    200: '#b2c8ff',
                    300: '#82a2ff',
                    400: '#5678ff',
                    500: '#2c07ff',
                    600: '#1f00cc',
                    700: '#170099',
                    800: '#0f0066',
                    900: '#080033',
                    950: '#04001a',
                },
            },
            backgroundImage: {
                'header-home': "url('/images/backgrounds/header_home.jpg')",
                'grid-square': "url('/images/backgrounds/grid_square.svg')",
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                footer: "url('/images/backgrounds/footer.jpg')",
            },
            blur: {
                xs: '2px',
            },
            transitionTimingFunction: {
                smooth: 'cubic-bezier(.175, .885, .32, 1.275)',
            },
            boxShadow: {
                top2xl: '0 -20px 67px -45px var(--tw-shadow-color)',
            },
            rotate: {
                1: '1deg',
                2: '2deg',
            },
            zIndex: {
                '-1': '-1',
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-0.5deg)' },
                    '50%': { transform: 'rotate(0.5deg)' },
                },
            },
        },
    },
    plugins: [
        ({ addUtilities }) => {
            const newUtilities = {
                '.arrow::before': {
                    content: "''",
                    display: 'block',
                    width: '0',
                    height: '0',
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderBottom: '10px solid var(--arrow-color)',
                    position: 'absolute',
                    top: '-10px',
                    left: 'var(--arrow-position-left, 50%)',
                    transform: 'translateX(var(--arrow-position-translate, -50%))',
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
