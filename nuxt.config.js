require('dotenv').config()

import vuetifyThemeConfig from './config/themes'
import authConfig from './config/auth'
import apiConfig from './config/api'
import dynamicFieldsConfig from './config/dynamic_fields'

const APP_NAME = process.env.VUE_APP_NAME || process.env.APP_NAME || 'INDZZ CMS';

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    env: {
        APP_NAME: APP_NAME,
    },
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + APP_NAME,
        title: APP_NAME || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '@mdi/font/css/materialdesignicons.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/i18n.js',
        '~/plugins/veevalidate.js',
        '~/plugins/alert.js',
        '~/plugins/upload.js',
    ],

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',

        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',

        '~/modules/routes.js',
        '@indzz/nuxt-api-manager',
        ['~/node_modules/vuetify-configurable-field/nuxt', dynamicFieldsConfig],
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],

    axios: apiConfig,

    auth: authConfig,

    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: vuetifyThemeConfig,
        defaultAssets: false,
        icons: {
            iconfont: 'mdi'
        }
    },
    /*
    ** Build configuration
    */
    build: {
        publicPath: '/_nuxt/',
        extractCSS: process.env.NODE_ENV === 'production',

        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    },

    router: {
        // base: "/backend/",
        middleware: ['auth'],
        routeNameSplitter: '_',
        extendRoutes(routes, resolve) {
            return routes;
        }
    },

    // generate: {
    //     dir: "../../public/backend"
    // },


    server: {
        host: '0.0.0.0', // default: localhost,
        port: 3000
    },   // other configs

}
