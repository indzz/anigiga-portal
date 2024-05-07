export const state = () => ({
    language: 'en',
    messages: [],
    infoPanel: false,
})

export const mutations = {
    changeLanguage(state, payload) {
        // store option to current state
        state.language = payload.newLang;

        // update i18n config
        payload.i18n.locale = payload.newLang;

        // update to permanent storage
        window.localStorage.setItem('language', payload.newLang);

        // Update axios language header
        Vue.axios.defaults.headers.common['Accept-Language'] = state.language;
    },
    addMessage(state, payload) {
        payload.active = true;
        state.messages.push(payload);
    },
    toggleInfoPanel(state) {
        state.infoPanel = !state.infoPanel;
    },
    changeInfoPanel(state, b) {
        state.infoPanel = b;
    },
};
