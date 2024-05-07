import Vue from "vue";

export default ({store}, inject) => {
    inject('alert', function (type, message, timeout = 3000) {
        store.commit('addMessage', {
            type: type,
            message: message,
            timeout: timeout,
        });
    })

    Vue.mixin({
        methods: {
            alert(type, message, timeout) {
                this.$alert(type, message, timeout)
            }
        }
    });
}