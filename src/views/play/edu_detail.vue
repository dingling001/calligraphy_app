<template>
    <div class="detail_box">
        <div class="d_img"><img :src="a_info.active_img" alt=""></div>
        <div class="d_name">{{a_info.active_name}}</div>
        <div class="d_address ">集合地点：{{a_info.active_place}}</div>
        <div class="d_address">活动时间：{{a_info.active_date}}</div>
        <div v-if="a_info.is_type==1">
            <div class="d_address "> 名额：{{a_info.count_num}}人<span>(已报名{{a_info.order_count_num}}人)</span></div>
            <div class="d_address">面向人群：{{a_info.adult_age_limit_min}}—{{a_info.adult_age_limit_max}}岁</div>
        </div>
        <div v-else>
            <div class="d_address "> 名额：15组家庭（1大1小）<span>(已报名{{a_info.order_count_num}}组)</span></div>
            <div class="d_address">面向人群：{{a_info.children_age_limit_min}}—{{a_info.children_age_limit_max}}岁</div>
        </div>
        <div class="d_content" v-html="a_info.info">
        </div>
        <div class="d_tips"> 温馨提示：{{a_info.wxts}}</div>
        <div :class="['d_btn','click_effect',a_info.active_status==1?'':'gray_end' ]"
             @click="edu_appoint(a_info.active_status)">{{a_info.active_status_show}}
        </div>
        <div class="d_mold" v-if="agg_show==1">
            <div class="d_info">
                <div class="d_title">报名须知</div>
                <div class="d_info_content" v-html="a_info.remark">
                </div>
                <div class="iconfont iconguanbi" @click="$router.back()"></div>
            </div>
            <div class="d_mold_btn click_effect" @click="argee_fun">确定并继续</div>
        </div>
        <div class="d_mold" v-if="show_tip">
            <div class="d_info">
                <div class="d_title">提示</div>
                <div class="d_info_content">每个微信号每月最多预约4场公益活动。您已超出本月报名次数，欢迎下月进行课程报名！</div>
                <div class="d_mold_btn click_effect" @click="show_tip=false" style="width: 100%">我知道了</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {baseUrl} from "../../config/url";
    import {Toast} from 'mint-ui'

    export default {
        name: "edu_detail",
        data() {
            return {
                agg_show: true,
                show_tip: false,
                active_id: '',
                a_info: {
                    active_img: ''
                }
            }
        },
        created() {
            this.active_id = this.$route.query.active_id;
            this.get_ActiveDetail();
            this.agg_show = this.U.Cookie.get('agg_show') || 1
        },
        methods: {
            // 限制报名次数
            order_limit(){

            },
            // 同意协议
            argee_fun() {
                this.agg_show = 0;
                this.U.Cookie.set('agg_show', 0)
            },
            // 我要报名
            edu_appoint(active_status) {
                if (active_status == 1) {
                    this.$router.push({
                        path: '/play/edu_form', query: {
                            active_id: this.active_id,
                            is_type: this.a_info.is_type
                        }
                    })
                }
                else {
                    Toast(this.a_info.active_status_show)
                }
            },
            // 获取详情
            get_ActiveDetail() {
                this.$api.ActiveDetail(this.U.Cookie.get('slb_api_token'), this.active_id).then(res => {
                    // console.log(res)
                    this.a_info = res.data;
                    this.a_info.active_img = baseUrl.substring(0, baseUrl.length - 5) + this.a_info.active_img;
                    localStorage.setItem('active_info', JSON.stringify({
                        active_name: res.data.active_name,
                        active_date: res.data.active_date,
                        active_place: res.data.active_place,
                        count_num: res.data.count_num,
                        adult_age_limit_min: res.data.adult_age_limit_min,
                        adult_age_limit_max: res.data.adult_age_limit_max,
                        children_age_limit_min: res.data.children_age_limit_min,
                        children_age_limit_max: res.data.children_age_limit_max,
                    }))
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .detail_box {
        margin: 0 13px;
        padding: 0 0 100px 0;
        .d_img {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 100%;
            }
        }
        .d_name {
            color: #645957;
            font-size: 18px;
            /*px*/
            font-weight: bold;
            padding: 15px 0;
            border-bottom: 1px solid #C8C8C8;
            /*no*/
            margin-bottom: 30px;
        }
        .d_address {
            color: #576882;
            font-size: 14px;
            /*px*/
            padding-bottom: 20px;
            span {
                color: #FF0000;
                padding: 0 0 0 15px;
            }
        }
        .d_content {
            color: #323232;
            line-height: 24px;
            font-size: 14px;
            /*px*/
        }
        .d_tips {
            color: #E8453A;
            padding: 10px 0;
            line-height: 24px;
            font-size: 12px;
            /*px*/
        }
        .d_btn {
            padding: 13px 0;
            text-align: center;
            font-size: 12px;
            /*px*/
            background-color: $main-color;
            color: #fff;
            border-radius: 18px;
            position: fixed;
            left: 0;
            right: 0;
            z-index: 2;
            bottom: 20px;
            width: 89%;
            margin: 0 auto;
        }
        .gray_end {
            background-color: #ccc;
        }
        .d_mold {
            position: fixed;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 20;
            background-color: rgba(0, 0, 0, .5);
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 136px 0 0 0;
            .d_info {
                background-color: #fff;
                width: 83%;
                padding: 0 26px 20px 26px;
                margin-bottom: 34px;
                position: relative;
                border-radius: 2px;
                .d_title {
                    text-align: center;
                    font-size: 18px;
                    /*px*/
                    padding: 22px 0;
                }
                .d_info_content {
                    line-height: 24px;
                    font-size: 13px;
                    max-height: 254px;
                    overflow: scroll;
                }
                .iconguanbi {
                    position: absolute;
                    right: 17px;
                    top: 17px;
                    color: #D2D2D2;
                    font-size: 22px;
                    /*px*/
                }
            }
            .d_mold_btn {
                width: 83%;
                border-radius: 22px;
                text-align: center;
                padding: 15px 0;
                font-size: 16px;
                /*px*/
                color: #fff;
                background-color: $main-color;
                margin: 0 auto;
            }
        }
    }
</style>
