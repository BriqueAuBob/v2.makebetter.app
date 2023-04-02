// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: `MakeBetter.app`,
			htmlAttrs: {
				lang: 'fr'
			},
			meta: [
				{ charset: 'utf-8' },

				{ "http-equiv": 'description', name: 'description', content: `Site regroupant une multitude d'outils dans de multiples domaines différents.` },
				{ hid: 'description', name: 'description', content: `Site regroupant une multitude d'outils dans de multiples domaines différents.` },

				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'format-detection', content: 'telephone=no' },

				{ name: 'og:type', content: "product" },
				{ name: 'og:title', content: "MakeBetter.app - Créer ton meilleur projet avec nous !" },
				{ name: 'og:description', content: "Site regroupant une multitude d'outils dans de multiples domaines différents." },
				{ name: 'og:image', content: "https://makebetter.app/thumbnail.png" },

				{ name: 'twitter:title', content: "MakeBetter.app - Créer ton meilleur projet avec nous !" },
				{ name: 'twitter:description', content: "Site regroupant une multitude d'outils dans de multiples domaines différents." },
				{ name: 'twitter:card', content: "summary_large_image" },
				{ name: 'twitter:image', content: "https://makebetter.app/thumbnail.png" },

				{ name: 'theme-color', content: "#004be0" },
				{ name: 'msapplication-TileColor', content: "#004be0" },
				{ name: 'msapplication-TileImage', content: "/ms-icon-144x144.png" },
			],
			link: [
				{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },

				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
				{ rel: 'icon', type: 'image/png', sizes: "64x64", href: '/favicon-64x64.png' },

				{ rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
				{ rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
				{ rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
				{ rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
				{ rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
				{ rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },

				{ rel: 'manifest', href: '/manifest.json' },
			]
		}
	},

	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@nuxtjs/color-mode",
		'@nuxt/content',
	],

	devtools: {
		enabled: true,
	},

	robots: {
		// https://nuxt.com/modules/robots
	},

	content: {
		// https://content.nuxtjs.org/api/configuration
	},

	typescript: {
		typeCheck: true,
	},
});
