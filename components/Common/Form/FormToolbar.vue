<template>
    <div>
        <v-toolbar>
            <slot name="title.prepend">
                <v-btn v-if="backLink !== false" @click="goBack" icon exact><v-icon>mdi-arrow-left</v-icon></v-btn>
            </slot>
            <slot name="title">
                <v-toolbar-title>
                    {{title}}
                </v-toolbar-title>
            </slot>
            <slot name="title.append"></slot>
            <v-spacer />
            <slot name="actions">
                <v-btn type="submit" color="accent" :loading="submitting" :disabled="invalid">
                    <v-icon>mdi-check</v-icon> {{$t('submit')}}
                </v-btn>
            </slot>
            <template v-slot:extension v-if="hasExtensionSlot"><slot name="extension"></slot></template>
        </v-toolbar>
        <v-progress-linear indeterminate v-if="loading" />
    </div>
</template>

<script>
    export default {
        name: "FormToolbar",
        props: {
            title: String,
            loading: Boolean,
            submitting: Boolean,
            invalid: Boolean,
            backLink: {},
        },
        methods: {
            goBack () {
                if (window.history.length > 1)
                    this.$router.go(-1)
                else if (this.backLink != null)
                    this.$router.push(this.backLink)
            }
        },
        computed: {
            hasExtensionSlot() {
                return this.$slots.extension !== undefined;
            }
        }
    }
</script>