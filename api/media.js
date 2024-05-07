import ApiService from "./base";

class MediaApi extends ApiService {
    constructor(api) {
        super(api);
        this.path = 'media';
    }

    async upload(group, file, config = {}) {
        const data = new FormData();
        data.append('file', file);

        config = Object.assign(config, {headers: {'Content-Type': 'multipart/form-data'}});
        const response = await this.$http.post(`media/${group}`, data, config);
        return response.data.data;
    }

    async delete(id, config = {}) {
        const response = await this.$http.delete(`media/file/${id}`, config);
        return response.data.message;
    }
}

export default MediaApi;
export { MediaApi };
