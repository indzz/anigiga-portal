// Localization
// Reference: https://docs.indzz.dev/backend/i18n.html
export default {
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        'en': require('../locales/en.json'),
        'zh-hk': require('../locales/zh-hk.json'),
        //'zh-cn': require('../locales/zh-cn.json'),
    },
    site_locales: ['en', 'zh-hk', 'zh-cn']
};
