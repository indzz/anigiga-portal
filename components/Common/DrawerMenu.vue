<template>
    <v-list>
        <v-list-item :to="{name: 'home'}" color="primary" exact>
            <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{$t('dashboard')}}</v-list-item-title>
        </v-list-item>

        <template v-for="item in items" v-if="item.permission === undefined || $auth.check(item.permission)">
            <v-list-group v-if="typeof item.children !== 'undefined'" :prepend-icon="item.icon" no-action color="primary">
                <template v-slot:activator>
                    <v-list-item-title>{{$t(item.label)}}</v-list-item-title>
                </template>

                <template v-for="child in item.children"
                          v-if="child.permission === undefined || $auth.check(child.permission)">
                    <v-divider v-if="child.type === 'divider'" />
                    <drawer-menu-item :item="child" v-else />
                </template>
            </v-list-group>

            <drawer-menu-item :item="item" v-else />
        </template>
        <v-divider />
    </v-list>
</template>

<script>
import DrawerMenuItem from "./DrawerMenuItem"

export default {
        name: "DrawerMenu",
        components: {DrawerMenuItem},
        props: {
            items: Array,
        },
    }
</script>
