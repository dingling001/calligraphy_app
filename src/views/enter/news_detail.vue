<template>
    <div class="n_box">
        <div class="list_img"><img :src="d_info.list_img" alt=""></div>
        <div class="n_name">{{d_info.title}}</div>
        <div class="n_date">{{d_info.time}}</div>
        <div class="n_content" v-html="d_info.content"></div>
    </div>
</template>

<script>
    export default {
        name: "news_detail",
        data() {
            return {
                d_info: [],
                id: ''
            }
        },
        created() {
            console.log(this.$route.params.id);
            this.id = this.$route.params.id;
            this.getDetail();
        },
        methods: {
            getDetail() {
                this.$api.NewsDetail(this.id).then((res) => {
                    this.d_info = res.data;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .n_box {
        .list_img {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 100%;
            }
        }
        .n_name {
            padding: 20px 10px 10px 10px;
            margin: 0 10px;
            font-size: 16px;
            /*px*/
            color: #262932;
            font-weight: bold;
        }
        .n_date {
            color: #6D6D6D;
            font-size: 12px;
            /*px*/
            padding: 0 10px 10px 10px;
            margin: 0 10px;
            border-bottom: 1px solid #E5E5E5;
            /*no*/
        }
        .n_content {
            padding: 20px;
            font-size: 15px;
            /*px*/
        }
    }
</style>
