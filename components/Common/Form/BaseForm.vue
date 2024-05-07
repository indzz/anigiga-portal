<template>
    <validation-observer v-slot="{ invalid, failed }" ref="observer" slim>
        <v-form @submit.prevent="submit">
            <page-header :title="title" :show-back="showBack" :back-link="backLink" v-if="!hideHeader">
                <template v-slot:title.prepend><slot name="title.prepend" /></template>

                <template v-slot:actions>
                    <slot name="actions">
                        <v-btn color="accent" depressed type="submit" :loading="state.submitting" :disabled="failed && invalid" >
                            <v-icon>mdi-check</v-icon>
                            {{$t('submit')}}
                        </v-btn>
                    </slot>
                </template>
                <template v-slot:extension><slot name="extension" /></template>
            </page-header>

            <v-card class="mx-auto" v-if="state.loading">
                <v-skeleton-loader type="list-item-two-line@3, actions" />
            </v-card>
            <slot :failed="failed" :invalid="invalid" v-if="!state.loading || showBodyWhenLoading" />
        </v-form>
    </validation-observer>
</template>

<script>
import PageHeader from "../PageHeader"

export default {
        name: "BaseForm",
        components: {PageHeader},
        inject: ['state'],
        props: {
            title: String,
            hideHeader: {
                type: Boolean,
                default: false,
            },
            showBack: {
                type: Boolean,
                default: true,
            },
            showBodyWhenLoading: {
                type: Boolean,
                default: false,
            },
            backLink: [String, Object, Function],
            backTitle: String,
        },
        methods: {
            submit() {
                this.$emit('submit');
            },
            validationObserver() {
                return this.$refs.observer;
            },
            async validate() {
                return await this.$refs.observer.validate();
            },
        }
    }
</script>
