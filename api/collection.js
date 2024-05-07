import {ResourceApiService} from "./base";

class CollectionApi extends ResourceApiService {
    constructor(api) {
        super(api, 'collection');
    }
}

export default CollectionApi;
