<template>
  <v-dialog
    v-model="dialog"
    width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs" />
    </template>

    <validation-observer v-slot="{ invalid, failed }" ref="observer" slim>
      <v-form @submit.prevent="submit">
        <v-card>

          <v-card-title>
            {{$t(`member.profile.point_transaction.${item.id ? "edit" : 'create'}_title`).toString()}}
          </v-card-title>

          <v-divider />

          <v-card-text>
            <base-form-field :config="fields.description" v-model="lazyItem.description" />
            <base-form-field :config="fields.internal_remark" v-model="lazyItem.internal_remark" />
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn type="submit" color="primary" text >{{$t('submit').toString()}}</v-btn>
          </v-card-actions>
        </v-card>

      </v-form>
    </validation-observer>
  </v-dialog>
</template>

<script>
import BaseFormField from "vuetify-configurable-field/src/BaseFormField";

const pointTransactionFactory = (payload) => {
  let base = {
    id: null,
    description: null,
    internal_remark: null,
  }
  return Object.assign(base, payload)
}

export default {
  name: "PointTransactionForm",
  props: {
    item: {
      type: Object | null,
      default: null
    },
  },
  components: {BaseFormField},
  data() {
    return {
      dialog: false,
      lazyItem: pointTransactionFactory()
    }
  },
  watch: {
    dialog() {
      this.lazyItem = pointTransactionFactory(this.item)
    }
  },
  computed: {
    fields() {
      return {
        description: {
          "key": "description",
          "name": this.$t('member.profile.point_transaction.description'),
          "label": this.$t('member.profile.point_transaction.description'),
          "dense": true,
          "outlined": true,
          "rules": {
            required: true
          },
        },
        internal_remark: {
          "type": "textarea",
          "key": "internal_remark",
          "name": this.$t('member.profile.point_transaction.internal_remark'),
          "label": this.$t('member.profile.point_transaction.internal_remark'),
          "dense": true,
          "outlined": true,
          "rules": "",
          "hideDetails": "auto",
        },
      }
    }
  },
  methods: {
    submit() {
      // Make an API call to create or update a point transaction
      // You can use this.lazyItem to access the form data
    }
  },
}
</script>

<style scoped>

</style>
