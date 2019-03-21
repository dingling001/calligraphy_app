<template>
    <div class="r_box">
        <div class="r_img"><img src="~img/bg.png" alt="">
            <div class="r_success">
                <div class="icon_box">
                    <img src="~img/succee.png" alt="">
                    <!--<div class="iconfont iconchenggong"></div>-->
                </div>
                <div>{{order_text}}</div>
            </div>
        </div>
        <div class="r_info">
            <div class="r_title"><span class="iconfont icongantanhao"></span><span>特别说明</span></div>
            <div class="r_content">
                如遇大型活动或特展，需对参观办法进行临时调整，嘉
                善县博物馆将提前通过嘉善县博物馆官方网站、微信公
                众号向社会公示。
            </div>
        </div>
        <div class="btn_box">
            <span class="click_effect" @click="look_orders">查看订单</span>
            <span class="click_effect">继续报名</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edu_result",
        data() {
            return {
                order_status: '',
                order_text: ""
            }
        },
        created() {
            // 订单状态，1待审核，2待付款，3报名成功，5已取消，6已退款 （5,6合并一个，就叫已取消） 7 审核未通过 8人员不足已取消 9未付款已取消
            this.order_status = this.$route.query.order_status;
            switch (this.order_status) {
                case 1:
                    this.order_text = '待审核';
                    break;
                case 2:
                    this.order_text = '待付款';
                    break;
                case 3:
                    this.order_text = '报名成功';
                    break;
                case 5:
                case 6:
                    this.order_text = '已取消';
                    break;
                case 7:
                    this.order_text = '审核未通过';
                    break;
                case 8:
                    this.order_text = '人员不足已取消';
                    break;
                case 9:
                    this.order_text = '未付款已取消';
                    break;
                default:
                    this.order_text = '出错啦'
            }
        },
        methods: {
            look_orders() {
                this.$router.push({path: '/play/edu_record'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .r_box {
        min-height: 100vh;
        background-color: #F3F5F9;
        .r_img {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            img {
                width: 100%;
            }
            .r_success {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 20px 0 0 0;
                font-size: 18px;
                /*px*/
                font-weight: bold;
                color: #fff;
                .icon_box {
                    /*background-color: #F9F4E8;*/
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    img {
                        width: 100%;
                    }
                    .iconchenggong {
                        font-size: 40px;
                        /*px*/
                        color: #F9C754;
                    }
                }
            }
        }
        .r_info {
            position: relative;
            margin: -60px 12px 0 12px;
            background-color: #fff;
            padding: 0 17px;
            border-radius: 3px;
            /*no*/
            box-shadow: 0px 3px 5px 0px rgba(210, 213, 214, 0.56);
            .r_title {
                font-size: 15px;
                /*px*/
                color: #D08552;
                background-color: #fff;
                padding: 20px 0;
                .icongantanhao {
                    margin-right: 20px;
                }
            }
            .r_content {
                line-height: 24px;
                font-size: 13px;
                /*px*/
                padding: 0 0 20px 0;
            }
        }
        .btn_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 40px 15px;
            span {
                width: 162px;
                text-align: center;
                padding: 15px;
                color: #fff;
                background-color: $main-color;
                border-radius: 18px;
            }
        }
    }
</style>
