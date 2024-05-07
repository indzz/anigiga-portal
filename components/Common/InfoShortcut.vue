<template>
    <v-card class="ma-3">
        <v-card-title class="grey lighten-4 py-2">
            <h3 class="subtitle-1">{{$t('quick_links')}}</h3>
        </v-card-title>
        <v-divider />
        <v-row dense class="px-2 py-1">
            <v-col cols="4" class="text-center mb-3"
                   v-for="(item, k) in items" :key="k"
                   v-if="item.permission === undefined || $auth.check(item.permission)">
                <v-card outlined :to="item.to" class="py-5 mb-1">
                    <v-icon size="42">{{item.icon}}</v-icon>
                </v-card>
                {{item.label}}
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "InfoShortcut",
        data() {
            return {
                items: [
                    {icon: 'mdi-account', label: 'My Account', to: {name: 'profile'}},
                    {icon: 'mdi-settings', label: 'Settings', to: {name: 'settings'}, permission: 'system_settings'},
                    {icon: 'mdi-clipboard-text', label: 'Item 3', to: {name: 'profile'}},
                    {icon: 'mdi-bell', label: 'Item 4', to: {name: 'profile'}},
                    {icon: 'mdi-image-multiple', label: 'Item 5', to: {name: 'profile'}},
                    {icon: 'mdi-file', label: 'Item 6', to: {name: 'profile'}},
                ]
            }
        }
    }
</script>
