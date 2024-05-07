<template>
    <v-row>
        <v-col cols="4" class="text-center mb-3"
               v-for="(item, k) in items" :key="k"
               v-if="item.permission === undefined || can(item.permission)">
            <v-card outlined :to="item.to" :href="item.href" class="py-5 mb-1">
                <v-icon size="64">{{item.icon}}</v-icon>
            </v-card>
            {{item.label}}
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "DashboardShortcut",
        data() {
            return {
                items: [
                    {icon: 'mdi-account-multiple', label: 'Member List', to: {name: 'member'}, permission: 'member_list'},
                    {icon: 'mdi-shield-account', label: 'Staff List', to: {name: 'staff'}, permission: 'staff_list'},
                    {icon: 'mdi-star', label: 'Placeholder', to: {name: 'home'}},
                    {icon: 'mdi-star', label: 'Placeholder', to: {name: 'home'}},
                    {icon: 'mdi-star', label: 'Placeholder', to: {name: 'home'}},
                    {icon: 'mdi-cog', label: 'Settings', to: {name: 'settings'}, permission: 'system_settings'},
                ]
            }
        }
    }
</script>
