<template>
    <v-tabs v-model="active" background-color="grey lighten-4">
        <v-tab v-for="(tab, k) in tabs" :key="tab.key">
            {{tab.text}}
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        name: "Toolbar",
        props: {
            value: {
                default: null,
            },
            tabs: {
                type: Array,
                default: [],
            }
        },
        computed: {
            active: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        }
    }
</script>
