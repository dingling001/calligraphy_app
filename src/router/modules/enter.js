export default [{
  path: '/enter',
  name: 'enter',
  redirect: '/enter/brief',
  meta: {
    title: '走进善博'
  },
  component: resolve => require(['@/views/enter/index.vue'], resolve),
  children: [{
      path: 'brief',
      name: 'brief',
      component: resolve => require(['@/views/enter/brief.vue'], resolve),
      meta: {
        title: '场馆概况'
      }
    },
    {
      path: 'news',
      name: 'news',
      component: resolve => require(['@/views/enter/news.vue'], resolve),
      meta: {
        title: '最新资讯',
        keepAlive: false
      }
    },
    {
      path: 'news_detail/:id',
      name: 'news_detail',
      component: resolve => require(['@/views/enter/news_detail.vue'], resolve),
      meta: {
        title: '详情',
        keepAlive: false
      }
    },
    {
      path: 'guide',
      name: 'guide',
      component: resolve => require(['@/views/enter/guide.vue'], resolve),
      meta: {
        title: '参观指南',
        keepAlive: false
      }
    },
    {
      path: 'tickets_apply',
      name: 'tickets_apply',
      component: resolve => require(['@/views/enter/tickets_apply.vue'], resolve),
      meta: {
        title: '票务预约'
      }
    },
    {
      path: 'fill_info',
      name: 'fill_info',
      component: resolve => require(['@/views/enter/fill_info.vue'], resolve),
      meta: {
        title: '票务预约'
      }
    },
    {
      path: 'success',
      name: 'success',
      component: resolve => require(['@/views/enter/success.vue'], resolve),
      meta: {
        title: '票务预约'
      }
    },
    {
      path: 'order_detail/:id',
      name: 'order_detail',
      component: resolve => require(['@/views/enter/order_detail.vue'], resolve),
      meta: {
        title: '票务预约'
      }
    },
  ]
}]
