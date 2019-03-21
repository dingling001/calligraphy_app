<template>
    <div class="edu_box" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
        <div class="sport_list">
            <div class="edu_title">
                <span>近期活动安排预览</span>
                <router-link class="edu_record" tag="span" to="/play/edu_record">报名记录 <span
                        class="iconfont iconxiangyou"></span></router-link>
            </div>
            <div class="edu_time">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in dataList" :key="item.active_date"
                                  :class="[i==index?'s_active':'',item.active_date==today_date?'today_active':'']"
                                  @click.native="tab_swiper(index)">
                        <span>{{item.active_date.split('-')[2]}}</span>
                        <span class="edu_day">{{item.week}}</span>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="titles">活动报名</div>
            <div class="other_title">教育活动介绍、教育活动预告、教育活动回顾。</div>
            <ul v-if="active_list.length"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="busy"
                infinite-scroll-distance="10"
            >
                <li v-for="(item,index) in active_list">
                    <div class="sport_item" @click="go_detail(item.active_id)">
                        <div class="sport_img"><img :src="baseUrl.substring(0,baseUrl.length - 5)+item.active_img"
                                                    alt=""><span class="time_tag">{{item.date_status}}</span>
                        </div>
                        <div class="sport_r">
                            <div class="sport_name">{{item.active_name}}</div>
                            <div class="sport_info" v-if="item.is_type==1">
                                <span>名额：{{item.count_num}}人</span>
                                <span>面向人群：{{item.adult_age_limit_min}}—{{item.adult_age_limit_max}}岁</span>
                            </div>
                            <div class="sport_info" v-else>
                                <span>名额：{{item.count_num}}组家庭（1大1小）</span>
                                <span>面向人群：{{item.children_age_limit_min}}—{{item.children_age_limit_max}}岁</span>
                            </div>
                        </div>
                        <div class="iconfont iconxiangyou"></div>
                        <div class="sport_status status1" v-if="item.active_status==1">报名中</div>
                        <div class="sport_status status3" v-else-if="item.active_status==2">报名已满</div>
                        <div class="sport_status status2" v-else-if="item.active_status==3">报名结束</div>
                        <div class="sport_status status4" v-else-if="item.active_status==4">未开始</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="nodata" v-if="more">没有了</div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import {Indicator} from 'mint-ui'
    import {baseUrl} from "../../config/url";

    export default {
        name: "edu_sport",
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    loop: false,
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeSticky: true,
                    spaceBetween: 12,
                    observer: true,
                    observerParents: true,
                },
                i: 0,
                today_date: '',
                dataList: [],
                active_list: [],
                take: 5,
                counter: 1,
                baseUrl: baseUrl,
                wrapperHeight: 0,
                more: false,
                busy: true,
            }
        },
        created() {
            this.get_ActiveTimeList();
        },
        methods: {
            // 切换日期
            tab_swiper(index) {
                this.i = index;
                this.counter = 1;
                this.get_ActiveList(this.dataList[index].active_date)
            },
            // 活动详情
            go_detail(id) {
                this.$router.push({path: '/play/edu_detail', query: {active_id: id}})
            },
            // 获取日期
            get_ActiveTimeList() {
                // 获取今天的时间
                var timestamp = Date.parse(new Date());
                this.today_date = this.U.dateFormat(timestamp);
                this.$api.ActiveTimeList().then((res) => {
                    // console.log(res)
                    if (res.status == 1) {
                        this.dataList = res.data;
                        for (let i in this.dataList) {
                            if (this.today_date == this.dataList[i].active_date) {
                                this.dataList[i].week = '今天'
                            }
                        }
                        this.loadMore()
                    }
                })
            },
            // 获取活动列表
            get_ActiveList(date) {
                Indicator.open({
                    text: '数据加载...',
                    spinnerType: 'fading-circle'
                });
                this.$api.ActiveList(
                    this.U.Cookie.get('slb_api_token'),
                    1,
                    date,
                    1,
                    this.take,
                ).then((res) => {
                    Indicator.close()
                    if (res.status == 1) {
                        this.active_list = res.data;
                    }
                })
            },
            loadMore() {
                this.busy = false;
                if(this.counter==1){
                    this.active_list = []
                }
                this.$api.ActiveList(
                    this.U.Cookie.get('slb_api_token'),
                    1,
                    this.dataList[this.i].active_date,
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
                            this.active_list = this.active_list.concat(arr);
                        }
                    }
                })
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        components: {
            swiper,
            swiperSlide,
        },
    }
</script>

<style scoped lang="scss">
    $width: 100%;
    .edu_box {
        /*padding: 0 0 50px 0;*/
        overflow: scroll;
        min-height: 100vh;
        .edu_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 15px;
            color: #853B0C;
            font-weight: bold;
            font-size: 15px;
            /*px*/
            .edu_record {
                color: $main-color;
            }
        }
        .edu_time {
            padding: 0 15px;
            /deep/ .swiper-container {
                touch-action: none;
                .swiper-wrapper {
                    touch-action: none;
                    .swiper-slide {
                        width: 46px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        color: #323232;
                        background-color: #EDEDF6;
                        border-radius: 5px;
                        /*padding: 0 15px;*/
                        font-size: 13px;
                        /*px*/
                        .edu_day {
                            margin: 7px 0 0 0;
                            font-size: 9px;
                        }
                    }
                    .s_active {
                        background-color: $main-color;
                        color: #fff;
                    }
                    .today_active {
                        border: 1px solid $main-color;
                    }
                }
            }
        }
        .titles {
            font-size: 17px;
            /*px*/
            font-weight: bold;
            padding: 18px 15px 0 15px;
        }
        .other_title {
            font-size: 12px;
            /*px*/
            padding: 10px 15px 18px 15px;
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
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: auto;
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
                    justify-content: space-between;
                    flex-direction: column;
                    flex: 1;
                    height: 76px;
                    .sport_name {
                        width: 100%;
                        font-weight: bold;
                        font-size: 15px;
                        /*px*/
                    }
                    .sport_info {
                        span {
                            display: block;
                            padding: 0 0 10px 0;
                            font-size: 12px;
                        }
                    }
                }
                .iconxiangyou {
                    font-size: 18px;
                    color: #C8C8C8;
                }
                .sport_status {
                    position: absolute;
                    right: 0;
                    bottom: 13px;
                    width: 70px;
                    color: #fff;
                    font-size: 12px;
                    padding: 3px 0 3px 7px;
                }
                .status1 {
                    background: linear-gradient(to right, #7FC144, #7FC144, #7FC144, #fff); /* 标准的语法 */
                }
                .status2 {
                    background: linear-gradient(to right, #C8C8C8, #C8C8C8, #C8C8C8, #fff); /* 标准的语法 */
                }
                .status3 {
                    background: linear-gradient(to right, #FF5B40, #FF5B40, #FF5B40, #fff); /* 标准的语法 */
                }
                .status4 {
                    background: linear-gradient(to right, #EBC550, #EBC550, #EBC550, #fff); /* 标准的语法 */
                }
                &:active {
                    background-color: #f5f5f5;
                }
            }
            .noInner {
                text-align: center;
                font-size: 13px;
                /*px*/
                color: #898989;
                padding: 10px 0;
            }
        }
    }
</style>
