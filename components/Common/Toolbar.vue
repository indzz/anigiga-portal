<template>
    <v-app-bar app dark color="primary" :clipped-left="$vuetify.breakpoint.lgAndUp">
        <v-btn @click.stop="$store.commit('toggleInfoPanel')" icon>
            <v-icon>{{$store.state.infoPanel ? 'mdi-menu-open' : 'mdi-menu'}}</v-icon>
        </v-btn>

        <v-toolbar-title class="mr-3">{{appName}}</v-toolbar-title>

        <!-- Left -->
        <v-toolbar-items v-if="$vuetify.breakpoint.lgAndUp">
            <v-btn :to="{name: 'home'}" icon exact>
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <template v-for="item in items">
                <template v-if="item.permission === undefined || $auth.check(item.permission)">
                    <v-menu v-if="typeof item.children !== 'undefined'" offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn text v-on="on">
                                {{$t(item.label)}} <v-icon>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <template v-for="child in item.children"
                                      v-if="child.permission === undefined || $auth.check(child.permission)">
                                <v-divider v-if="child.type === 'divider'" />
                                <v-list-item :to="child.to" v-else>
                                    <v-list-item-title>{{$t(child.label)}}</v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-menu>
                    <v-btn :to="item.to" v-else text>{{$t(item.label)}}</v-btn>
                </template>
            </template>
        </v-toolbar-items>

        <v-spacer />

        <!-- Right -->
        <v-btn icon :to="{name: 'profile'}">
            <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn icon @click="logout">
            <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import logout from "../logout"

export default {
        name: "Toolbar",
        mixins: [logout],
        data() {
            return {
                appName: process.env.VUE_APP_NAME
            }
        },
        props: {
            items: Array,
        },
    };
</script>

<style>
.toolbar-btn-enter-active, .toolbar-btn-leave-active {
    transition: opacity .7s;
}
.toolbar-btn-enter, .toolbar-btn-leave-to {
    opacity: 0;
}
</style>
