<template>
    <div class="t_box">
        <div class="t_list" v-if="treasure_list.length>0">
            <a class="t_item" v-for="item in treasure_list" :href="item.url_3d">
                <div class="t_img">
                    <img :src="item.list_img" alt="">
                    <div class="icon_box">
                        <div class="iconfont icond"></div>
                    </div>
                </div>
                <div class="t_name">{{item.exhibit_title}}</div>
                <div class="t_place">展品地点：{{item.exhibition_title}}</div>
            </a>
        </div>
        <div class="no_record" v-else>
            <div class="no_img"><img src="~img/nodata.png" alt=""></div>
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "treasure",
        data() {
            return {
                treasure_list: []
            }
        },
        created() {
            this.get_Exhibition3DList()
        },
        methods: {
            get_Exhibition3DList() {
                this.$api.Exhibition3DList().then(res => {
                    // console.log(res)
                    this.treasure_list = res.data;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .t_box {
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
        .t_list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 16px 10px 50px 10px;
            .t_item {
                display: block;
                width: 170px;
                height: 250px;
                margin: 0 0 15px 0;
                .t_img {
                    width: 100%;
                    height: 170px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #ccc;
                    position: relative;
                    img {
                        width: 100%;
                    }
                    .icon_box {
                        position: absolute;
                        right: 13px;
                        bottom: 13px;
                        background-color: #fff;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: $main-color;
                    }
                }
                .t_name {
                    color: #222;
                    margin: 12px 0;
                    padding: 0 12px;
                    @include ellipsis(1);
                    font-size: 13px;
                    /*px*/
                }
                .t_place {
                    font-size: 9px;
                    color: #A9A9A9;
                    padding: 0 12px;
                    line-height: 20px;
                }
            }
        }
    }
</style>
