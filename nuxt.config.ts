// https://nuxt.com/docs/api/configuration/nuxt-config
import { appVersion, prodUrl, devUrl } from './main.config';

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseUrl: process.env.API_BASE_URL,
            gitHash: process.env.GIT_SHA,
            authUrl: process.env.AUTH_URL || 'https://auth.umaestro.fr',
        },
    },

    app: {
        head: {
            title: `MakeBetter.app`,
            bodyAttrs: {
                class: 'bg-gray-50 dark:bg-primary-950 dark:text-gray-100 ease-out duration-300',
            },
            meta: [
                { charset: `utf-8` },

                {
                    'http-equiv': `description`,
                    name: `description`,
                    content: `Site regroupant une multitude d'outils dans de multiples domaines différents.`,
                },
                {
                    hid: `description`,
                    name: `description`,
                    content: `Site regroupant une multitude d'outils dans de multiples domaines différents.`,
                },

                {
                    name: `viewport`,
                    content: `width=device-width, initial-scale=1`,
                },
                { name: `format-detection`, content: `telephone=no` },

                { name: `og:type`, content: `product` },
                {
                    name: `og:title`,
                    content: `MakeBetter.app - Créer ton meilleur projet avec nous !`,
                },
                {
                    name: `og:description`,
                    content: `Site regroupant une multitude d'outils dans de multiples domaines différents.`,
                },
                {
                    name: `og:image`,
                    content: `/${appVersion}/static/thumbnail.png`,
                },

                {
                    name: `twitter:title`,
                    content: `MakeBetter.app - Créer ton meilleur projet avec nous !`,
                },
                {
                    name: `twitter:description`,
                    content: `Site regroupant une multitude d'outils dans de multiples domaines différents.`,
                },
                { name: `twitter:card`, content: `summary_large_image` },
                {
                    name: `twitter:image`,
                    content: `/${appVersion}/static/thumbnail.png`,
                },

                { name: `theme-color`, content: `#004be0` },
                { name: `msapplication-TileColor`, content: `#004be0` },
                {
                    name: `msapplication-TileImage`,
                    content: `/${appVersion}/favicons/ms-icon-144x144.png`,
                },
            ],
            link: [
                {
                    rel: `icon`,
                    type: `image/png`,
                    sizes: `192x192`,
                    href: `/${appVersion}/favicons/android-icon-192x192.png`,
                },

                {
                    rel: `icon`,
                    type: `image/png`,
                    sizes: `16x16`,
                    href: `/${appVersion}/favicons/favicon-16x16.png`,
                },
                {
                    rel: `icon`,
                    type: `image/png`,
                    sizes: `32x32`,
                    href: `/${appVersion}/favicons/favicon-32x32.png`,
                },
                {
                    rel: `icon`,
                    type: `image/png`,
                    sizes: `64x64`,
                    href: `/${appVersion}/favicons/favicon-64x64.png`,
                },

                {
                    rel: `apple-touch-icon`,
                    sizes: `57x57`,
                    href: `/${appVersion}/favicons/apple-icon-57x57.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `60x60`,
                    href: `/${appVersion}/favicons/apple-icon-60x60.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `72x72`,
                    href: `/${appVersion}/favicons/apple-icon-72x72.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `76x76`,
                    href: `/${appVersion}/favicons/apple-icon-76x76.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `114x114`,
                    href: `/${appVersion}/favicons/apple-icon-114x114.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `120x120`,
                    href: `/${appVersion}/favicons/apple-icon-120x120.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `144x144`,
                    href: `/${appVersion}/favicons/apple-icon-144x144.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `152x152`,
                    href: `/${appVersion}/favicons/apple-icon-152x152.png`,
                },
                {
                    rel: `apple-touch-icon`,
                    sizes: `180x180`,
                    href: `/${appVersion}/favicons/apple-icon-180x180.png`,
                },

                {
                    rel: `manifest`,
                    href: `/${appVersion}/favicons/manifest.json`,
                },
            ],
        },
    },

    modules: [
        '@nuxtjs/tailwindcss', // https://nuxt.com/modules/tailwindcss
        '@nuxtjs/i18n', // https://nuxt.com/modules/i18n
        '@pinia/nuxt', // https://nuxt.com/modules/pinia
        '@nuxtjs/color-mode', // https://nuxt.com/modules/color-mode
        '@nuxt/content', // https://nuxt.com/modules/content
        '@nuxt/image-edge', // https://nuxt.com/modules/image
        '@nuxtjs/device', // https://nuxt.com/modules/device
        '@nuxtjs/robots', // https://nuxt.com/modules/robots
        'nuxt-icons', // https://nuxt.com/modules/icons
        'nuxt-headlessui', // https://nuxt.com/modules/headlessui,
        '@tailvue/nuxt', // https://nuxt.com/modules/tailvue
    ],

    plugins: [
        { src: '~/plugins/aos', mode: 'client' },
        { src: '~/plugins/loading.ts', mode: 'client' },
    ],

    devtools: {
        enabled: false,
    },

    content: {
        // https://content.nuxtjs.org/api/configuration
    },

    image: {
        // https://v1.image.nuxtjs.org
        presets: {
            // https://v1.image.nuxtjs.org/configuration#presets
            avatar: {
                modifiers: {
                    format: 'webp',
                    width: 50,
                    height: 50,
                },
            },
        },
    },

    device: {
        refreshOnResize: true,
    },

    typescript: {
        typeCheck: true,
    },

    tailwindcss: {
        viewer: false,
        exposeConfig: true,
    },

    colorMode: {
        classSuffix: '',
    },

    i18n: {
        baseUrl: process.env.BASE_URL,
        langDir: 'locales/',
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                file: 'en/index.js',
            },
            {
                code: 'fr',
                iso: 'fr-FR',
                name: 'Français',
                files: [
                    'fr/common.json',
                    'fr/navigation.json',
                    'fr/homepage.json',
                    'fr/tools/common.json',
                    'fr/tools/discord/embed-maker.json',
                ],
            },
        ],
        defaultLocale: 'fr',
    },

    headlessui: {
        prefix: 'Headless',
    },
});
