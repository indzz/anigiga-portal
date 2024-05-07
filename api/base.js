class ApiService {
    constructor(api) {
        this.$api = api;
        this.$http = api.axios;
    }
}

class ResourceApiService extends ApiService {
    constructor(api, path) {
        super(api);
        this.path = path;
    }

    async list(params = {}) {
        const response = await this.$http.get(this.path, {params: params});
        return response.data;
    }

    async create(data) {
        const response = await this.$http.post(this.path, data);
        return response.data;
    }

    async edit(id, data) {
        const response = await this.$http.put(this.path + "/" + id, data);
        return response.data;
    }

    async view(id) {
        const response = await this.$http.get(this.path + "/" + id);
        return response.data;
    }

    async destroy(id) {
        const response = await this.$http.delete(this.path + "/" + id);
        return response.data;
    }

    async getOptions() {
        const response = await this.$http.get(this.path + "/options");
        return response.data;
    }

    async sort(ids) {
        const response = await this.$http.patch(this.path + "/sort", {
            sorted: ids
        });
        return response.data;
    }
}

class ApiResponseError {
    constructor(obj) {
        this.message = obj.message;
        this.errors = obj.errors;
    }

    static create(e) {
        return typeof e.response === 'object' ? new ApiResponseError(e.response.data) : e;
    }
}

export {
    ApiService,
    ResourceApiService,
    ApiResponseError
};
export default ApiService;
