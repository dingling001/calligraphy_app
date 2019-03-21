/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 */

let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
  // baseUrl = "http://lzgybwg.museum-edu.cn";
  baseUrl = "http://192.168.10.158:8899/api/";
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = '';
}
export {
  baseUrl,
}
