<template>
  <div>
    <page-header :title="$t('collection_list')">
      <template v-slot:actions>
        <v-btn color="accent" depressed :to="{name: 'collection_create'}" v-if="can('collection_manage')">
          <v-icon>mdi-plus</v-icon>
          {{ $t('create') }}
        </v-btn>
      </template>
    </page-header>

    <v-container fluid>
      <data-table :fields="fields" :items="items" show-search multi-sort server show-filter :filter-data.sync="filter"
                  :server-items-length="paginateMeta.total"
                  :loading="loading" @refresh="tableRefresh" @delete="deleteItem">

        <template #item.status="{item}">
          <v-chip
              v-if="options?.status.find(s => s.key === item.status)"
              label :color="item.status === 0 ? 'success' : 'error'" small>
            {{ options?.status.find(s => s.key === item.status).label }}
          </v-chip>
        </template>
      </data-table>
    </v-container>
  </div>
</template>

<script>
import DataTable from "@/components/Common/DataTable";
import crud from "@/components/crud";
import PageHeader from "../../components/Common/PageHeader"

export default {
  name: "collection_list",
  components: {PageHeader, DataTable},
  mixins: [crud],
  data() {
    return {
      filter: {
        status: null,
      },
      items: [],
      paginateMeta: {},
      options: {
        status: [],
        type: []
      }
    }
  },
  computed: {
    fields() {
      return [
        {text: this.$t('name'), key: 'name', filterable: false, sortable: false},
        {text: this.$t('status'), key: 'status', filterable: true, type: 'select', options: this.options.status},
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
  async mounted() {
    await this.fetchOptions()
  },
  methods: {
    apiResource() {
      return this.$api.collection();
    },
    async fetchOptions(params) {
      this.loadingCount++;
      try {
        this.options = await this.apiResource().getOptions();
      } catch (e) {
        this.alert('error', e.message);
      }
      this.loadingCount--;
    },
    async fetchCollectionList(params) {
      this.loadingCount++;

      try {
        const data = await this.apiResource().list(params);
        this.items = data.data;
        this.paginateMeta = data.meta;
      } catch (e) {
        this.alert('error', e.message);
      }

      this.loadingCount--;
    },
    editLinkFactory: (i) => ({name: 'collection_edit', params: {id: i.id}}),
    tableRefresh(params) {
      this.fetchCollectionList(params);
    }
  }
}
</script>

<style scoped>

</style>
