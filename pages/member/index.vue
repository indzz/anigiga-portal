<template>
  <div>
    <page-header :title="$t('member_list')">
      <template v-slot:actions>
        <v-btn class="mr-2" color="primary" depressed @click="exportExcel" v-if="can('member_manage')"
               :loading="state.exporting" :disabled="state.exporting">
          <v-icon>mdi-export</v-icon>
          {{ $t('export') }}
        </v-btn>

        <v-btn color="accent" depressed :to="{name: 'member_create'}" v-if="can('member_manage')">
          <v-icon>mdi-plus</v-icon>
          {{ $t('create') }}
        </v-btn>
      </template>
    </page-header>

    <v-container fluid>
      <data-table :fields="fields" :items="items" show-search multi-sort server show-filter :filter-data.sync="filter"
                  :server-items-length="paginateMeta.total"
                  :loading="loading" @refresh="tableRefresh" @delete="deleteItem"
                  @action:profile="item => $router.push({name: 'member_id_profile', params: {id: item.id}})"
      >

        <template #item.gender="{item}">
          <v-chip
              v-if="options?.gender.find(s => s.key === item.gender)"
              :color="item.gender === 0 ? 'blue lighten-2' : 'red darken-1'"
              small label>
            <div class="white--text">
              {{ options?.gender.find(s => s.key === item.gender).label }}
            </div>
          </v-chip>
        </template>

        <template #item.region="{item}">
          <div v-if="options?.region.find(s => s.key === item.region)">
            {{ options?.region.find(s => s.key === item.region).label }}
          </div>
        </template>

        <template #item.country_code="{item}">
          <div
              v-if="options?.country_code.find(s => s.key === item.country_code)"
          >
            {{ options?.country_code.find(s => s.key === item.country_code).label }}
          </div>
        </template>

        <template #item.status="{item}">
          <v-chip
              v-if="options?.account_status.find(s => s.key === item.status)"
              label :color="item.status === 0 ? 'success' : 'error'" small>
            {{ options?.account_status.find(s => s.key === item.status).label }}
          </v-chip>
        </template>
      </data-table>
    </v-container>
  </div>
</template>

<script>
import crud from "@/components/crud";
import PageHeader from "../../components/Common/PageHeader"
import DataTable from "@/components/Common/DataTable";

export default {
  name: "member_list",
  components: {PageHeader, DataTable},
  mixins: [crud],
  data() {
    return {
      state: {
        exporting: false,
      },
      filter: {
        uid: null,
        name: null,
        gender: null,
        region: null,
        country_code: null,
        phone: null,
        status: null,
      },
      items: [],
      paginateMeta: {},
      options: {
        account_status: [],
        gender: [],
        region: [],
        country_code: []
      }
    }
  },
  computed: {
    fields() {
      return [
        {text: this.$t('member.list.uid'), key: 'uid', filterable: false, sortable: true},
        {text: this.$t('member.list.name'), key: 'name', filterable: false, sortable: false},
        {
          text: this.$t('member.list.gender'),
          key: 'gender',
          filterable: true,
          sortable: false,
          type: 'select',
          options: this.options.gender
        },
        {
          text: this.$t('member.list.region'),
          key: 'region',
          filterable: true,
          sortable: false,
          type: 'select',
          options: this.options.region
        },
        {
          text: this.$t('member.list.country_code'),
          key: 'country_code',
          filterable: true,
          sortable: false,
          type: 'select',
          options: this.options.country_code
        },
        {text: this.$t('member.list.phone'), key: 'phone', filterable: false, sortable: false},
        {
          text: this.$t('status'),
          key: 'status',
          filterable: true,
          type: 'select',
          options: this.options.account_status
        },
        {
          text: this.$t('actions'),
          key: '_actions',
          type: 'actions',
          actions: [
            // {type: 'edit', linkFactory: this.editLinkFactory},
            {type: 'button', key: 'profile', icon: 'mdi-magnify'}
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
      return this.$api.member();
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
    async fetchMemberList(params) {
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
    editLinkFactory: (i) => ({name: 'member_edit', params: {id: i.id}}),
    tableRefresh(params) {
      this.fetchMemberList(params);
    },
    async exportExcel() {
      try {
        this.state.exporting = true;
        const res = await this.apiResource().exportExcel()
        const el = document.createElement('a')
        el.target = '_blank'
        el.href = res.url
        el.click()
        el.remove()
      } catch (e) {
        this.alert('error', e.message);
      } finally {
        this.state.exporting = false
      }

    }
  }
}
</script>

<style scoped>

</style>
