import UploadResult from "vuetify-configurable-field/src/uploader/result"

export default async ({app}) => {
  app.$dynamicFieldConfig.uploadHandler = {
    async onUpload(file, extra, group = 'editor') {
      try {
        const result = await app.$api.media().upload(group, file, extra);
        return new UploadResult(result);
      } catch (e) {
        if (e.response && e.response.data) {
          if (e.response.data.errors.file[0])
            throw e.response.data.errors.file[0];
          else if (e.response.data.message)
            throw e.response.data.message;
          else
            throw e.response.data;
        }
        throw 'failed to upload file';
      }
    },
    async onDelete(file) {
      return await app.$api.media().delete(file.id);
    },
    onSuccess(e) {
      app.$alert('success', e);
    },
    onError(e) {
      app.$alert('error', e);
    }
  }
}
