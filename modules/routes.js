import cloneDeep from "lodash/cloneDeep"

const autoRoutes = function (routes) {
    const extras = [];

    routes.forEach((r, k) => {
        if (typeof r.children !== 'undefined') {
            r.children = autoRoutes(r.children);
        }

        if (r.path.substr(-4) === 'form') {
            const edit = cloneDeep(r);
            edit.name = edit.name.replace(/_form/, '_edit');
            edit.path = edit.path.replace(/form$/, ':id');
            extras.push(edit);

            r.name = r.name.replace(/_form$/, '_create');
            r.path = r.path.replace(/form$/, 'create');
        }
    });

    extras.forEach(route => routes.push(route));

    return routes;
};

export default function myModule (options) {
    this.nuxt.hook('build:extendRoutes', (routes) => {
        //console.log('build:extendRoutes', autoRoutes(routes));
        routes = autoRoutes(routes);
    });
}
