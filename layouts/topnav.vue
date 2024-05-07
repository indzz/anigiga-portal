<template>
    <v-app>
        <toolbar :items="menuItems" />
        <info-panel :items="menuItems" />

        <v-content>
            <alert-message v-if="$store.state.messages.length > 0"
                           v-for="(message, k) in $store.state.messages" :key="k"
                           :message="message" />
            <nuxt />
        </v-content>
    </v-app>
</template>

<script>
import Toolbar from "../components/Common/Toolbar";
import InfoPanel from "../components/Common/InfoPanel";
import AlertMessage from "../components/Common/AlertMessage";
import navConfig from '../config/nav';

export default {
        components: { Toolbar, InfoPanel, AlertMessage },
        data() {
            return {
                menuItems: navConfig,
            }
        },
    }
</script>
