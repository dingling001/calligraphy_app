export default [
    {
        path: '/play',
        name: 'play',
        redirect: '/play/edu_sport',
        meta: {
            title: '玩转善博'
        },
        component: resolve => require(['@/views/play/index.vue'], resolve),
        children: [
            {
                path: 'edu_sport',
                name: 'edu_sport',
                component: resolve => require(['@/views/play/edu_sport.vue'], resolve),
                meta: {
                    title: '教育活动'
                }
            },
            {
                path: 'edu_record',
                name: 'edu_record',
                component: resolve => require(['@/views/play/edu_record.vue'], resolve),
                meta: {
                    title: '报名记录'
                }
            },
            {
                path: 'edu_detail',
                name: 'edu_detail',
                component: resolve => require(['@/views/play/edu_detail.vue'], resolve),
                meta: {
                    title: '报名记录'
                }
            },
            {
                path: 'edu_record_detail',
                name: 'edu_record_detail',
                component: resolve => require(['@/views/play/edu_record_detail.vue'], resolve),
                meta: {
                    title: '报名详情'
                }
            },
            {
                path: 'edu_form',
                name: 'edu_form',
                component: resolve => require(['@/views/play/edu_form.vue'], resolve),
                meta: {
                    title: '信息填写'
                }
            },
            {
                path: 'edu_confirm',
                name: 'edu_confirm',
                component: resolve => require(['@/views/play/edu_confirm.vue'], resolve),
                meta: {
                    title: '确认信息'
                }
            },
            {
                path: 'edu_result',
                name: 'edu_result',
                component: resolve => require(['@/views/play/edu_result.vue'], resolve),
                meta: {
                    title: '预约结果'
                }
            },
            {
                path: 'game',
                name: 'game',
                component: resolve => require(['@/views/play/game.vue'], resolve),
                meta: {
                    title: '互动游戏'
                }
            },
            {
                path: 'study',
                name: 'study',
                component: resolve => require(['@/views/play/study.vue'], resolve),
                meta: {
                    title: '闯关问答'
                }
            },
            {
                path: 'question',
                name: 'question',
                component: resolve => require(['@/views/play/question.vue'], resolve),
                meta: {
                    title: '调查问卷'
                }
            },
            {
                path: 'q_list',
                name: 'q_list',
                component: resolve => require(['@/views/play/q_list.vue'], resolve),
                meta: {
                    title: '调查问卷'
                }
            },
            {
                path: 'feedback',
                name: 'feedback',
                component: resolve => require(['@/views/play/feedback.vue'], resolve),
                meta: {
                    title: '反馈结果'
                }
            },
            {
                path: 'vol_index',
                name: 'vol_index',
                component: resolve => require(['@/views/play/vol_index.vue'], resolve),
                meta: {
                    title: '善博志愿'
                }
            },
            {
                path: 'vol_form',
                name: 'vol_form',
                component: resolve => require(['@/views/play/vol_form.vue'], resolve),
                meta: {
                    title: '信息填写'
                }
            },
            {
                path: 'vol_success',
                name: 'vol_success',
                component: resolve => require(['@/views/play/vol_success.vue'], resolve),
                meta: {
                    title: '申请成功'
                }
            },
            {
                path: 'vol_list',
                name: 'vol_list',
                component: resolve => require(['@/views/play/vol_list.vue'], resolve),
                meta: {
                    title: '善博之友'
                }
            },

        ]
    }]
