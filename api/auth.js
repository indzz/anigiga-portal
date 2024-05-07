import ApiService from "./base";

class AuthApi extends ApiService {
    constructor(api) {
        super(api);
    }

    async login(username, password) {
        await this.$http.get('airlock/csrf-cookie');

        return await this.$api.context.$auth.loginWith('local', {
            data: {
                username: username,
                password: password
            }
        });
    }

    async logout() {
        return this.$api.context.$auth.logout();
    }
}

export default AuthApi;
