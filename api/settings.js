import {ApiService, ResourceApiService} from "./base";

class SettingsApi extends ApiService {
    constructor(api) {
        super(api);
        this.path = 'settings';
    }

    async all() {
        const response = await this.$http.get(this.path);
        return response.data;
    }

    async save(data) {
        const response = await this.$http.put(this.path, data);
        return response.data;
    }
}

class WorldClockApi extends ResourceApiService {
    constructor(api) {
        super(api);
        this.path = 'clock';
    }
}

class BannerApi extends ResourceApiService {
    constructor(api) {
        super(api);
        this.path = 'banner';
    }
}

export default SettingsApi;
export { SettingsApi, WorldClockApi, BannerApi };
