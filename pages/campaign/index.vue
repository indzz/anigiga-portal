<template>
  <div>
    <page-header :title="$t('campaign_list')">
      <template v-slot:actions>
        <v-btn color="accent" depressed :to="{name: 'campaign_create'}" v-if="can('campaign_manage')">
          <v-icon>mdi-plus</v-icon>
          {{ $t('create') }}
        </v-btn>
      </template>
    </page-header>

    <v-container fluid>
      <data-table :fields="fields" :items="items" show-search multi-sort server show-filter :filter-data.sync="filter"
                  :server-items-length="paginateMeta.total"
                  :loading="loading" @refresh="tableRefresh" @delete="deleteItem">
        <template #item.started_at="{item}">
          <v-chip small color="info">{{ item.started_at }}</v-chip> - <v-chip small color="info">{{ item.ended_at }}</v-chip>
        </template>
        <template #item.status="{item}">
          <v-chip
              v-if="options?.status.find(s => s.key === item.status)"
              label :color="item.status === 1 ? 'success' : item.status === 2 ? 'error' : undefined" small>
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
  name: "campaign_list",
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
      }
    }
  },
  computed: {
    fields() {
      return [
        {text: this.$t('title'), key: 'title', filterable: false, sortable: false},
        {text: this.$t('remaining_stock'), key: 'is_available', filterable: false, sortable: false},
        {text: this.$t('selling_ticker_period'), key: 'started_at', filterable: true, sortable: false},
        {text: this.$t('status'), key: 'status', filterable: false, type: 'select', options: this.options.status},
        {text: this.$t('category'), key: 'collections', filterable: false, sortable: false},
        {
          text: this.$t('actions'),
          key: '_actions',
          type: 'actions',
          actions: [
            {type: 'edit', linkFactory: this.editLinkFactory},
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
      return this.$api.campaign();
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
    async fetchCampaignList(params) {
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
    editLinkFactory: (i) => ({name: 'campaign_edit', params: {id: i.id}}),
    tableRefresh(params) {
      this.fetchCampaignList(params);
    }
  }
}
</script>

<style scoped>

</style>
