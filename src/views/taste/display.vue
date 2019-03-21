<template>
    <div class="display_box">
        <div class="data_list">
            <div class="data_item" @click="go_detail(item.exhibition_id)" v-for="item in e_list">
                <div class="data_img"><img :src="item.list_img" alt=""></div>
                <div class="data_name">{{item.title}}</div>
                <div class="data_num">共{{item.exhibit_count}}件展品</div>
            </div>
            <!--<div class="data_item" @click="go_detail()">-->
                <!--<div class="data_img"><img src="~img/d.png" alt=""></div>-->
                <!--<div class="data_name">历史陈列展厅</div>-->
                <!--<div class="data_num">共56件展品</div>-->
            <!--</div>-->
            <!--<div class="data_item" @click="go_detail()">-->
                <!--<div class="data_img"><img src="~img/d.png" alt=""></div>-->
                <!--<div class="data_name">历史陈列展厅</div>-->
                <!--<div class="data_num">共56件展品</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "display",
        data() {
            return {
                e_list: []
            }
        },
        created(){
          this.getE()
        },
        methods: {
            getE(){
              this.$api.Exhibition().then((res)=>{
                  console.log(res)
                  this.e_list=res.data;
                })
            },
            go_detail(id) {
                this.$router.push({path: '/taste/d_detail', query: {exhibition_id:id}})
            }
        }
    }
</script>

<style scoped lang="scss">
    .display_box {
        .data_list {
            padding: 0 18px;
            .data_item {
                padding: 18px 0;
                border-bottom: 1px solid #F0F0F0;
                /*no*/
                .data_img {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px 16px 8px 8px;
                    overflow: hidden;
                    background-color: #f5f5f5;
                    img {
                        width: 100%;
                    }
                }
                .data_name {
                    font-size: 16px;
                    /*px*/
                    color: #323232;
                    padding: 12px 0;
                }
                .data_num {
                    color: #576882;
                    font-size: 12px;
                    /*px*/
                }
            }
        }
    }
</style>
