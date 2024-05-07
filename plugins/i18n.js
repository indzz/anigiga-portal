import Vue from "vue";
import VueI18n from "vue-i18n";
import config from "../config/i18n";

Vue.use(VueI18n);

export default async (context, inject) => {
    context.app.i18n = new VueI18n(config);

    inject('site_locales', config.site_locales);
}
