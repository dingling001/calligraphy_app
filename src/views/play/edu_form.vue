<template>
    <div class="appoint_box">
        <div class="a_info">
            <div class="a_name">{{active_info.active_name}}</div>
            <div class="a_address">集合地点：{{active_info.active_place}}</div>
            <div class="a_address">活动时间：{{active_info.active_date}}</div>
            <div class="a_address" v-if="is_type==1">名 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额：{{active_info.count_num}}人</div>
            <div class="a_address" v-else>名 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额：{{active_info.count_num}}组家庭（1大1小）</div>
            <div class="a_address" v-if="is_type==1">
                面向人群：{{active_info.adult_age_limit_min}}—{{active_info.adult_age_limit_max}}岁
            </div>
            <div class="a_address" v-else>
                面向人群：{{active_info.children_age_limit_min}}—{{active_info.children_age_limit_max}}岁
            </div>

        </div>
        <div class="a_parent">
            <div class="a_input">
                <span class="span" v-if="is_type==1"><span class="a_require">*</span>报名人姓名：</span>
                <span class="span" v-else><span class="a_require">*</span>家长姓名：</span>
                <input type="text" placeholder="请输入姓名（必填）" class="input" v-model="user_name">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 证件类型：</span>
                <span class="input">身份证</span>
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 证件号码：</span>
                <input type="text" placeholder="请输入证件号码（必填）" class="input" v-model="id_num">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require" style="color: #fff">*</span> 单位名称：</span>
                <input type="text" placeholder="请输入工作单位" class="input" v-model="unit_name">
            </div>
        </div>
        <div class="a_parent" v-if="is_type==2">
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 儿童姓名：</span>
                <input type="text" placeholder="请输入儿童姓名（必填）" class="input" v-model="child_user_name">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 证件类型：</span>
                <span class="input">身份证</span>
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 证件号码：</span>
                <input type="text" placeholder="请输入儿童证件号码（必填）" class="input" v-model="child_id_num">
            </div>
        </div>
        <div class="a_parent">
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 手机号码：</span>
                <input type="text" placeholder="请输入手机号码（必填）" class="input" v-model="user_phone">
            </div>
        </div>
        <div class="next_step click_effect" @click="go_next">下一步</div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "edu_form",
        data() {
            return {
                is_type: 1,
                active_id: '',
                active_info: JSON.parse(localStorage.getItem('active_info')) || {},
                user_name: '',
                id_num: '',
                unit_name: '',
                child_user_name: '',
                child_id_num: '',
                user_phone: '',
            }
        },
        created() {
            this.is_type = this.$route.query.is_type;
            this.active_id = this.$route.query.active_id;
            if (localStorage.getItem('user_form')) {
                let user_form = JSON.parse(localStorage.getItem('user_form'))
                this.user_name = user_form.user_name;
                this.id_num = user_form.id_num;
                this.unit_name = user_form.unit_name;
                this.child_user_name = user_form.child_user_name;
                this.child_id_num = user_form.child_id_num;
                this.user_phone = user_form.user_phone;
            }

        },
        methods: {
            // 下一步
            go_next() {
                var id_num = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                var user_phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                if (this.user_name == '') {
                    Toast('请输入姓名')
                } else if (!id_num.test(this.id_num)) {
                    Toast('请输入正确的身份证号码')
                } else if (!user_phone.test(this.user_phone)) {
                    Toast('请输入正确的手机号码')
                } else if (this.is_type == 2) {
                    if (this.child_user_name == '') {
                        Toast('请输入儿童姓名')
                    }
                    else if (!id_num(this.child_id_num)) {
                        Toast('请输入正确的儿童证件号码')
                    }
                }
                else {
                    this.$router.push({
                        path: '/play/edu_confirm', query: {
                            active_id: this.active_id,
                            is_type: this.is_type
                        }
                    })
                    localStorage.setItem('user_form', JSON.stringify({
                        user_name: this.user_name,
                        id_num: this.id_num,
                        unit_name: this.unit_name,
                        child_user_name: this.child_user_name,
                        child_id_num: this.child_id_num,
                        user_phone: this.user_phone
                    }))
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .appoint_box {
        background-color: #F3F5F9;
        min-height: 100vh;
        padding: 0 0 30px 0;
        .a_info {
            background-color: #fff;
            padding: 0 13px;
            margin-bottom: 10px;
            .a_name {
                font-size: 18px;
                /*px*/
                color: #645957;
                font-weight: bold;
                padding: 16px 0;
            }
            .a_address {
                padding: 10px 0;
                line-height: 24px;
                border-top: 1px solid #C8C8C8;
                font-size: 15px;
                /*px*/
                color: #576882;
            }
        }
        .a_parent {
            background-color: #fff;
            padding: 0 15px;
            margin-bottom: 10px;
            .a_input {
                /*display: flex;*/
                /*align-items: center;*/
                overflow: hidden;
                border-bottom: 1px solid #C8C8C8;
                font-size: 15px;
                /*px*/
                .span {
                    /*flex: 1;*/
                    float: left;
                    width: 34%;
                    display: flex;
                    align-items: center;
                    padding: 16px 0;
                }
                .input {
                    /*flex: 2;*/
                    float: left;
                    width: 66%;
                    padding: 16px 0;
                    border: 0;
                    /*margin: 0 0 0 20px;*/
                }
                .a_require {
                    color: #F63F3F;
                }
                &:last-child {
                    border: 0;
                }
            }
        }
        .next_step {
            margin: 20px;
            background-color: $main-color;
            color: #fff;
            padding: 13px 0;
            text-align: center;
            border-radius: 18px;
        }
    }
</style>
