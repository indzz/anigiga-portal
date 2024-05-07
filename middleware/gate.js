export default ({ route, error, $auth }) => {
    const rights = route.meta.map((i) => i.gate).flat().filter(i => typeof i === 'string');
    if (!$auth.loggedIn || !$auth.check(rights)) {
        return error({
            status: 403,
            message: 'You are not permitted to access this page'
        });
    }
}
