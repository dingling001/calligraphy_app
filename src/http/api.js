import axios from 'axios' // 注意先安装哦
import qs from 'qs' // 序列化请求数据，视服务端的要求
import config from './config.js' // 导入入默认配置
import { Toast } from 'mint-ui';

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//配置全局取消数组
window.__axiosPromiseArr = [];

const instance = axios.create(config);

instance.interceptors.request.use(function(config) {
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(function(response) {
  if (response.data.status == 1 || response.data.status == 0 || response.data.status == 405 || response.data.status == 99) {
    return response.data;
  } else {
    console.log('获取数据失败');
  }
}, function(error) {
  return Promise.reject(error);
});


export default (url = '', data = {}, type = 'GET') => {
  let options = {
    url,
    cancelToken: new CancelToken(c => {
      cancel = c
      window.__axiosPromiseArr.push({ cancel }) //放入一个全局数组，以便之后在router中统一取消
    })
  }
  type = type.toUpperCase();
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      options = Object.assign(options, {
        method: 'get',
        params: data,
      })
    } else if (type === 'POST') {
      options = Object.assign(options, {
        method: 'post',
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json'
        }
      })
    }
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch((err) => {
        Toast({
          message: '网络异常',
          iconClass: 'iconfont iconchacha',
          position: 'center',
          duration: 3000
        });
        console.log('网络异常');
      })
  })
}
