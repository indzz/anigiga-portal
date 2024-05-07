<template>
    <div>
        <page-header :title="$t('role_management')"></page-header>

        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="6" md="5" lg="4">
                    <simple-list prefix="role" ref="list" />
                </v-col>
                <v-col cols="12" sm="6" md="7" lg="8">
                    <nuxt-child :key="$route.fullPath" @submitted="fetchItems" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import crud from "@/components/crud";
import PageHeader from "@/components/Common/PageHeader"
import SimpleList from "@/components/Common/SimpleList"

export default {
        name: "role",
        components: {PageHeader, SimpleList},
        mixins: [crud],
        mounted() {
            this.$nextTick(() => {
                this.fetchItems();
            });
        },
        data() {
            return {
                items: [],
            }
        },
        methods: {
            apiResource() {
                return this.$api.role();
            },
            fetchItems() {
                this.$refs.list.fetchItems();
            }
        }
    }
</script>
