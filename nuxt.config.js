export default {
    components: true,
    head: {
        titleTemplate: 'Mastering Nuxt: %s',
        htmlAttrs: {
            lang: 'en',
        },
        bodyAttrs: {
            class: ['my-style'],
        },
        meta: [{
            charset: 'utf-8',
        }],
    },
    router: {
        prefetchLinks: false,
    },
    buildModules: [
        '@nuxtjs/dotenv',
    ],
    plugins: [
        '~/plugins/dataApi',
        '~/plugins/map.client',
    ],
    buildModules: [
        '@nuxtjs/tailwindcss',
    ],
    modules: [],
    css: [
        '~/assets/sass/app.scss',
    ],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        },
    },
    publicRuntimeConfig: {
        algoliaAppId: process.env.NB_ALGOLIA_APP_ID,
        algoliaAPIKey: process.env.NB_ALGOLIA_API_KEY,
        googleMapsAPIKey: process.env.NB_GOOGLE_MAPS_API_KEY,
    },
    privateRuntimeConfig: {
        // N/A
    }
};
