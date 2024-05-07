<template>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
        <v-form @submit.prevent="submit">
            <v-card class="mb-3">
                <v-card-text>
                    <input type="text" name="username" autocomplete="username" :value="username" style="display: none;" />

                    <!-- Current Password -->
                    <ValidationProvider rules="required" v-slot="{ errors }" :name="$t('current_password')" vid="current_password">
                        <v-text-field :label="$t('current_password')"
                                      type="password"
                                      :error-messages="errors"
                                      v-model="item.current_password"
                                      autocomplete="current-password"
                                      required></v-text-field>
                    </ValidationProvider>

                    <!-- New Password -->
                    <ValidationProvider rules="required|confirmed:new_password_confirmed" v-slot="{ errors }" :name="$t('new_password')" vid="new_password">
                        <v-text-field :label="$t('new_password')"
                                      type="password"
                                      :error-messages="errors"
                                      v-model="item.new_password"
                                      autocomplete="new-password"
                                      required></v-text-field>
                    </ValidationProvider>

                    <!-- Confirm New Password -->
                    <ValidationProvider rules="required" v-slot="{ errors }" :name="$t('new_password_confirmed')" vid="new_password_confirmed">
                        <v-text-field :label="$t('new_password_confirmed')"
                                          type="password"
                                          :error-messages="errors"
                                          v-model="item.new_password_confirmed"
                                          autocomplete="new-password"
                                          required></v-text-field>
                    </ValidationProvider>
                </v-card-text>
            </v-card>

            <!-- Submit Button -->
            <v-btn block color="secondary" type="submit" :loading="loading" :disabled="invalid">{{$t('submit')}}</v-btn>
        </v-form>
    </ValidationObserver>
</template>

<script>
    export default {
        name: "ChangePassword",
        data() {
            return {
                loading: false,

                // Password value
                item: {
                    current_password: '',
                    new_password: '',
                    new_password_confirmed: '',
                },
            }
        },
        computed: {
            username: function () {
                return this.$auth.user.username;
            }
        },
        methods: {
            submit: async function() {
                const success = await this.$refs.observer.validate();

                if (success) {
                    this.apiErrors = [];
                    this.loading = true;

                    try {
                        const message = await this.$api.myAccount().changePassword(this.item.current_password, this.item.new_password);

                        this.alert('success', message);

                        // Clear existing fields
                        this.item.current_password = '';
                        this.item.new_password = '';
                        this.item.new_password_confirmed = '';

                        this.$refs.observer.reset();
                    } catch (e) {
                        this.handleApiFormErrors(this.$refs.observer, e);
                    }
                    this.loading = false;
                }
            }
        }
    }
</script>
