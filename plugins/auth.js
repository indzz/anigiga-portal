import Vue from "vue";

export default (context) => {
    /**
     * @param {?string|?string[]} role
     * @returns {boolean}
     */
    context.$auth.check = function (role) {
        if (role) {
            const userRoles = this.user.permissions;
            if (!userRoles)
                return false;
            else if (Array.isArray(role)) {
                return userRoles.some((r) => role.includes(r));
            } else {
                return userRoles.includes(role);
            }
        }

        return this.loggedIn;
    };

    Vue.mixin({
        methods: {
            can: function (permission) {
                return this.$auth.check(permission);
            }
        }
    });
}
