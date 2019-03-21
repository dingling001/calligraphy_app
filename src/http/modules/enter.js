import axios from '../api' // 导入 api
import { Cookie } from "../../assets/js/utils.js";

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 博物馆简介 、指南
export const MuseumInfo = (type = '1') => axios('/museuminfo/info_detail', {
  p: 'wx',
  type,
});
// 最新资讯
export const News = (page_count = 5, skip = 0) => axios('/news/news_list', {
  p: 'wx',
  page_count,
  skip
})
// 最新资讯详情
export const NewsDetail = (news_id) => axios('/news/news_detail', {
  p: 'wx',
  news_id,
})
//门票首页信息
export const Ticket = () => axios('/ticket', {
  p: 'wx',
})

//预约日历
export const TicketCalendar = () => axios('/ticket/calendar', {
  p: 'wx',
  ticket_id: 1
})

//门票详情（目前仅一种门票）
export const TicketDetail = () => axios('/ticket/details', {
  p: 'wx',
  ticket_id: 1
})

/**
 * 预约散客门票
 * param {p} 平台，w、wx
 * param {ticket_id} 门票id
 * param {td_id} 日期id
 * param {contact_phone} 联系电话
 * param {toi_username} [array]  姓名
 * param {toi_cardtype_id} [array]  证件id
 * param {toi_card_num} [array]  证件号码
 */
export const TicketSubmit = (ticket_id, td_id, contact_phone, toi_username = [], toi_cardtype_id = [], toi_card_num = []) => {
  let data = {
    p: 'wx',
    api_token: Cookie.get('slb_api_token') || '',
    ticket_id,
    td_id,
    contact_phone,
    toi_username,
    toi_cardtype_id,
    toi_card_num
  }
  return axios('/ticket/order', data, 'POST');
}


/**
 * 散客预约记录
 * param {p} 平台，wx
 * param {limit}  数据数量
 * param {pgnum}  页码
 */
//  散客预约记录
export const OrderList = (limit, pgnum) => axios('/ticket/order_log', {
  p: 'wx',
  api_token: Cookie.get('slb_api_token') || '',
  offset: limit * pgnum,
  limit
})


// 散客订单详情
export const OrderDetail = (torder_id) => axios('/ticket/order_detail', {
  p: 'wx',
  api_token: Cookie.get('slb_api_token') || '',
  torder_id,
});

// 散客订单退票
/**
 * param {titem_ids}  门票条目id，多个id用英文逗号分隔
 */
export const OrderRefund = (titem_ids = []) => axios('/ticket/refund', {
  p: 'wx',
  api_token: Cookie.get('slb_api_token') || '',
  titem_ids
}, 'POST');
