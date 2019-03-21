<template>
    <div class="record_box">
        <div class="no_record" v-if="sportList.length==0">
            <div class="no_img"><img src="~img/nodata.png" alt=""></div>
            <span>暂无预约记录</span>
        </div>
        <div class="sport_list" v-else>
            <ul v-if="sportList.length"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
                <li v-for="(item,index) in sportList">
                    <div class="sport_item" @click="go_detail(item.torder_id)">
                        <div class="sport_img"><img :src="baseUrl.substring(0,baseUrl.length - 5)+item.active_img" alt="">
                            <div :class="['sport_status',item.order_status==3?'status1':'',item.order_status==10?'status3':'',item.order_status==5||item.order_status==6||item.order_status==1||item.order_status==2||item.order_status==7||item.order_status==8||item.order_status==9?'status2':'']">
                                {{item.order_status_name}}
                            </div>
                        </div>
                        <div class="sport_r">
                            <div class="sport_name">{{item.active_name}}</div>
                            <div class="sport_info">
                                <span class="sport_place">集合地点：{{item.active_place}}</span>
                                <span>活动时间：{{item.active_date}} {{item.active_start_time}}-{{item.active_end_time}}</span>
                            </div>
                        </div>
                        <div class="iconfont iconxiangyou"></div>
                        <div class="cancel_btn" v-if="item.order_status==3" @click.stop="cancel_fun(item.torder_id)">
                            取消报名
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {baseUrl} from "../../config/url";
    import {MessageBox, Toast} from 'mint-ui';

    export default {
        name: "edu_record",
        data() {
            return {
                sportList: [],
                busy: false,
                counter: 1,
                take: 8,
                baseUrl: baseUrl,
            }
        },
        created() {
            this.get_OrderLog()
        },
        methods: {
            // 去详情
            go_detail(torder_id) {
                this.$router.push({path: '/play/edu_record_detail', query: {torder_id:torder_id,}})
            },
            // 获取列表
            get_OrderLog() {
                this.$api.OrderLog(
                    this.U.Cookie.get('slb_api_token'),
                    this.counter,
                    this.take,
                ).then(res => {
                    this.sportList = res.data
                    // console.log(res)
                })
            },
            // 加载更多
            loadMore() {
                this.busy = false;
                if (this.counter == 1) {
                    this.sportList = []
                }
                this.$api.OrderLog(
                    this.U.Cookie.get('slb_api_token'),
                    this.counter,
                    this.take,
                ).then((res) => {
                    if (res.status == 1) {
                        let arr = res.data;
                        if (res.data <= 0) {
                            this.more = true;
                            this.busy = false;
                        } else {
                            this.counter++;
                            this.sportList = this.sportList.concat(arr);
                        }
                    }
                })
            },
            // 取消活动
            cancel_fun(id) {
                MessageBox({
                    title: '提示',
                    message: '确定取消订单吗？',
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    confirmButtonClass: 'btn',
                    cancelButtonClass: 'btn_cancel'
                }).then(action => {
                    if (action == 'confirm') {
                        this.$api.Refund(
                            this.U.Cookie.get('slb_api_token'),
                            id,
                        ).then(res => {
                            if (res.data) {
                                Toast('取消成功！')
                            }
                            this.get_OrderLog()
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .no_record {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 15px;
        /*px*/
        color: #BDBDBD;
        .no_img {
            width: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 17px;
            img {
                width: 100%;
            }
        }
    }

    .sport_list {
        .sport_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            position: relative;
            border-bottom: 1px solid #C8C8C8;
            /*no*/
            .sport_img {
                width: 122px;
                height: 76px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 18px 0 0;
                position: relative;
                border-radius: 4px;
                /*no*/
                overflow: hidden;
                img {
                    width: 100%;
                }
                .time_tag {
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 2;
                    width: 33px;
                    padding: 3px 0;
                    text-align: center;
                    font-size: 10px;
                    /*px*/
                    color: #ffffff;
                    background-color: #FF5B40;
                }
            }
            .sport_r {
                display: flex;
                /*justify-content: space-between;*/
                flex-direction: column;
                flex: 1;
                height: 76px;
                .sport_name {
                    font-weight: bold;
                    width: 189px;
                    font-size: 15px;
                    /*px*/
                    @include ellipsis(1);
                    margin-bottom: 15px;
                }
                .sport_info {
                    width: 100%;
                    span {
                        display: block;
                        margin: 0 0 10px 0;
                        font-size: 12px;
                        /*px*/
                    }
                    .sport_place {
                        width: 189px;
                        @include ellipsis(1)
                    }
                }
            }
            .iconxiangyou {
                font-size: 18px;
                color: #C8C8C8;
            }
            .sport_status {
                position: absolute;
                left: 0;
                top: 0;
                /*width: 70px;*/
                color: #fff;
                font-size: 12px;
                padding: 3px 15px 3px 7px;
            }
            .status1 {
                background: linear-gradient(to right, #EBC550, rgba(235, 197, 80, 1), rgba(235, 197, 80, .9), rgba(235, 197, 80, .1)); /* 标准的语法 */
            }
            .status2 {
                background: linear-gradient(to right, #FF5B40, #FF5B40, rgba(255, 91, 64, .9), rgba(255, 91, 64, .1)); /* 标准的语法 */
            }
            .status3 {
                background: linear-gradient(to right, #C8C8C8, #C8C8C8, rgba(200, 200, 200, .9), rgba(200, 200, 200, .1)); /* 标准的语法 */
            }
            &:active {
                background-color: #f5f5f5;
            }
            .cancel_btn {
                position: absolute;
                bottom: 5px;
                right: 15px;
                width: 60px;
                border: 1px solid $main-color;
                /*no*/
                color: #DB9864;
                font-size: 12px;
                /*px*/
                text-align: center;
                padding: 3px 0;
            }
        }
    }
</style>
