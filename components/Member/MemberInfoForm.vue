<template>
  <base-form v-slot="{ invalid, failed }" ref="baseForm" @submit="submit"
             :title="$t(item.id != null ? 'member_edit' : 'member_create')">
    <v-container>
      <v-card max-width="640" class="mx-auto mt-3">
        <v-card-text>

          <base-form-field :config="fields.name" v-model="item.name"/>

          <base-form-field :config="fields.gender" v-model="item.gender"/>

          <v-row>
            <v-col cols="12" sm="4">
              <base-form-field :config="fields.country_code" v-model="item.country_code"/>
            </v-col>
            <v-col cols="12" sm="8">
              <base-form-field :config="fields.phone" v-model="item.phone"/>
            </v-col>
          </v-row>

          <base-form-field :config="fields.email" v-model="item.email"/>
          <base-form-field :config="fields.region" v-model="item.region"/>
          <base-form-field :config="fields.birthday" v-model="item.birthday"/>
          <base-form-field :config="fields.status" v-model="item.status"/>

        </v-card-text>
        <v-card-actions class="grey lighten-5">
          <v-spacer/>
          <!-- Submit Button -->
          <v-btn color="accent" depressed type="submit" :loading="submitting" :disabled="failed && invalid">
            <v-icon>mdi-check</v-icon>
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </base-form>
</template>

<script>
import BaseFormField from "vuetify-configurable-field/src/BaseFormField";
import BaseForm from "@/components/Common/Form/BaseForm"
import crud from "@/components/crud";

export default {
  name: "MemberInfoForm",
  components: {
    BaseFormField,
    BaseForm,
  },
  mixins: [crud],
  created() {
    this.fetchOptions();
    if (this.$route.params.id) {
      this.fetchItem(this.$route.params.id);
    }
  },
  data() {
    return {
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
      options: {
        gender: [],
        account_status: [],
        country_code: [],
        region: [],
      },
    }
  },
  computed: {
    fields() {
      return {
        "gender": {
          "key": "gender",
          "label": this.$t('member.form.gender'),
          "type": "select",
          "dense": true,
          "outlined": true,
          "items": this.options.gender,
          "_control": "select",
          "rules": {
            "required": false,

          },
          "itemText": "label",
          "itemValue": "key"
        },
        "phone": {
          "key": "phone",
          "label": this.$t('member.form.phone'),
          "dense": true,
          "outlined": true,
          "disabled": true,
          "rules": {
            required: true
          }
        },
        "name": {
          "key": "name",
          "label": this.$t('member.form.name'),
          "dense": true,
          "outlined": true,
          "rules": ""
        },
        "email": {
          "key": "email",
          "label": this.$t('member.form.email'),
          "type": "email",
          "dense": true,
          "outlined": true,
          "rules": {
            required: false,
            email: true
          }
        },
        "region": {
          "key": "region",
          "label": this.$t('member.form.region'),
          "type": "select",
          "dense": true,
          "outlined": true,
          "items": this.options.region,
          "_control": "select",
          "itemText": "label",
          "itemValue": "key",
          "rules": {
            "required": false
          }
        },
        "status": {
          "key": "status",
          "label": this.$t('member.form.status'),
          "type": "select",
          "dense": true,
          "outlined": true,
          "items": this.options.account_status,
          "_control": "select",
          "rules": "required",
          "itemText": "label",
          "itemValue": "key"
        },
        "country_code": {
          "key": "country_code",
          "label": this.$t('member.form.country_code'),
          "type": "select",
          "dense": true,
          "outlined": true,
          "items": this.options.country_code,
          "_control": "select",
          "disabled": true,
          "itemText": "label",
          "itemValue": "key",
          "rules": "required"
        },
        "birthday": {
          "key": "birthday",
          "label": this.$t('member.form.birthday'),
          "type": "date",
          "dense": true,
          "outlined": true,
          "rules": {
            required: false
          }
        }
      };
    }
  },
  methods: {
    apiResource() {
      return this.$api.member();
    },
    submitSuccess(data) {
      this.alert('success', data.message);
      this.$router.back();
    }
  },
}
</script>
