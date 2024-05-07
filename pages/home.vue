<template>
    <div class="dashboard">
        <v-sheet tile class="dashboard-greeting">
            <h1 class="display-3 mb-3">{{$t('dashboard_welcome', {name: $auth.user.name})}}</h1>
            <div class="dashboard-brand dashboard-container" v-if="false">
                <!-- Reserved -->
            </div>
        </v-sheet>

        <div class="dashboard-body dashboard-container">
            <div class="title">{{$t('dashboard_looking')}}</div>
            <dashboard-shortcut />
        </div>
    </div>
</template>

<script>
import DashboardShortcut from "@/components/DashboardShortcut"

export default {
        name: "index",
        components: {DashboardShortcut},
        head() {
            return {
                title: this.$t('dashboard')
            }
        },
    }
</script>

<style>
    .dashboard-container {
        max-width: 680px;
        margin: 0 auto;
        padding-left: 16px;
        padding-right: 16px;
    }
    .dashboard-greeting {
        text-align: center;
        padding: 64px 16px;
        border-bottom: 1px solid #F0F0F0 !important;
    }
    .dashboard-brand {
        border: 1px solid #F0F0F0;
        padding: 16px;
        border-radius: 16px;
    }
    .dashboard-body {
        margin: 0 auto;
        padding-top: 32px;
        padding-bottom: 32px;
    }
</style>
