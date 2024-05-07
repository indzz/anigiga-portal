<template>
    <base-form v-slot="{ invalid }" ref="baseForm" @submit="submit" hide-header>
        <v-card class="mb-3" :loading="loading">
            <v-card-title>
                {{$t($route.params.id ? 'role_edit' : 'role_create')}}
            </v-card-title>
            <v-card-text>
                <ValidationProvider rules="required" v-slot="{ errors }" :name="$t('name')">
                    <v-text-field :label="$t('name')" v-model="item.name" outlined dense
                                  :error-messages="errors" required></v-text-field>
                </ValidationProvider>
            </v-card-text>
            <v-divider />
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" lg="4" xl="3" class="mb-5" v-for="(v, k) in options.permissions" :key="'permission_group_' + k">
                        <h3 class="subtitle-2 mb-0">{{$t('permission_group_label.' + k)}}</h3>
                        <v-checkbox v-for="p in v" v-model="item.permissions"
                                    :key="'permission_' + p" class="mt-1"
                                    :label="$t('permission_label.' + p)" :value="p" hide-details />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider />
            <v-card-actions class="grey lighten-5">
                <v-spacer />
                <v-btn color="accent" depressed type="submit" :disabled="invalid" :loading="submitting">
                    <v-icon>mdi-check</v-icon>
                    {{$t('submit')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </base-form>
</template>

<script>
import crud from "@/components/crud";
import BaseForm from "../../components/Common/Form/BaseForm"

export default {
        name: "role_form",
        components: {BaseForm},
        mixins: [crud],
        mounted() {
            this.fetchOptions();

            if (this.$route.params.id) {
                this.fetchItem(this.$route.params.id);
            }
        },
        data() {
            return {
                item: {
                    id: null,
                    name: '',
                    permissions: [],
                },
                options: {
                    permissions: {}
                },
            }
        },
        methods: {
            apiResource() {
                return this.$api.role();
            },
            submitSuccess(data) {
                if (this.item.id === this.$auth.user.role_id) {
                    this.$auth.fetchUser();
                }

                this.alert('success',  data.message);
                this.$router.push({name: 'role'});
                this.$emit('submitted');
            }
        }
    }
</script>
