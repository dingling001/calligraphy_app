<template>
    <div>
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in exhibition_info.imgs" :key="item.exhibition_id"><img
                    :src="item">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="data_name">{{exhibition_info.title}}</div>
        <div class="data_num">共{{exhibition_info.exhibit_count}}件展品</div>
        <div class="data_content" v-html="exhibition_info.content">
        </div>
        <div class="work_box" v-if="exhibit_list">
            <div class="work_title">展出展品</div>
            <div class="work_list">
                <div class="list_item" v-for="item in exhibit_list" @click="go_detail(item.exhibit_id)">
                    <div class="item_img"><img :src="item.list_img" alt=""></div>
                    <span>{{item.title}}</span>
                </div>
                <div class="list_more" v-if="exhibit_list.length>3" @click="go_more">
                    <div>{{exhibition_info.exhibit_count}}<span>件</span></div>
                    <span>更多></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name: "d_detail",
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    effect: 'slide',
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    loop: false,
                    slidesPerView: 1,
                    centeredSlides: true,
                    observer: true,
                    observerParents: true
                },
                exhibition_info: [],
                exhibit_list: [],
                exhibition_id: ''
            }
        },
        created() {
            this.exhibition_id = this.$route.query.exhibition_id;
            this.getDetail();
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            // 获取展厅详情
            getDetail() {
                this.$api.ExhibitionDetail(this.exhibition_id).then((res) => {
                    this.exhibition_info = res.data.exhibition_info;
                    this.exhibit_list = res.data.exhibit_list.splice(0, 3);
                })
            },
            // 跳转展厅展品列表
            go_more() {
                this.$router.push({path: '/taste/exhibits', query: {exhibition_id: this.exhibition_info.exhibition_id}})
            },
            // 展品详情
            go_detail(id) {
                this.$router.push({path: '/taste/voice_detail', query: {exhibit_id: id}})
            }
        }


    }
</script>

<style scoped lang="scss">
    /deep/ .swiper-container {
        height: 100%;
        margin: 10px 18px;
        .swiper-pagination {
            bottom: 5px;
            .swiper-pagination-bullet {
                width: 5px;
                height: 5px;
                display: inline-block;
                background: #ffffff;
                border-radius: 5px;
                transition: width 0.3s ease-in-out;
                opacity: 1;
                &.swiper-pagination-bullet-active {
                    width: 15px;
                    height: 5px;
                }
            }
        }
    }

    .data_name {
        font-size: 18px;
        /*px*/
        color: #323232;
        padding: 12px 18px;
        font-weight: bold;
    }

    .data_num {
        color: #576882;
        font-size: 12px;
        /*px*/
        padding: 0 18px;
    }

    .data_content {
        font-size: 16px;
        /*px*/
        color: #323232;
        line-height: 32px;
        text-indent: 2em;
        padding: 18px;
        overflow: hidden;
        word-wrap: break-word
    }

    .work_box {
        padding: 0 18px;
        .work_title {
            font-size: 16px;
            color: #323232;
            padding: 0 0 10px 0;
        }
        .work_list {
            display: flex;
            /*align-items: center;*/
            /*justify-content: space-between;*/
            .list_item {
                /*flex: 1;*/
                width: 24%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin: 0 10px 0 0;
                .item_img {
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 100%;
                    }
                }
                span {
                    font-size: 15px;
                    /*px*/
                    color: #323232;
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin: 10px 0;
                    @include ellipsis(1)
                }

            }
            .list_more {
                width: 90px;
                height: 90px;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                padding: 20px 0;
                text-align: center;
                color: #fff;
                font-size: 15px;
                /*px*/
                background-color: $main-color;
                border-radius: 13px;
                span {
                    font-size: 10px;
                    /*px*/
                }
            }
        }
    }
</style>
