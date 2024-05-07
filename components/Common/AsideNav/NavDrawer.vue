<template>
    <v-navigation-drawer app v-model="opened" floating class="elevation-3"
                         :mini-variant="miniVariant"
                         :width="$vuetify.breakpoint.smAndUp ? 320 : 300">
        <!-- Header -->
        <template v-slot:prepend>
            <v-sheet class="nav-drawer-header primary align-center justify-center pa-5"
                     height="180" tile dark v-show="!miniVariant">
                <img src="~/assets/mylogo.svg" :alt="appName" class="nav-header-logo"
                     v-if="$vuetify.theme.options.useLogo" />

                <h1 class="display-2" v-else>
                    {{appName}}
                </h1>
            </v-sheet>
        </template>

        <!-- Menu -->
        <drawer-menu :items="items" />
    </v-navigation-drawer>
</template>

<script>
import DrawerMenu from "@/components/Common/DrawerMenu"

export default {
        name: "NavDrawer",
        components: {DrawerMenu},
        computed: {
            appName() {
                return process.env.APP_NAME
            },
            opened: {
                get() {
                    return this.$vuetify.breakpoint.mdAndUp || this.$store.state.infoPanel;
                },
                set(v) {
                    this.$store.commit('changeInfoPanel', v);
                }
            },
            miniVariant() {
                return this.$vuetify.breakpoint.mdAndUp && !this.$store.state.infoPanel
            }
        },
        props: {
            items: Array,
        },
    }
</script>

<style>
.nav-drawer-header {
    display: flex;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.4) 100%) no-repeat;
}
.nav-header-logo {
    max-width: 100%;
    width: 100%;
}
</style>
