<template>
    <div class="d_box">
        <div class="d_info">
            <div class="d_name">{{active_name}}</div>
            <div class="d_address">集合地点：{{active_place}}</div>
            <div class="d_address">活动时间：{{active_date}}</div>
        </div>
        <div class="d_person ">
            <div class="d_parent">
                <div v-if="is_type==1">报名人姓名：{{user_name}}</div>
                <div v-else>家长姓名：{{user_name}}</div>
                <div>证件类型：身份证</div>
                <div>证件号码：{{id_num}}</div>
                <div>单位名称：{{unit_name?unit_name:'未填写'}}</div>
            </div>
            <div class="d_parent margin0" v-if="child_id_num&&child_user_name&&is_type==2">
                <div>儿童姓名：{{child_user_name}}</div>
                <div>证件类型：身份证</div>
                <div>证件号码：{{child_id_num}}</div>
            </div>
        </div>
        <div class="d_phone">手机号码：{{user_phone}}</div>
        <div class="d_btn">
            <div class="d_item">
                <span @click="$router.back()">上一步</span>
                <span @click="edu_confirm_fun">确认报名</span>
            </div>
        </div>
        <div class="d_mold" v-if="show_tip">
            <div class="d_info">
                <div class="d_title">报名已满</div>
                <div class="d_info_content"> 该活动已经报满，请选择其他活动进行报名！
                </div>
                <div class="d_mold_btn click_effect" @click="go_list" style="width: 100%">返回选择其他活动</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator, Toast} from 'mint-ui'

    export default {
        name: "edu_confirm",
        data() {
            return {
                active_id: '',
                is_type: 1,
                user_name: '',
                id_num: '',
                unit_name: '',
                child_user_name: '',
                child_id_num: '',
                user_phone: '',
                active_name: '',
                active_date: '',
                active_place: '',
                show_tip: false,
            }
        },
        created() {
            this.active_id = this.$route.query.active_id;
            this.is_type = this.$route.query.is_type;
            if (localStorage.getItem('user_form') && localStorage.getItem('active_info')) {
                let user_form = JSON.parse(localStorage.getItem('user_form'));
                let active_info = JSON.parse(localStorage.getItem('active_info'));
                this.user_name = user_form.user_name;
                this.id_num = user_form.id_num;
                this.unit_name = user_form.unit_name;
                this.child_user_name = user_form.child_user_name;
                this.child_id_num = user_form.child_id_num;
                this.user_phone = user_form.user_phone;
                // 活动信息
                this.active_name = active_info.active_name;
                this.active_date = active_info.active_date;
                this.active_place = active_info.active_place;
            }
        },
        methods: {
            edu_confirm_fun() {
                Indicator.open({
                    text: '提交信息...',
                    spinnerType: 'fading-circle'
                });
                this.$api.ActiveOrder(
                    this.U.Cookie.get('slb_api_token'),
                    this.active_id,
                    this.user_phone,
                    this.user_name,
                    1,
                    this.id_num,
                    this.unit_name,
                    this.child_user_name,
                    1,
                    this.child_id_num,
                ).then((res) => {
                    Indicator.close();
                    if (res.status == 1) {
                        this.$router.push({
                            path: '/play/edu_result',
                            query: {order_sn: res.order_sn, order_status: res.order_status}
                        })
                    } else if (res.status == 99) {
                        this.show_tip = true;
                    }
                    else {
                        Toast(res.msg);
                        setTimeout(() => {
                            this.$router.push({path: '/play/edu_sport'})
                        }, 1500)
                    }
                    localStorage.removeItem('user_form');
                    localStorage.removeItem('active_info')
                })
            },
            go_list() {
                this.show_tip = false;
                this.$router.push({path: '/play/edu_sport'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .d_box {
        background-color: #F3F5F9;
        min-height: 100vh;
        padding: 0 0 60px 0;
        .d_info {
            padding: 0 15px;
            margin: 0 0 10px 0;
            background-color: #fff;
            font-size: 15px;
            /*px*/
            .d_name {
                font-weight: bold;
                padding: 15px 0;
            }
            .d_address {
                padding: 13px 0;
                line-height: 24px;
                color: #576882;
                border-top: 1px solid #c8c8cd;
                /*no*/
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
        .d_btn {
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            padding: 22px;
            background-color: #fff;
            overflow: hidden;
            .d_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: $main-color;
                border-radius: 18px;
                padding: 15px 0;
                span {
                    flex: 1;
                    height: 15px;
                    text-align: center;
                    background-color: $main-color;
                    color: #fff;
                    border-left: 1px solid #fff;
                    /*no*/
                    font-size: 12px;
                    /*px*/
                    &:first-child {
                        border-radius: 18px 0 0 18px;
                        border: 0;
                    }
                }
            }

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
                    text-align: center;
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
                padding: 12px 0;
                font-size: 12px;
                /*px*/
                color: #fff;
                background-color: $main-color;
                margin: 0 auto;
            }
        }
    }
</style>
