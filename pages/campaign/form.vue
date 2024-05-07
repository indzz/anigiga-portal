<template>
  <base-form v-slot="{ invalid }" ref="baseForm" @submit="submit"
             :title="$t(item.id != null ? 'collection_edit' : 'collection_create')">
    <v-container>
      <v-card max-width="640" class="mx-auto mt-3">
        <v-card-text>



          <div class="mb-8">
            <v-label>{{ fields.name[$i18n.locale].label }}</v-label>
            <div v-for="lang in $site_locales" :key="lang">
              <base-form-field :config="fields.name[lang]" v-model="item.name[lang]"/>
            </div>
          </div>


          <base-form-field :config="fields.status" v-model="item.status"/>
          <i-uploader style="width: 200px" v-bind="fields.thumbnail" v-model="item.thumbnail" />
        </v-card-text>
        <v-card-actions class="grey lighten-5">
          <v-spacer/>
          <!-- Submit Button -->
          <v-btn color="accent" depressed type="submit" :loading="submitting" :disabled="invalid">
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
import IUploader from "@/components/Common/Form/IUploader";

export default {
  name: "collection_form",
  components: {
    IUploader,
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
        name: {
          'en': "",
          'zh-hk': "",
          'zh-cn': "",
        },
        status: 0,
        thumbnail: null,
      },
      options: {
        status: []
      },
    }
  },
  computed: {
    fields() {
      return {
        'name': this.$site_locales.reduce((map, lang) => {
          map[lang] = {
            "key": "name." + lang,
            "label": this.$t('name'),
            "type": "text",
            "dense": true,
            "outlined": true,
            "rules": "required",
            "autoHideDetails": true,
            "singleLine": true,
            "prefix": this.$t('lang_abbr.' + lang),
          };
          return map;
        }, {}),
        "status": {
          "key": "status",
          "label": this.$t('status'),
          "type": "select",
          "dense": true,
          "outlined": true,
          "items": this.options.status,
          "_control": "select",
          "rules": "required",
          "itemText": "label",
          "itemValue": "key"
        },
        "thumbnail": {
          name: 'thumbnail',
          vid: 'thumbnail',
          label: 'Thumbnail',
          type: 'upload',
          accept: "image/jpeg,image/png",
          rules: {
            required: true,
          },
          group: 'collection_thumbnail'
        },
      };
    }
  },
  methods: {
    apiResource() {
      return this.$api.collection();
    },
    submitSuccess(data) {
      this.alert('success', data.message);
      this.$router.push({
        name: 'collection'
      });
    }
  },
}
</script>
