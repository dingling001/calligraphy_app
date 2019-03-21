<template>
    <div class="d_box">
        <div class="d_img"><img :src="baseUrl.substring(0,baseUrl.length - 5)+order_detail.active_img" alt=""></div>
        <div class="d_info">
            <div class="d_name">{{order_detail.active_name}}</div>
            <div class="d_address">集合地点：{{order_detail.active_place}}</div>
            <div class="d_address">活动时间：{{order_detail.active_date}}</div>
        </div>
        <div class="d_person ">
            <div class="d_parent">
                <div v-if="order_detail.is_type==1">报名人姓名：{{order_detail.person.toi_username}}</div>
                <div v-else>家长姓名：</div>
                <div>证件类型：{{order_detail.person.card_type}}</div>
                <div>证件号码：{{order_detail.person.toi_card_num}}</div>
                <div>单位名称：{{order_detail.person.toi_unit}}</div>
            </div>
            <div class="d_parent margin0" v-if="order_detail.is_type==2">
                <div>儿童姓名：{{order_detail.person.children_card_type}}</div>
                <div>证件类型：{{order_detail.person.card_type}}</div>
                <div>证件号码：{{order_detail.person.children_card_num}}</div>
            </div>
        </div>
        <div class="d_phone">手机号码： {{order_detail.order_info.contact_phone}}</div>
        <div :class="['d_cancel click_effect',order_detail.order_info.order_status==3?'active_btn':'' ]"
             @click="cancel_order" v-if="order_detail.order_info.order_status==3&&order_detail.order_info.can_refund">
            {{order_detail.order_info.order_status_name}}
        </div>
        <div class="cancel_mold" v-if="cancel_show">
            <div class="cancel_item">
                <div class="cancel_title">提示</div>
                <div class="cancel_t">确定取消订单吗？</div>
                <div class="btn_box">
                    <span class="click_effect" @click="cancel_show=false">取消</span>
                    <span class="click_effect" @click="confirm_fun">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {baseUrl} from "../../config/url";

    export default {
        name: "record_detail",
        data() {
            return {
                cancel_show: false,
                torder_id: '',
                order_detail: {
                    order_info: {},
                    person: {}
                },
                baseUrl: baseUrl
            }
        },
        created() {
            this.torder_id = this.$route.query.torder_id;
            this.get_ConfirmActiveOrder()
        },
        methods: {
            // 订单详情
            get_ConfirmActiveOrder() {
                this.$api.ConfirmActiveOrder(
                    this.U.Cookie.get('slb_api_token'),
                    this.torder_id,
                ).then(res => {
                    this.order_detail = res.data
                })
            },
            cancel_order() {
                if (this.order_detail.order_info.order_status == 3&&this.order_detail.order_info.can_refund) {
                    this.cancel_show = true;
                } else {
                    // Toast(this.order_detail.order_info.order_status_name)
                }

            },
            confirm_fun() {
                this.cancel_show = false;
                this.$api.Refund(
                    this.U.Cookie.get('slb_api_token'),
                    this.order_detail.order_info.torder_id,
                ).then(res => {
                    if (res.data) {
                        Toast('取消成功！')
                    }
                    this.get_ConfirmActiveOrder()
                })
                Toast('取消成功')
            }
        }
    }
</script>

<style scoped lang="scss">
    .d_box {
        background-color: #F3F5F9;
        min-height: 100vh;
        padding: 0 0 60px 0;
        .d_img {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 15px;
            img {
                width: 100%;
            }
        }
        .d_info {
            padding: 15px 0 15px 15px;
            margin: 10px 0;
            background-color: #fff;
            font-size: 15px;
            /*px*/
            .d_name {
                font-weight: bold;
                padding: 15px 0;
            }
            .d_address {
                padding: 0 0 10px 0;
                color: #576882;
                line-height: 25px;
            }
        }
        .d_person {
            background-color: #fff;
            padding: 13px;
            margin-bottom: 10px;
            .d_parent {
                background-color: #DFF9FF;
                font-size: 13px;
                /*px*/
                border: 1px solid rgba(61, 104, 148, .23);
                /*no*/
                border-radius: 3px;
                padding: 13px;
                margin-bottom: 10px;
                div {
                    padding: 0 0 15px 0;
                    &:last-child {
                        padding: 0;
                    }
                }

            }
        }
        .d_phone {
            padding: 15px;
            background-color: #fff;
            font-size: 15px;
            /*px*/
        }
        .d_cancel {
            position: fixed;
            width: 83%;
            bottom: 10px;
            left: 0;
            right: 0;
            margin: 0 auto;
            padding: 15px 0;
            color: #fff;
            text-align: center;
            border-radius: 18px;
            background-color: #ccc;
            font-size: 12px;
            /*px*/
        }
        .active_btn {
            background-color: $main-color;
        }
        .cancel_mold {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            padding: 200px 0 0 0;
            background-color: rgba(0, 0, 0, .5);
            .cancel_item {
                border-radius: 3px;
                margin: 0 15px;
                background-color: #fff;
                padding: 20px 17px;
                text-align: center;
                .cancel_title {
                    font-size: 18px;
                    /*px*/
                    font-weight: bold;
                }
                .cancel_t {
                    padding: 20px 0 40px 0;
                    font-size: 13px;
                    /*px*/
                }
                .btn_box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    span {
                        padding: 12px 62px;
                        background-color: $main-color;
                        color: #fff;
                        font-size: 12px;
                        /*px*/
                        border-radius: 18px;
                    }
                }
            }
        }
    }
</style>
