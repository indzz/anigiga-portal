<template>
    <div>
        <v-card>
            <template v-if="showFilter || showSearch">
                <v-row class="px-5 align-center mb-0">
                    <template v-if="showFilter && filter">
                        <v-col cols="12" md="6" xl="8">
                            <slot name="filter">
                                <filter-bar :fields="tableFields" v-model="filter" @change="filterChanged" />
                            </slot>
                        </v-col>
                    </template>

                    <v-spacer />

                    <v-col cols="12" md="6" lg="4" xl="2" v-if="showSearch">
                        <slot name="search">
                            <v-text-field v-model="search" :label="searchFieldLabel || $t('search')"
                                          :prepend-inner-icon="!server ? 'mdi-magnify' : null"
                                          :append-icon="server ? 'mdi-magnify' : null"
                                          @click:append="searchSubmit"
                                          @keyup.enter="searchSubmit"
                                          clearable hide-details single-line class="mt-0 pt-0"></v-text-field>
                        </slot>
                    </v-col>
                </v-row>
                <v-divider />
            </template>
            <v-data-table :loading="loading" :show-select="showSelect" :multi-sort="multiSort"
                          :items-per-page="pagination.itemsPerPage" :footer-props="{'itemsPerPageOptions': itemsPerPageOptions}"
                          :page="pagination.page" :server-items-length="serverItemsLength" :search="!server ? search : null"
                          :sort-by.sync="sortCols" :sort-desc.sync="sortDir"
                          @update:sort-by="updateSortBy"
                          @update:sort-desc="updateSortDesc"
                          @pagination="pageChanged"
                          :headers="headers" :items="items" v-model="selected">
                <template v-slot:item="{item, select, isSelected, headers, index}">
                    <tr :class="showSelect && isSelected ? 'grey lighten-2' : ''">
                        <td v-if="showSelect">
                            <slot name="item.data-table-select" v-bind="{item, select, isSelected}">
                                <v-simple-checkbox :value="isSelected" @input="select($event)"></v-simple-checkbox>
                            </slot>
                        </td>
                        <td v-for="(field, k) in tableFields">
                            <slot :name="`item.${field.key}`" v-if="field.type === 'actions'"
                                  v-bind:item="item" v-bind:actions="field.actions" v-bind:field="field">
                                <template v-for="(action, k) in field.actions">
                                    <v-btn v-if="action.type === 'edit'" small icon
                                           :to="typeof action.linkFactory === 'function' ? action.linkFactory(item) : undefined"
                                           @click="$emit('edit', item)">
                                        <v-icon small>{{editIcon}}</v-icon>
                                    </v-btn>
                                    <v-btn v-else-if="action.type === 'delete'" small icon @click="$emit('delete', item)">
                                        <v-icon small>{{deleteIcon}}</v-icon>
                                    </v-btn>
                                    <v-btn v-else-if="action.type === 'button'" small
                                           :icon="action.icon && !action.label"
                                           :text="action.label"
                                           @click="$emit('action:'+action.key, item)">
                                        <v-icon small v-if="action.icon">{{action.icon}}</v-icon>
                                        <template v-if="action.label">{{action.label}}</template>
                                    </v-btn>
                                </template>
                            </slot>
                            <slot :name="`item.${field.key}`" v-else
                                  v-bind:item="item" v-bind:value="getColVal(field, item, true)" v-bind:field="field">
                                {{getColVal(field, item)}}
                            </slot>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import FilterBar from "vuetify-advanced-datatable/src/FilterBar";
import _get from "lodash/get";
import _pickby from "lodash/pickBy";
import {tableHeader} from "vuetify-advanced-datatable/src/DataTableHeader"
import {DataTableField, tableField} from "vuetify-advanced-datatable/src/DataTableField"
import format from "date-fns/format"
import parseJSON from "date-fns/parseJSON"

export default {
    name: "DataTable",
    components: {FilterBar},
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        showSelect: {
            type: Boolean,
            default: false,
        },
        multiSort: {
            type: Boolean,
            default: false,
        },
        searchFieldLabel: {
            type: String,
        },
        showFilter: {
            type: Boolean,
            default: false,
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
        editLink: {
            type: Function,
        },
        itemsPerPage: {
            type: Number,
            default: 50,
        },
        itemsPerPageOptions: {
            type: Array,
            default: () => [50, 100, 200],
        },
        page: {
            type: Number,
            default: 1,
        },
        server: {
            type: Boolean,
            default: false,
        },
        serverItemsLength: {
            type: Number,
            default: -1,
        },
        sortBy: {
            type: [String, Array],
            default: () => [],
        },
        sortDesc: {
            type: [Boolean, Array],
            default: () => [],
        },
        fields: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
        },
        value: {
            type: Array
        },
        filterData: {
            type: Object
        },
        editIcon: {
            type: String,
            default: "mdi-pencil"
        },
        deleteIcon: {
            type: String,
            default: "mdi-delete"
        }
    },
    computed: {
        headers() {
            return this.fields.map((f) => {
                return tableHeader({
                    "text": f.text,
                    "value": f.key,
                    "align": f.align,
                    "sortable": f.sortable,
                    "class": f.class,
                    "width": f.width,
                });
            });
        },
        tableFields() {
            return this.fields.map((i) => {
                if (!(i instanceof DataTableField))
                    return tableField(i);
                return i;
            });
        },
        selected: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        queryParams() {
            const params = {};

            // Pagination on server
            if (this.server) {
                params['per_page'] = this.pagination.itemsPerPage;
                params['page'] = this.pagination.page;

                // Sorting
                if (this.sortCols.length > 0 && this.sortCols.length === this.sortDir.length) {
                    for (let i = 0; i < this.sortCols.length; i++) {
                        params[`order_by[${i}][col]`] = this.sortCols[i];
                        params[`order_by[${i}][dir]`] = this.sortDir[i] ? 'desc' : 'asc';
                    }
                }

                // Keyword search
                if (this.showSearch && this.search) {
                    params['keyword'] = this.search;
                }
            }

            // Filter
            if (this.showFilter) {
                for (let k in this.fields) {
                    const field = this.fields[k];
                    if (field.filterable && this.filter[field.key]) {
                        const value = this.filter[field.key];
                        if (field.filterType === 'daterange') {
                            params[`filter[${field.key}][from]`] = value.from;
                            params[`filter[${field.key}][to]`] = value.to;
                        } else {
                            params[`filter[${field.key}]`] = value;
                        }
                    }
                }
            }

            return params;
        }
    },
    data() {
        return {
            search: null,
            sortCols: this.sortBy,
            sortDir: this.sortDesc,
            refreshDelayTimer: null,
            pagination: {
                page: this.page,
                itemsPerPage: this.itemsPerPage,
            },
            filter: null,
        }
    },
    methods: {
        updateSortBy(payload) {
            this.sortCols = payload;
        },
        updateSortDesc(payload) {
            this.sortDir = payload;
        },
        getColVal(field, item, raw = false) {
            const val = _get(item, field.key);

            if (!raw) {
                if (field.type === 'select' && (typeof field.options === 'function' || typeof field.options === 'object')) {
                    return field.optionTextByValue(val);
                }
                if (field.type === 'datetime') {
                    return format(parseJSON(val), field.format || 'yyyy-MM-dd HH:mm:ss');
                }
            }
            return val;
        },

        refresh() {
            this.$emit('refresh', this.queryParams);
            this.$nextTick(() => {
                this.applyParamsToRoute();
            });
        },
        delayedRefresh(time = 100) {
            if (this.refreshDelayTimer != null)
                clearTimeout(this.refreshDelayTimer)

            this.refreshDelayTimer = setTimeout(() => {
                this.refresh();
                this.refreshDelayTimer = null;
            }, time)
        },
        filterChanged(newVal) {
            this.filter = newVal;
            this.$emit('update:filter-data', newVal);
            this.$nextTick(() => {
                this.refresh();
            });
        },
        pageChanged(p) {
            if (p.page === this.pagination.page
                && p.itemsPerPage === this.pagination.itemsPerPage
                && Object.keys(p).length === Object.keys(this.pagination).length) {
                return;
            }

            this.pagination = p;
            this.delayedRefresh();
        },
        searchSubmit() {
            if (this.server)
                this.refresh();
        },

        applyParamsFromRoute() {
            const query = this.$route.query;

            // Pagination
            if (query.page)
                this.pagination.page = parseInt(query.page);
            if (query.itemsPerPage)
                this.pagination.itemsPerPage = parseInt(query.itemsPerPage);

            // Sorting
            if (query.sortCols)
                this.sortCols = query.sortCols.split(',');
            if (query.sortDir)
                this.sortDir = query.sortDir.split(',').map((i) => i === 'desc');

            // Filter
            const data = query.filter ? JSON.parse(query.filter) : {};
            const filter = {};
            this.fields.filter((i) => i.filterable).forEach((i) => {
                if (i.filterType === 'daterange') {
                    filter[i.key] = typeof data[i.key] === 'object'
                        ? data[i.key]
                        : (this.filterData[i.key] || {from: null, to: null});
                } else {
                    filter[i.key] = data[i.key] || this.filterData[i.key];
                }
            });
            this.filter = filter;
            this.$emit('update:filter-data', this.filter);


            if (query.search)
                this.search = query.search;
        },
        applyParamsToRoute() {
            const params = {
                page: this.pagination.page,
                itemsPerPage: this.pagination.itemsPerPage,
                sortCols: this.sortCols ? this.sortCols.join(',') : null,
                sortDir: this.sortDir ? this.sortDir.map((i) => i ? 'desc' : 'asc').join(',') : null,
                filter: this.filter ? JSON.stringify(_pickby(this.filter)) : null,
                search: this.search || null,
            };

            this.$router.push({query: _pickby(params)});
        },
    },
    mounted() {
        this.applyParamsFromRoute();
    },
    watch: {
        ...['sortCols', 'sortDir'].map(item => ({
            [item]: {
                handler() {
                    this.delayedRefresh();
                },
                deep: true
            }
        })),
    }
}
</script>
