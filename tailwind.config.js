/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	darkMode: "class",
	safelist: ["dark:bg-primary-950", "dark:text-gray-100"],
	theme: {
		extend: {
			fontFamily: {
				display: "Montserrat, Arial, sans-serif",
				sans: "Open Sans, Arial, sans-serif",
			},
			colors: {
				primary: {
					50: "#e9e5ff",
					100: "#d4ccff",
					200: "#a899ff",
					300: "#7d66ff",
					400: "#5233ff",
					500: "#2c07ff",
					600: "#1f00cc",
					700: "#170099",
					800: "#0f0066",
					900: "#080033",
					950: "#04001a",
				},
			},
			backgroundImage: {
				"header-home": "url('/images/backgrounds/header_home.jpg')",
				"grid-square": "url('/images/backgrounds/grid_square.svg')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				footer: "url('/images/backgrounds/footer.jpg')",
			},
			blur: {
				xs: "2px",
			},
			transitionTimingFunction: {
				smooth: "cubic-bezier(.175, .885, .32, 1.275)",
			},
			boxShadow: {
				top2xl: "0 -20px 67px -45px var(--tw-shadow-color)",
			},
		},
	},
	plugins: [
		({ addUtilities }) => {
			const newUtilities = {
				".arrow::before": {
					content: "''",
					display: "block",
					width: "0",
					height: "0",
					borderLeft: "10px solid transparent",
					borderRight: "10px solid transparent",
					borderBottom: "10px solid var(--arrow-color)",
					position: "absolute",
					top: "-10px",
					left: "var(--arrow-position-left, 50%)",
					transform: "translateX(var(--arrow-position-translate, -50%))",
				},
			};
			addUtilities(newUtilities);
		},
	],
};
