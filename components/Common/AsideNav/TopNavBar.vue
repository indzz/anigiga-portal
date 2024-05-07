<template>
    <v-app-bar app elevation="2" color="sheet" class="top-nav-bar">
        <v-btn @click.stop="$store.commit('toggleInfoPanel')" icon>
            <v-icon>{{$store.state.infoPanel ? 'mdi-menu-open' : 'mdi-menu'}}</v-icon>
        </v-btn>
        <top-search />

        <v-spacer />

        <v-toolbar-items v-if="$auth.loggedIn">
            <v-divider vertical v-if="$vuetify.breakpoint.mdAndUp" />

            <v-btn text :to="{name: 'profile'}">
                <v-avatar color="primary" size="36">
                    <span class="white--text headline">{{user.name.slice(0, 1)}}</span>
                </v-avatar>
                <span class="ml-1 d-none d-md-inline-block">{{user.name}}</span>
            </v-btn>

            <v-divider vertical v-if="$vuetify.breakpoint.mdAndUp" />

            <v-btn icon @click="logout">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import logout from "../../logout"

import TopSearch from "./TopSearch"

export default {
        name: "TopNavBar",
        mixins: [logout],
        components: {TopSearch},
        computed: {
            user() {
                return this.$auth.user;
            }
        }
    }
</script>

<style>
.top-nav-bar .v-toolbar__content {
    padding-right: 0;
}
</style>
