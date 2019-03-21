import axios from '../api'
import {Cookie} from "../../assets/js/utils"; // 导入 api
const API_TOKEN = Cookie.get('slb_api_token');
/**
 * 获取城市列表
 */
export const City = () => axios('region/get_region', {
    p: 'wx',
})
/**
 * 文博资讯和相关公告, 大事件， 改扩建工程列表(已结)
 * param {p} 平台，w、wx
 * param {language} 1 表示汉语 2表示英语 3表示藏语
 * param {type} 1 表示文博资讯(已结) 2 表示相关公告(已结) 3 表示大事件(已结) 4 表示改扩建工程(已结) 5 表示政策法规(已结) 6 表示党政务公开(已结), 7 表示文物捐赠(已结)
 * param {num} 分页时表示从第几条开始取
 * param {take} 分页时该值表示每页多少条数据
 */

export const NewsList = (language = '1', type = '1', num = '0', take = '10') => axios('/news/news_list', {
    p: 'wx',
    language,
    type,
    skip: num * take, //从第几个开始
    take //取几条数据
});
// 是否可以提交申请

export const IsVolunteer = () => axios('region/is_volunteer', {
    p: 'wx',
    api_token:API_TOKEN,
});
// 获取志愿列表
export const Vlist = () => axios('region/volunteer_list', {
    p: 'wx',
});
// 申请志愿者
export const VolunteerInfoSubmit = (name, id_card, nation, degree, region_id, phone, address) => {
    let data = {
        p: 'wx',
        api_token:API_TOKEN,
        name,
        id_card,
        nation,
        degree,
        region_id,
        phone,
        address,
    };
    return axios('/region/volunteer_info_submit', data, 'POST');
};

// 获取时间表
export const ActiveTimeList = () => axios('/active_time_list', {
    p: 'wx',
});
// 获取活动列表
export const ActiveList = (api_token, cate_id = 1, active_date, page = 0, limit = 4) => axios('/active_list', {
    p: 'wx',
    api_token,
    cate_id,
    active_date,
    page,
    limit
});
// 获取活动列表
export const ActiveDetail = (api_token, active_id) => axios('/active_detail', {
    p: 'wx',
    api_token,
    active_id
});
// 活动报名
export const ActiveOrder = (api_token, active_id, contact_phone, toi_username, toi_cardtype_id = 1, toi_card_num, toi_unit, children_username, children_cardtype_id = 1, children_card_num) => {
    let data = {
        p: 'wx',
        api_token,
        active_id,
        contact_phone,
        toi_username,
        toi_cardtype_id,
        toi_card_num,
        toi_unit,
        children_username,
        children_cardtype_id,
        children_card_num
    }
    return axios('/active_order', data, 'POST');
};
// 报名记录
export const OrderLog = (api_token, page, limit) => axios('/order_log', {
    p: 'wx',
    api_token,
    page,
    limit
});
// 取消报名
export const Refund = (api_token, torder_id) => {
    let data = {
        p: 'wx',
        api_token,
        torder_id,
    }
    return axios('/active/refund', data, 'POST');
};
// 报名记录详情
export const ConfirmActiveOrder = (api_token, torder_id) => axios('/confirm_active_order', {
    p: 'wx',
    api_token,
    torder_id,
});
// 获取闯关问答
export const LearnContentInfo = (api_token) => axios('/learn_content_info', {
    p: 'wx',
    api_token,
});
// 获取调查问卷
export const QuestionList = (api_token) => axios('/question_list', {
    p: 'wx',
});
// 意见反馈
export const FeedbackSave = (api_token, phone, content) => {
    let data = {
        p: 'wx',
        api_token,
        phone,
        content
    }
    return axios('/feedback_save', data, 'POST');
}
