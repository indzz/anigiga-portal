<template>
    <base-form @submit="submit" :title="$t('system_config')"
               v-slot="{ invalid }" ref="baseForm">
        <v-container>
            <v-card max-width="800" class="mx-auto" :loading="loading || submitting">
                <toolbar v-model="tab" :tabs="groups" />
                <v-divider />
                <config-groups :active-tab="tab" :tabs="groups" v-model="items">
                    <!-- You may override a group or a field with slot -->
                </config-groups>
                <v-divider />
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="accent" type="submit" :loading="submitting" :disabled="invalid">
                        <v-icon>mdi-check</v-icon>
                        {{$t('submit')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </base-form>
</template>

<script>
import crud from "../components/crud";
import Toolbar from "../components/Settings/Toolbar";
import ConfigGroups from "../components/Settings/ConfigGroups";
import BaseForm from "../components/Common/Form/BaseForm";

export default {
        name: "settings",
        mixins: [crud],
        components: {Toolbar, ConfigGroups, BaseForm},
        mounted() {
            this.fetchItems();
        },
        methods: {
            apiResource() {
                return this.$api.settings();
            },
            async fetchItems() {
                this.loadingCount++;

                try {
                    const data = (await this.apiResource().all()).data;
                    this.items = Array.isArray(data) ? {} : data;
                } catch (e) {
                    this.alert('error', e.message);
                }

                this.loadingCount--;
            },
            async submit() {
                const success = await this.$refs.baseForm.validate();

                if (success) {
                    this.submittingCount++;

                    try {
                        const data = await this.apiResource().save(this.items);

                        this.submitSuccess(data);
                    } catch (e) {
                        this.handleApiFormErrors(this.$refs.baseForm.validationObserver(), e);
                    }
                    this.submittingCount--;
                }
            },
            submitSuccess: function(data) {
                this.alert('success',  data.message);
            },
        },
        data() {
            return {
                tab: null,
                items: {
                    company_name: null,
                    contact_email: null,
                },

                groups: [
                    {
                        key: 'general',
                        text: this.$t('general'),
                        fields: [
                            {
                                key: 'company_name',
                                label: this.$t('company_name'),
                                rules: 'required',
                            },
                            {
                                key: 'contact_email',
                                label: this.$t('contact_email'),
                                type: 'email',
                            },
                        ]
                    },
                ]
            }
        }
    }
</script>
