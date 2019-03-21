import axios from '../api' // 倒入 api

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

/**
 //  * 提交预约
 //  * param {p} 平台，w、wx
 //  */
// export const AppointmentSubmit = (date, phone, list = []) => {
//     let json = {
//         p: 'wx',
//         date,
//         phone,
//         list
//     }
//     return axios('/ticket/submit_yuyue', json, 'POST');
// };

/**
 * 闭关日期列表
 * param {p} 平台，w、wx
 *
 *"data": {
 *  "per_week_close_date": "5",
 *  "close_date_list": [
 *      "2018-11-09"
 *  ]
 *}
 */
// export const CloseDate = (language = '1', activity_id) => axios('/ticket/close_date', {
//     p: 'wx',
// });
// 展厅列表
export const Exhibition = () => axios('/exhibition/exhibition_list', {
    p: 'wx',
});
// 展厅详情
export const ExhibitionDetail = (exhibition_id) => axios('/exhibition/exhibition_detail', {
    p: 'wx',
    exhibition_id
});
// 展厅展品列表

export const Exhibits = (exhibition_id) => axios('/exhibition/exhibit_list_exhibition_id', {
    p: 'wx',
    exhibition_id
});
// 获取展品详情
export const AudioDetail = (exhibit_id) => axios('/exhibition/exhibit_detail', {
    p: 'wx',
    exhibit_id
});
// 获取地图列表
export const MapInfo = (floor_id = '1') => axios('/map_list', {
    p: 'wx',
    floor_id
});
// 获取楼层下的展厅列表
export const MapFloor = (map_id = '1') => axios('/exhibition/exhibitions_on_map', {
    p: 'wx',
    map_id
});
// 获取展厅展品位地图
export const KasOnMap = (exhibition_id) => axios('/exhibition/kas_on_map', {
    p: 'wx',
    exhibition_id
});

// 善博珍宝
export const Exhibition3DList = () => axios('/exhibition/exhibit_3d_list', {
    p: 'wx',
});
// 文创列表
export const WenChuang = () => axios('/wenchuang/wenchuang_list', {
    p: 'wx',
});
// 文创详情
export const WenchuangDetail = (wenchuang_id) => axios('/wenchuang/wenchuang_detail', {
    p: 'wx',
    wenchuang_id
});
