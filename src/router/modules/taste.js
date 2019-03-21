export default [
    {
        path: '/taste',
        name: 'taste',
        redirect: '/taste/diplay',
        meta: {
            title: '品味善博'
        },
        component: resolve => require(['@/views/taste/index.vue'], resolve),
        children: [
            {
                path: 'display',
                name: 'display',
                component: resolve => require(['@/views/taste/display.vue'], resolve),
                meta: {
                    title: '陈列展览'
                }
            },
            {
                path: 'd_detail',
                name: 'd_detail',
                component: resolve => require(['@/views/taste/d_detail.vue'], resolve),
                meta: {
                    title: '详情'
                }
            },
            {
                path: 'exhibits',
                name: 'exhibits',
                component: resolve => require(['@/views/taste/exhibits.vue'], resolve),
                meta: {
                    title: '展品列表'
                }
            },
            {
                path: 'voice_detail',
                name: 'voice_detail',
                component: resolve => require(['@/views/taste/voice_detail.vue'], resolve),
                meta: {
                    title: '展品详情'
                }
            },
            {
                path: 'map_index',
                name: 'map_index',
                component: resolve => require(['@/views/taste/map_index.vue'], resolve),
                meta: {
                    title: '地图导览'
                }
            },
            {
                path: 'map_ex',
                name: 'map_ex',
                component: resolve => require(['@/views/taste/map_ex.vue'], resolve),
                meta: {
                    title: '展厅导览'
                }
            },
            {
                path: 'treasure',
                name: 'treasure',
                component: resolve => require(['@/views/taste/treasure.vue'], resolve),
                meta: {
                    title: '善博珍宝'
                }
            },
            {
                path: 'creative',
                name: 'creative',
                component: resolve => require(['@/views/taste/creative.vue'], resolve),
                meta: {
                    title: '文创产品'
                }
            },
            {
                path: 'creative_d',
                name: 'creative_d',
                component: resolve => require(['@/views/taste/creative_d.vue'], resolve),
                meta: {
                    title: '文创详情'
                }
            },
        ]
    }]
