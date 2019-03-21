
export default [
    // 默认页
    {
        path: '/',
        redirect: '/index',
    },

    // 菜单页
    {
        path: '/index',
        name: 'index',
        component: () =>
            import('@/views/menu'),
        meta: {
            title: '首页-嘉善博物馆'
        }
    },
    // 404
    {
        path: '*',
        name: '404',
        component: resolve => require(['@/components/404'], resolve),
        meta: {
            title: '404'
        }
    },
]
