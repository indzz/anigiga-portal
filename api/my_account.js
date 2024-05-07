import ApiService from "./base";

class MyAccountApi extends ApiService {
    async getProfile() {
        const response = await this.$http.get("me");
        return response.data.data;
    }

    async changePassword(currentPassword, newPassword) {
        const response = await this.$http.put("me/password", {
            current_password: currentPassword,
            new_password: newPassword,
        });
        return response.data.message;
    }
}

export default MyAccountApi;
