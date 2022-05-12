import LayoutDefault from '@/components/LayoutDefault';

export default [
    {
        path: '/',
        component: LayoutDefault,
        meta: {
            auth: true,
            title: 'home',
            group: 'apps',
            icon: '',
        },
        redirect: '/users-list',
        children: [
            {
                path: '/users-list',
                name: 'users-list',
                icon: 'mdi-account-multiple',
                isShow: true,
                meta: {
                    title: 'Users List',
                },
                component: () => import('@/views/questionnaire/UsersList.vue'),
            },
            {
                path: '/user-profile-list',
                name: 'user-profile-list',
                icon: 'mdi-account',
                isShow: true,
                meta: {
                    title: 'User Profile',
                },
                component: () => import('@/views/profile/UserProfileList.vue'),
            },
            {
                path: '/user-profile/:id',
                name: 'user-profile',
                isShow: false,
                meta: {
                    title: 'User Profile',
                },
                props(route) {
                    const props = {...route.params};

                    props.id = +props.id;
                    return props;
                },
                component: () => import('@/views/profile/UserProfile.vue'),
            },
        ],
    },
];
