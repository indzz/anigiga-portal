import Vue from 'vue';
import {extend, localize, ValidationObserver, ValidationProvider} from 'vee-validate';
import {confirmed, email, max, min, required} from 'vee-validate/dist/rules';
import en from "vee-validate/dist/locale/en.json"

// Add the required rule
extend('required', required);
extend('email', email);
extend('confirmed', confirmed);
extend('min', min);
extend('max', max);

// Message
localize('en', en);
// localize('zh-hk', zh_TW);

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.mixin({
    methods: {
        handleApiFormErrors($observer, e) {
            if ($observer && typeof e === 'object' && typeof e.response === 'object' && typeof e.response.data.errors === 'object') {
                $observer.setErrors(e.response.data.errors);
                return;
            }

            this.alert('error', this.apiErrorsToMessage(e));
        },
        apiErrorsToMessage(e) {
            if (typeof e === 'object') {
                if (typeof e.response === 'object' && typeof e.response.data.message === 'string') {
                    return e.response.data.message;
                } else if (typeof e.message === 'string') {
                    return e.message;
                }
            }
            return e;
        }
    }
});

