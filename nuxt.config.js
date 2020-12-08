export default {
    // I don't like auto importing and choose not to use it
    components: false,
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
};
