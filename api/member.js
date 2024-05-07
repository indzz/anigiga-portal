import {ResourceApiService} from "./base";

class MemberApi extends ResourceApiService {
    constructor(api) {
        super(api, 'member');
    }
    async exportExcel() {
        const res = await this.$http.get(this.path + '/export');
        return res.data
    }
}

export default MemberApi;
