export default {
    methods: {
        async logout() {
            this.$nuxt.$loading.start();

            await this.$api.auth().logout();
            await this.$router.push({name: 'login'});

            this.$nuxt.$loading.finish();
        }
    }
}
