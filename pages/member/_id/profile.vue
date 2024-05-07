<template>
  <div>
    <page-header show-back :title="$t('member_profile').toString()">
    </page-header>

    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="5" md="4" xl="3">

<!--          <div class="text-subtitle-1">{{$t('member.profile.basic_info').toString()}}</div>-->
          <v-card elevation="1" rounded>
            <v-btn text exact-path :to="{ name: 'member_id', params: { id: item.id } }" elevation="0" fab color="primary" x-small top right absolute style="right: 12px; top: 12px">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-card-text class="pt-8">
              <div class="d-flex justify-center align-center flex-column">
                <v-avatar size="56" color="primary" class="mb-2">
                  <div class="white--text text-h5">
                    {{ item?.name?.charAt(0) ?? 'A' }}
                  </div>
                </v-avatar>
                <div class="text-caption ">
                  {{ item?.uid }}
                </div>
                <div class="text-h6 font-weight-bold" v-if="item?.name ?? false">
                  {{ item?.name }}
                </div>
                <v-chip class="mt-1" label small :color="item.gender === 0 ? 'blue lighten-2' : 'red darken-1'" v-if="item?.gender !== null">
                  <span class="white--text">{{ options?.gender.find(s => s.key === item.gender)?.label }}</span>
                </v-chip>

              </div>
              <v-row class="mt-2">
                <v-col cols="6">
                  <div class="d-flex justify-center align-center flex-column">
                    <div class="d-flex justify-center align-center ">
                      <v-avatar size="42" color="deep-purple darken-1" tile>
                        <v-icon dark>
                          mdi-star
                        </v-icon>
                      </v-avatar>
                      <div class="ml-3">
                        <div class="font-weight-bold text-subtitle-1">
                          {{ toCurrencyFormat(item?.point ?? 0, { place: 0 }) }}
                        </div>
                        <div class="text-subtitle-2">
                          {{ $t('member.profile.point').toString() }}
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="d-flex justify-center align-center flex-column">
                    <div class="d-flex justify-center align-center ">
                      <v-avatar size="42" color="secondary" tile>
                        <v-icon dark>
                          mdi-alpha-c-circle-outline
                        </v-icon>
                      </v-avatar>
                      <div class="ml-3">
                        <div class="font-weight-bold text-subtitle-1">
                          {{ toCurrencyFormat(item?.coin ?? 0, { place: 0 }) }}
                        </div>
                        <div class="text-subtitle-2">
                          {{ $t('member.profile.coin').toString() }}
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mt-4 mb-3" />
<!--              <v-list-item dense class="pa-0" v-if="item?.gender !== null ?? false">-->
<!--                <v-list-item-title >-->
<!--                  <div class="d-flex align-center ">-->
<!--                    <div class="font-weight-medium text-subtitle-1 mr-2">{{ $t('member.profile.gender').toString()}}: </div>-->
<!--                    <div class="text-subtitle-2">-->
<!--                      <v-chip label small :color="item.gender === 0 ? 'blue lighten-2' : 'red darken-1' ">-->
<!--                        <span class="white&#45;&#45;text">{{ options?.gender.find(s => s.key === item.gender)?.label }}</span>-->
<!--                      </v-chip>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </v-list-item-title>-->
<!--              </v-list-item>-->
              <v-list-item dense class="pa-0">
                <v-list-item-title >
                  <div class="d-flex align-center ">
                    <div class="font-weight-medium text-subtitle-1 mr-2">{{ $t('member.profile.phone').toString()}}: </div>
                    <div class="text-body-1">
                      {{ `(${item.country_code})${item.phone}` }}
                    </div>
                    <v-spacer />
                    <v-chip class="ml-2" small color="success" >
                      <v-icon small class="mr-1">mdi-check-circle</v-icon>
                      <div>{{ $t('verified').toString() }}</div>
                    </v-chip>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list-item dense class="pa-0">
                <v-list-item-title >
                  <div class="d-flex align-center" >
                    <div class="font-weight-medium text-subtitle-1 mr-2">{{ $t('member.profile.email').toString()}}: </div>
                    <div class="text-body-1">
                      {{ item?.email ?? '--' }}
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list-item dense class="pa-0" >
                <v-list-item-title >
                  <div class="d-flex align-center" >
                    <div class="font-weight-medium text-subtitle-1 mr-2">{{ $t('member.profile.region').toString()}}: </div>
                    <div class="text-body-1">
                      {{ options?.region?.find(s => s.key === item.region)?.label ?? '--' }}
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list-item dense class="pa-0">
                <v-list-item-title >
                  <div class="d-flex align-center" >
                    <div class="font-weight-medium text-subtitle-1 mr-2">{{ $t('member.profile.status').toString()}}: </div>
                    <div class="text-body-1">
                      <v-chip small :color="item.status === 0 ? 'green accent-1' : 'red lighten-4'" >
                        {{ options?.account_status.find(s => s.key === item.status)?.label }}
                      </v-chip>

                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list-item dense class="pa-0">
                <v-list-item-title >
                  <div class="d-flex align-center" >
                    <div class="font-weight-medium text-subtitle-1 mr-2">{{ $t('member.profile.birthday').toString()}}: </div>
                    <div class="text-body-1">
                      {{ item?.birthday ?? '--' }}
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>

            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="7" md="8" xl="9">


          <div class="d-flex mb-4">
            <v-btn depressed color="primary">Point Transaction</v-btn>
          </div>

<!--          <v-divider class="my-4" />-->

          <v-card :elevation="1">
            <div class="d-flex pa-3 mb-1">
              <v-row dense>
                <v-spacer />
                <v-col cols="4">
                  <base-form-field :config="searchForm.search" v-model="search.pointTransaction" />
                </v-col>
              </v-row>

            </div>
            <v-divider />
            <v-data-table :headers="pointTransactionHeaders" :items="item?.point_transactions ?? []" :search="search.pointTransaction">
              <template #item.amount="{ value }">
                <div :class="value > 0 ? 'success--text' : 'error--text'" class="font-weight-bold">
                  {{ value > 0 ? "+ " : "" }}{{ toCurrencyFormat(value, { place: 0 }) }}
                </div>
              </template>
              <template #item.action="{ value, item }">
                <point-transaction-form :item="item">
                  <template #activator="{ on, attrs }">
                    <v-btn small icon v-on="on" v-bind="attrs">
                      <v-icon small>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                </point-transaction-form>

              </template>
            </v-data-table>
          </v-card>

        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/components/Common/PageHeader.vue";
import DataTable from "@/components/Common/DataTable.vue";
import crud from "@/components/crud";
import {toCurrencyFormat} from "../../../util/helper";
import BaseFormField from "vuetify-configurable-field/src/BaseFormField";
import PointTransactionForm from "@/components/Member/PointTransactionForm";

export default {
  name: "MemberProfile",
  components: {PointTransactionForm, DataTable, PageHeader, BaseFormField},
  mixins: [crud],
  validate({ route }) {
    return !!route.params.id;
  },
  data() {
    return {
      options: {
        gender: [],
        account_status: [],
        country_code: [],
        region: [],
      },
      item: {
        id: null,
        surname: null,
        given_name: null,
        gender: null,
        phone: null,
        email: null,
        region: null,
        status: 0,
        country_code: 852,
        birthday: null,
      },
      search: {
        pointTransaction: null
      },
    }
  },
  mounted() {
    this.fetchOptions();
    if (this.$route.params.id) {
      this.fetchItem(this.$route.params.id);
    }
  },
  methods: {
    toCurrencyFormat,
    apiResource() {
      return this.$api.member();
    },
    submitSuccess(data) {
      this.alert('success', data.message);
      // this.$router.push({
      //   name: 'member'
      // });
    }
  },
  computed: {
    searchForm() {
      return {
        search: {
          "key": "search",
          "placeholder": this.$t('search_form.search.placeholder'),
          "dense": true,
          "outlined": false,
          "rules": "",
          "hideDetails": true,

        },
      }
    },
    pointTransactionHeaders() {
      return [
        {
          text: this.$t('member.profile.point_transaction.reference_no').toString(),
          value: 'ref_no',
        },
        {
          text: this.$t('member.profile.point_transaction.description').toString(),
          value: 'description',
        },
        {
          text: this.$t('member.profile.point_transaction.amount').toString(),
          value: 'amount',
        },
        {
          text: this.$t('member.profile.point_transaction.created_at').toString(),
          value: 'created_at',
        },
        {
          text: this.$t('actions').toString(),
          value: 'action',
        },
      ]
    }
  },
}
</script>

<style scoped>

</style>
