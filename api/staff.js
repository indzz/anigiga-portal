import {ResourceApiService} from "./base";

class StaffApi extends ResourceApiService {
    constructor(api) {
        super(api, 'staff');
    }
}

class RoleApi extends ResourceApiService {
    constructor(api) {
        super(api, 'role');
    }
}

export { StaffApi, RoleApi };
