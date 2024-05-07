require('dotenv').config()
/*
* Axios module configuration
* See https://axios.nuxtjs.org/options
*
* To setup environment variable, refer to:
* https://docs.indzz.dev/backend/install_client.html#%E8%A8%AD%E5%AE%9A
*/
export default {
    baseURL: (typeof window !== 'undefined' ? window.apiBaseURL : null) || process.env.VUE_APP_API_BASE_URL || process.env.MIX_API_BASE_URL,
    progress: false,
    credentials: true,
}
