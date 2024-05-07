<template>
    <v-app>
        <top-nav-bar />
        <nav-drawer :items="menuItems" />

        <v-content>
            <alert-message v-if="$store.state.messages.length > 0"
                           v-for="(message, k) in $store.state.messages" :key="k"
                           :message="message" />
            <nuxt />
        </v-content>
    </v-app>
</template>

<script>
import Toolbar from "../components/Common/Toolbar"
import InfoPanel from "../components/Common/InfoPanel"
import AlertMessage from "../components/Common/AlertMessage"
import navConfig from "../config/nav"
import NavDrawer from "../components/Common/AsideNav/NavDrawer"
import TopNavBar from "../components/Common/AsideNav/TopNavBar"

export default {
        name: "Side",
        components: {TopNavBar, NavDrawer, Toolbar, InfoPanel, AlertMessage },
        data() {
            return {
                menuItems: navConfig,
            }
        },
        created() {
            if (this.$vuetify.breakpoint.mdAndUp)
                this.$store.commit('changeInfoPanel', true);
        }
    }
</script>

<style scoped>

</style>
