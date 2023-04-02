/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
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
			},
			blur: {
				xs: "2px",
			},
		},
	},
	plugins: [],
};
