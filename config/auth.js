// Vue Auth Plugin
// To setup environment variable, refer to:
// https://docs.indzz.dev/backend/install_client.html#%E8%A8%AD%E5%AE%9A
// Also see plugin option reference: https://auth.nuxtjs.org/api/options.html
export default {
    strategies: {
        local: {
            endpoints: {
                login: { url: 'auth/login', method: 'post', propertyName: 'access_token' },
                logout: { url: 'auth/logout', method: 'post' },
                user: { url: 'me', method: 'get', propertyName: 'data' }
            },
            tokenRequired: false,
        }
    },

    localStorage: {
        prefix: process.env.VUE_APP_AUTH_STORE_PREFIX || process.env.AUTH_STORE_PREFIX || 'auth.'
    },

    plugins: ['~/plugins/auth.js']
};
