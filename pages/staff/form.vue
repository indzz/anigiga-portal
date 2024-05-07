<template>
    <base-form v-slot="{ invalid }" ref="baseForm" @submit="submit" :title="$t(item.id != null ? 'staff_edit' : 'staff_create')">
        <v-container>
            <v-card max-width="640" class="mx-auto mt-3">
                <v-card-text>
                    <base-form-field :config="fields.username" v-model="item.username" />
                    <base-form-field :config="fields.new_password" v-model="item.new_password" />
                    <base-form-field :config="fields.status" v-model="item.status" />
                    <base-form-field :config="fields.name" v-model="item.name" />
                    <base-form-field :config="fields.email" v-model="item.email" />
                    <base-form-field :config="fields.role_id" v-model="item.role_id" />
                </v-card-text>
                <v-card-actions class="grey lighten-5">
                    <v-spacer />
                    <!-- Submit Button -->
                    <v-btn color="accent" depressed type="submit" :loading="submitting" :disabled="invalid">
                        <v-icon>mdi-check</v-icon> {{$t('submit')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </base-form>
</template>

<script>
import BaseFormField from "vuetify-configurable-field/src/BaseFormField";
import BaseForm from "@/components/Common/Form/BaseForm"
import crud from "@/components/crud";

export default {
        name: "staff_form",
        components: {
            BaseFormField,
            BaseForm,
        },
        mixins: [crud],
        created() {
            this.fetchOptions();

            if (this.$route.params.id) {
                this.fetchItem(this.$route.params.id);
            }
        },
        data() {
            return {
                item: {
                    id: null,
                    username: null,
                    new_password: null,
                    status: 1,
                    name: null,
                    email: null,
                    role_id: null,
                },
                options: {
                    roles: []
                },
            }
        },
        computed: {
            fields() {
                return {
                    "username": {
                        "key": "username",
                        "label": this.$t('username'),
                        "type": "text",
                        "dense": true,
                        "outlined": true,
                        "rules": "required|min:3|max:32"
                    },
                    "new_password": {
                        "key": "new_password",
                        "label": this.$t('new_password'),
                        "type": "password",
                        "dense": true,
                        "outlined": true,
                        "rules": (this.item.id == null ? 'required|' : '') + 'min:6'
                    },
                    "status": {
                        "key": "status",
                        "label": this.$t('status'),
                        "type": "select",
                        "dense": true,
                        "outlined": true,
                        "items": [
                            {id: 1, label: this.$t('status_enabled')},
                            {id: 0, label: this.$t('status_disabled')},
                        ],
                        "_control": "select",
                        "rules": "required",
                        "itemText": "label",
                        "itemValue": "id"
                    },
                    "name": {
                        "key": "name",
                        "label": this.$t('full_name'),
                        "type": "text",
                        "dense": true,
                        "outlined": true,
                        "rules": "required"
                    },
                    "email": {
                        "key": "email",
                        "label": this.$t('email'),
                        "type": "email",
                        "dense": true,
                        "outlined": true,
                        "rules": "required|email"
                    },
                    "role_id": {
                        "key": "role_id",
                        "label": this.$t('role'),
                        "type": "select",
                        "dense": true,
                        "outlined": true,
                        "items": this.options.roles,
                        "_control": "select",
                        "itemText": "name",
                        "itemValue": "id",
                        "rules": "required"
                    }
                };
            }
        },
        methods: {
            apiResource() {
                return this.$api.staff();
            },
            submitSuccess(data) {
                if (this.item.id === this.$auth.user.id) {
                    this.$auth.fetchUser()
                }
                this.alert('success', data.message);
                this.$router.push({
                    name: 'staff'
                });
            }
        },
    }
</script>
