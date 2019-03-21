import Vue from 'vue'
import Router from 'vue-router'
import RouterCommon from './common' // 引入通用模块
import RouterModule from './modules' // 引入业务逻辑模块
import {Cookie} from "../assets/js/utils";

// console.log(Utils);
Vue.use(Router)

const router = new Router({
    routes: [
        ...RouterCommon,
        ...RouterModule,
    ]
})

const cancelLastReq = (next) => {
    let axiosPromiseArr = window.__axiosPromiseArr || [];
    if (!!axiosPromiseArr && axiosPromiseArr.length) {
        // console.log(axiosPromiseArr)
        let len = axiosPromiseArr.length;
        while (len--) {
            axiosPromiseArr[len].cancel('cancel');
            axiosPromiseArr.splice(len, 1);
        }
    }
    next();
}
router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    // if (Cookie.get('slb_api_token') == 'undefined' || Cookie.get('slb_api_token') == null || Cookie.get('slb_api_token') == '' || Cookie.get('slb_api_token') == undefined) {
    //     window.location.href = 'http://jiashan.museum-edu.cn/wx_oauth'
    // } else {
    //     cancelLastReq(next);
    //     console.log(Cookie.get('slb_api_token'))
    // }
    Cookie.set('slb_api_token', '98b3b6c5c2fe27491db168b50ecf16a9')
    cancelLastReq(next);
})

router.afterEach((to, from) => {
    // 在即将进入新的页面组件前，关闭掉进度条
})

export default router
