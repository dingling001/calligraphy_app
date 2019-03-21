import {
  baseUrl
} from '@/config/url.js'

/**
 * 默认配置
 */
export default {
  // 基础url前缀
  baseURL: baseUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json'
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  // 
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
}
