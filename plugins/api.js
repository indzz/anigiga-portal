import {parseJwt} from "@/util/helper";

let refreshingToken = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error)
            prom.reject(error);
        else
            prom.resolve(token);
    });
    failedQueue = [];
};

export async function errInterceptor(err) {

    const originalReq = err.config;

    if (!err || !err.response)
        return Promise.reject(err)

    let statusCode = err.response.status

    // TODO: handle Unauthenticated
    if (statusCode === 401 && !originalReq._retry && originalReq.url !== 'login') {

        // Failed to refresh token
        if (originalReq.method === 'post' && originalReq.url === 'token') {
            // clear token
            this.$context.store.commit('clearToken')
            // return error
            return Promise.reject(err);
        }

        // Already refreshing, wait for a while
        if (refreshingToken) {
            return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
                .then(token => {
                    originalReq.headers['Authorization'] = 'Bearer ' + token;
                    return this.$axios(originalReq);
                })
                .catch(err => Promise.reject(err));
        }

        originalReq._retry = true;
        refreshingToken = true;

        // Retrieve new access token
        let access_token = this.$context.store.state.meta.accessToken;
        let refresh_token = this.$context.store.state.meta.refreshToken;

        if (!access_token || !refresh_token) {
            return Promise.reject(err);
        }

        const user = parseJwt(access_token);
        const user_id = user.sub;

        try {
            const refreshed = await this.$context.$memberApi.auth().refresh({refresh_token, user_id});

            // Store token
            this.$context.store.commit('setToken', { accessToken: refreshed.access_token, refreshToken: refreshed.refresh_token })

            originalReq.headers['Authorization'] = 'Bearer ' + refreshed.access_token;
            processQueue(null, refreshed.access_token);
            return this.$axios(originalReq);
        } catch (e) {
            processQueue(e, null);
        } finally {
            refreshingToken = false;
        }
    }

    return Promise.reject(err);
}



export default async (context) => {
    // context.app.$api
}
