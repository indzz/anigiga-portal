<template>
    <div>
        <page-header :title="$t('user_list')">
            <template v-slot:actions>
                <v-btn color="accent" depressed :to="{name: 'staff_create'}" v-if="can('staff_manage')">
                    <v-icon>mdi-plus</v-icon>
                    {{$t('create')}}
                </v-btn>
            </template>
        </page-header>

        <v-container fluid>
            <data-table :fields="fields" :items="items" show-search multi-sort server show-filter :filter-data.sync="filter"
                        :server-items-length="paginateMeta.total"
                        :loading="loading" @refresh="tableRefresh" @delete="deleteItem">
            </data-table>
        </v-container>
    </div>
</template>

<script>
import DataTable from "vuetify-advanced-datatable/src/DataTable";
import crud from "@/components/crud";
import PageHeader from "../../components/Common/PageHeader"

export default {
        name: "staff_list",
        components: {PageHeader, DataTable},
        mixins: [crud],
        data() {
            return {
                filter: {
                    username: null,
                    name: null,
                    status: null,
                },
                items: [],
                statusOptions: {},
                paginateMeta: {}
            }
        },
        computed: {
            fields() {
                return [
                    {text: this.$t('username'), key: 'username', filterable: true, sortable: true},
                    {text: this.$t('name'), key: 'name', filterable: true, sortable: true},
                    {text: this.$t('role'), key: 'role.name'},
                    {text: this.$t('status'), key: 'status', filterable: true, type: 'select', options: this.statusOptions},
                    {
                        text: this.$t('actions'),
                        key: '_actions',
                        type: 'actions',
                        actions: [
                            {type: 'edit', linkFactory: this.editLinkFactory},
                            {type: 'delete'},
                        ]
                    }
                ];
            }
        },
        methods: {
            apiResource() {
                return this.$api.staff();
            },
            async fetchStaffList(params) {
                this.loadingCount++;

                try {
                    const data = await this.apiResource().list(params);
                    this.items = data.data;
                    this.paginateMeta = data.meta;
                    this.statusOptions = data.status_options;
                } catch (e) {
                    this.alert('error', e.message);
                }

                this.loadingCount--;
            },
            editLinkFactory: (i) => ({name: 'staff_edit', params: {id: i.id}}),
            tableRefresh(params) {
                this.fetchStaffList(params);
            }
        }
    }
</script>

<style scoped>

</style>
