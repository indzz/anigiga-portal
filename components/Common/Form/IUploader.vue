<template>
  <component :is="component" ref="uploadZone"
             :label="label" :file-picker-label="filePickerLabel" :multiple="multiple"
             :accept="accept" v-model="fieldValue"
             v-bind="$attrs"
             @upload="onUpload" @delete="onDeleteUploaded" @view="viewFile">
  </component>
</template>
<script>
import value_sync from "vuetify-configurable-field/src/mixins/value_sync"
import {GridUploadZone, ListUploadZone} from "vuetify-upload-zone"

export default  {
  name: "IUploader",
  mixins: [value_sync],
  components: {ListUploadZone, GridUploadZone},
  inheritAttrs: false,
  props: {
    label: String,
    layout: {
      type: String,
      default: 'grid',
      validator: (v) => ['grid', 'list'].indexOf(v) !== -1
    },
    filePickerLabel: String,
    accept: String,
    multiple: Boolean,
    group: {
      type: String,
      default: 'editor'
    }
  },
  computed: {
    component() {
      if (this.layout === 'grid') {
        return 'grid-upload-zone';
      }
      return 'list-upload-zone';
    }
  },
  methods: {
    async onUpload(file) {
      try {
        const media = typeof this.$listeners.upload === 'function' ?
          (await this.$listeners.upload(file)) :
          (await this.$dynamicFieldConfig.uploadHandler.onUpload(file, {}, this.group));
        this.$refs.uploadZone.uploadDone(file, media);
      } catch (e) {
        const errStr = e.response && e.response.data && e.response.data.errors ? e.response.data.errors['file'][0] : null;
        this.$refs.uploadZone.uploadFailed(file, errStr || 'upload error');
      }
    },
    async onDeleteUploaded(file) {
      // Delete on server
      try {
        const message = typeof this.$listeners.upload === 'function' ?
          (await this.$listeners.delete(file)) :
          (await this.$dynamicFieldConfig.uploadHandler.onDelete(file));
        await this.$dynamicFieldConfig.uploadHandler.onSuccess(message);
      } catch (e) {
        const errStr = e.response && e.response.data && e.response.data.message ? e.response.data.message : e;
        await this.$dynamicFieldConfig.uploadHandler.onError(errStr)
      }

      // Remove from file list
      if (Array.isArray(this.fieldValue)) {
        this.$delete(this.fieldValue, this.fieldValue.indexOf(file));
      } else {
        this.fieldValue = null;
      }
    },
    viewFile(file) {
      window.open(file.url);
    }
  }
}
</script>
