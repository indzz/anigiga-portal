<template>
    <v-app>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-card width="420">
                    <v-responsive :aspect-ratio="420/180"
                                  class="align-center justify-center text-center guest-card-header primary white--text">
                        <div class="px-12">
                            <img src="~/assets/mylogo.svg" :alt="appName" class="card-header-logo"
                                 v-if="$vuetify.theme.options.useLogo" />
                            <h1 v-else>
                                {{appName}}
                            </h1>
                        </div>
                    </v-responsive>
                    <v-card-text>
                        <nuxt />
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "guest",
        computed: {
            appName() {
                return process.env.APP_NAME
            }
        }
    }
</script>

<style>
    .guest-card-header {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.4) 100%) no-repeat;
    }
    .card-header-logo {
        max-width: 100%;
    }
</style>
