<template>
    <v-container fluid>
        <v-subheader class="title">{{$t('my_account')}}</v-subheader>
        <v-row>
            <v-col cols="12" sm="6" md="7">
                <v-subheader>{{$t('my_info')}}</v-subheader>
                <v-card>
                    <v-list two-line class="py-0">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>{{$t('full_name')}}</v-list-item-title>
                                <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider />
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>{{$t('role')}}</v-list-item-title>
                                <v-list-item-subtitle>{{user.role != null ? user.role.name : "N/A"}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>

                <v-subheader>{{$t('permissions')}}</v-subheader>
                <v-card>
                    <v-card-text v-if="user.role !== undefined">
                        <v-row>
                            <v-col cols="12" sm="6" lg="4" xl="3" class="mb-5" v-for="(v, k) in options.permissions" :key="'permission_group_' + k" v-if="user.role.permissions.find(permission => v.includes(permission))">
                                <h3 class="text-caption font-weight-bold mb-2">{{$t('permission_group_label.' + k)}}</h3>
                                <v-chip v-for="p in v"
                                        class="mb-2 mr-1"
                                        small outlined
                                        color="primary"
                                        :key="'permission_' + p"
                                        v-if="user.role.permissions.includes(p)">
                                    {{$t('permission_label.' + p)}}
                                </v-chip>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="5">
                <v-subheader>{{$t('change_password')}}</v-subheader>
                <change-password />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ChangePassword from "../components/Account/ChangePassword";

export default {
        name: "profile",
        components: {ChangePassword},
        mounted() {
            this.fetchOptions();
            this.fetchData();
        },
        data() {
            return {
                user: this.$auth.user,
                options: {}
            }
        },
        methods: {
            async fetchOptions() {
                try {
                    this.options = await this.$api.role().getOptions();
                } catch (e) {
                    this.alert('error', this.apiErrorsToMessage(e));
                }
            },
            fetchData: async function() {
                try {
                    this.user = await this.$api.myAccount().getProfile();
                } catch (e) {
                    this.alert('error', e.message);
                }
            }
        }
    }
</script>
