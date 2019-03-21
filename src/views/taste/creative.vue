<template>
    <div class="c_box">
        <div class="c_list" v-if="w_list.length>0">
            <div class="c_item" v-for="item in w_list" @click="go_detail(item.wenchuang_id)">
                <div class="c_img"><img :src="item.list_img" alt=""></div>
                <div class="c_mid">
                    <div class="c_name">{{item.title}}</div>
                    <div class="c_desc">{{item.brief_desc}}</div>
                </div>
                <div class="iconfont iconxiangyou"></div>
            </div>
        </div>
        <div class="no_record" v-else>
            <div class="no_img"><img src="~img/logo.png" alt=""></div>
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "creative",
        data() {
            return {
                w_list: []
            }
        },
        created() {
            this.get_WenChuang()
        },
        methods: {
            get_WenChuang() {
                this.$api.WenChuang().then(res => {
                    console.log(res)
                    this.w_list = res.data
                })
            },
            go_detail(id) {
                this.$router.push({path: '/taste/creative_d', query: {w_id: id}})
            }
        }
    }
</script>

<style scoped lang="scss">
    .c_box {
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
        .c_list {
            .c_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 0 17px;
                padding: 10px 0;
                border-bottom: 1px solid #F0F0F0;
                .c_img {
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f5f5f5;
                    margin: 0 15px 0 0;
                    img {
                        width: 100%;
                    }
                }
                .c_mid {
                    flex: 1;
                    .c_name {
                        word-wrap: break-word;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        line-height: 1.2;
                        font-size: 15px;
                        /*px*/
                        color: #323232;
                        margin: 0 0 27px 0;
                    }
                    .c_desc {
                        @include ellipsis(2, 35px);
                        font-size: 12px;
                        /*px*/
                        color: #909090;
                    }
                }
                .iconxiangyou {
                    color: #576882;
                    font-weight: bold;
                }
                &:last-child {
                    border: 0;
                }
            }
        }
    }
</style>
