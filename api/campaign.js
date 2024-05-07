import {ResourceApiService} from "./base";

class CampaignApi extends ResourceApiService {
    constructor(api) {
        super(api, 'campaign');
    }
}

export default CampaignApi;
