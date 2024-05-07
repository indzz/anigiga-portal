<template>
    <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="(tab, k) in tabs" :key="tab.key">
            <slot :name="'tab-' + tab.key" v-bind:tab="tab">
                <v-card-text>
                    <template v-for="field in tab.fields">
                        <slot :name="'field-' + field.key" v-bind:field="field" v-bind:value="value">
                            <base-form-field :config="field" v-model="value[field.key]" />
                        </slot>
                    </template>
                </v-card-text>
            </slot>
        </v-tab-item>
    </v-tabs-items>
</template>

<script>
import BaseFormField from "vuetify-configurable-field/src/BaseFormField";

export default {
        name: "ConfigGroups",
        components: {BaseFormField},
        props: {
            value: {
                type: Object,
                default: null,
            },
            activeTab: {
                default: null,
            },
            tabs: {
                type: Array,
                default: [],
            }
        }
    }
</script>
