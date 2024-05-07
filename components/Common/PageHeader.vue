<template>
    <div class="page-header">
        <slot name="prepend" />

        <div class="page-header__content">
            <slot name="title">
                <div class="page-header__title">
                    <slot name="title.prepend">
                        <v-btn v-if="showBack" @click="goBack" exact icon large color="grey darken-2"
                               :aria-label="$t('back')" class="mr-2">
                            <v-icon large>mdi-arrow-left</v-icon>
                        </v-btn>
                    </slot>

                    <h2 class="page-title">{{title}}</h2>
                </div>
            </slot>

            <v-spacer />

            <slot name="actions" />
        </div>

        <slot name="append" />
    </div>
</template>

<script>
    export default {
        name: "PageHeader",
        props: {
            title: String,
            showBack: Boolean,
            backLink: [String, Object, Function],
        },
        computed: {
            hasExtensionSlot() {
                return this.$slots.extension !== undefined;
            }
        },
        methods: {
            goBack() {
                if (typeof this.backLink === 'string' || typeof this.backLink === 'object')
                    this.$router.push(this.backLink);
                else if (typeof this.backLink === 'function')
                    this.backLink();
                else
                    this.$router.back();
            }
        }
    }
</script>

<style lang="scss">
.page-header__content {
    display: flex;
    padding: 16px 24px 8px 24px;
}
.page-header__title {
    display: flex;
    align-items: center;
}
.page-title {
    font-weight: bold;
    font-size: 2rem;
    color: #555555;
}
</style>
