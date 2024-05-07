<template>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
        <v-form @submit.prevent="submit" class="py-2">
            <h2 class="title black--text px-3 mb-3">{{$t('login')}}</h2>

            <div class="px-3">
                <div v-if="apiErrors.length > 0">
                    <v-alert v-for="(message, k) in apiErrors" :key="k" type="error" dense>
                        {{message}}
                    </v-alert>
                </div>

                <!-- Username -->
                <ValidationProvider rules="required" v-slot="{ errors }" :name="$t('username')">
                    <v-text-field prepend-inner-icon="mdi-account" :label="$t('username')"
                                  v-model="item.username" autocomplete="username"
                                  :error-messages="errors" :hide-details="errors.length <= 0"
                                  :class="errors.length <= 0 ? 'mb-5' : 'mb-3'"
                                  solo flat background-color="#F6F6F6"
                                  autofocus required></v-text-field>
                </ValidationProvider>

                <!-- Password -->
                <ValidationProvider rules="required" v-slot="{ errors }" :name="$t('password')">
                    <v-text-field prepend-inner-icon="mdi-key" :label="$t('password')" type="password"
                                  v-model="item.password" autocomplete="current-password"
                                  :error-messages="errors" :hide-details="errors.length <= 0"
                                  :class="errors.length <= 0 ? 'mb-5' : ''"
                                  solo flat background-color="#F6F6F6"
                                  required></v-text-field>
                </ValidationProvider>
            </div>

            <!-- Submit Button -->
            <v-btn block color="accent" type="submit" rounded elevation="4"
                   :loading="loading" :disabled="invalid">{{$t('login')}}</v-btn>
        </v-form>
    </ValidationObserver>
</template>

<script>
    export default {
        name: "login",
        layout: "guest",
        auth: 'guest',
        head() {
            return {
                title: this.$t('login')
            }
        },
        data() {
            return {
                item: {
                    username: '',
                    password: '',
                    remember: true,
                },
                apiErrors: [],
                loading: false,
            };
        },
        methods: {
            async submit() {
                const valid = await this.$refs.observer.validate();
                if (valid) {
                    this.apiErrors = [];
                    this.loading = true;
                    try {
                        await this.$api.auth().login(this.item.username, this.item.password);
                        this.$router.replace({name: 'home'});
                    } catch (e) {
                        if (typeof e === 'object') {
                            if (typeof e.response === 'object' && typeof e.response.data.message === 'string') {
                                this.apiErrors.push(e.response.data.message);
                            } else {
                                this.apiErrors.push(e.message);
                            }
                        } else if (typeof e === 'string') {
                            this.apiErrors.push(e);
                        }

                    }
                    this.loading = false;
                }
            },
        },
    }
</script>
