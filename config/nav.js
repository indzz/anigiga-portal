// Main Navigation Menu
// Reference: https://docs.indzz.dev/backend/install_client.html#%E5%8A%9F%E8%83%BD%E9%81%B8%E5%96%AE
export default [
    {
        label: 'Category',
        icon: 'mdi-rhombus-split',
        permission: ['collection_list'],
        to: {name: 'collection'},
    },
    {
        label: 'Event',
        icon: 'mdi-bullhorn',
        permission: ['campaign_list'],
        to: {name: 'campaign'},
    },
    {
        label: 'Member',
        icon: 'mdi-account-multiple',
        permission: ['member_list'],
        to: {name: 'member'},
    },
    {
        label: 'Administration',
        icon: 'mdi-shield-account',
        permission: ['staff_list', 'role_list'],
        children: [
            {
                label: 'user_list',
                permission: 'staff_list',
                to: {name: 'staff'},
            },
            {
                label: 'role_management',
                permission: 'role_list',
                to: {name: 'role'},
            },
        ]
    },
    {
        label: 'settings',
        icon: 'mdi-cog',
        permission: ['system_settings', 'staff_list', 'role_list'],
        children: [
            {
                label: 'system_config',
                permission: 'system_settings',
                to: {name: 'settings'},
            },
            // {
            //     type: 'divider',
            //     permission: 'system_settings',
            // },
            // {
            //     label: 'user_list',
            //     permission: 'staff_list',
            //     to: {name: 'staff'},
            // },
            // {
            //     label: 'role_management',
            //     permission: 'role_list',
            //     to: {name: 'role'},
            // },
        ]
    }
]
