// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'
import '@/style/reset.scss'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueWechatTitle from 'vue-wechat-title'
import * as Utils from '@/assets/js/utils'

Vue.prototype.U = Utils;
Vue.use(MintUI)
Vue.use(VueWechatTitle)
//导入 http 文件夹下的 index.js
import api from './http'

Vue.use(api)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
