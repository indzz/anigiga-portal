export default {
    name: "index",
    layout: "plain",
    middleware({$auth, redirect}) {
        return redirect($auth.loggedIn ? '/home' : '/login')
    },
    functional: true,
}
