<template>
    <div class="v_box">
        <div class="star_title">
            <div class="star_box"><img src="~img/star.png" alt=""><img src="~img/star.svg" alt=""></div>
            <span class="star_rank">二星级志愿者</span><span>共{{v_list.two_users_count}}人</span>
        </div>
        <div class="star_list nodata" v-if="v_list.two_users.length==0">
            暂无数据
        </div>
        <div class="star_list" v-else>
            <div class="star_item" v-for="item in v_list.two_users">
                <div class="star_left">
                    <div class="star_img"><img :src="item.avatar?item.avatar:default_img" alt=""></div>
                    <div class="star_name">{{item.name}}</div>
                </div>
                <div class="star_more">更多服务内容></div>
            </div>
        </div>
        <div class="star_title">
            <div class="star_box"><img src="~img/star.png" alt=""></div>
            <span class="star_rank">一星级志愿者</span><span>共{{v_list.one_users_count}}人</span>
        </div>
        <div class="star_list nodata" v-if="v_list.one_users.length==0">
            暂无数据
        </div>
        <div class="star_list" v-else>
            <div class="star_item" v-for="item in v_list.one_users">
                <div class="star_left">
                    <div class="star_img"><img :src="item.avatar?item.avatar:default_img" alt=""></div>
                    <div class="star_name">{{item.name}}</div>
                </div>
                <div class="star_more">更多服务内容></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui'

    export default {
        name: "vol_list",
        data() {
            return {
                v_list: {
                    one_users: [],
                    one_users_count: 0,
                    two_users: [],
                    two_users_count: 0
                },
                default_img: require('../../assets/img/logo.png')
            }
        },
        created() {
            this.getVlist()
        },
        methods: {
            getVlist() {
                Indicator.open({
                    text: '数据加载...',
                    spinnerType: 'fading-circle'
                });
                this.$api.Vlist().then((res) => {
                    // console.log(res)
                    Indicator.close();
                    if (res.status == 1) {
                        this.v_list.one_users = res.data.one_users;
                        this.v_list.two_users = res.data.two_users;
                        this.v_list.one_users_count = res.data.one_users_count;
                        this.v_list.two_users_count = res.data.two_users_count;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .v_box {
        .star_title {
            display: flex;
            align-items: center;
            padding: 16px;
            background: linear-gradient(to right, #FF9B52, #FFAE83);
            font-size: 14px;
            /*px*/
            margin: 10px 10px 0 10px;
            border-radius: 2px;
            /*no*/
            color: #fff;
            .star_box {
                display: flex;
                align-items: center;
                img {
                    width: 18px;
                    margin-right: 3px;
                }
            }
            .star_rank {
                font-weight: bold;
                margin: 0 10px;
            }
        }
        .star_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 0;
            margin: 0 20px;
            font-size: 18px;
            /*px*/
            border-bottom: 1px solid #D1D1D1;
            /*no*/
            min-height: 93px;
            &:last-child {
                border: 0;
            }
            .star_left {
                display: flex;
                align-items: center;
                .star_img {
                    width: 61px;
                    height: 61px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    margin-right: 22px;
                    img {
                        width: 100%;
                    }
                }
            }
            .star_more {
                font-size: 12px;
                /*px*/
                color: $main-color;
                padding-top: 35px;
            }
        }
        .nodata {
            min-height: 93px;
        }
    }
</style>
