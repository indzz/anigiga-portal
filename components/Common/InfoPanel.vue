<template>
    <v-navigation-drawer v-model="opened" app :clipped="$vuetify.breakpoint.lgAndUp" floating
                         :width="$vuetify.breakpoint.smAndUp ? 320 : 300" height="100%" class="elevation-5">
        <!-- Quick Search -->
        <quick-search />

        <!-- Menu (only small screen only) -->
        <drawer-menu :items="items" v-if="$vuetify.breakpoint.mdAndDown" />

        <!-- Calendar -->
        <info-calendar />

        <!-- Shortcut -->
        <info-shortcut />
    </v-navigation-drawer>
</template>

<script>
import InfoCalendar from "./InfoCalendar"
import InfoShortcut from "./InfoShortcut"
import QuickSearch from "./QuickSearch"
import DrawerMenu from "./DrawerMenu"

export default {
        name: "InfoPanel",
        components: {InfoCalendar, InfoShortcut, QuickSearch, DrawerMenu},
        props: {
            items: Array,
        },
        computed: {
            opened: {
                get() {
                    return this.$store.state.infoPanel;
                },
                set(newValue) {
                    this.$store.commit('changeInfoPanel', newValue);
                }
            }
        },
        methods: {
            hide() {
                this.$store.commit('changeInfoPanel', false);
            }
        }
    }
</script>
