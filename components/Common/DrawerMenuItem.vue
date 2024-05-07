<template>
    <v-list-item :to="item.to" v-else color="primary">
        <v-list-item-icon v-if="item.icon">
            <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{$t(item.label)}}</v-list-item-title>
    </v-list-item>
</template>

<script>
    export default {
        name: "DrawerMenuItem",
        props: {
            item: {
                type: Object,
                required: true,
            }
        }
    }
</script>