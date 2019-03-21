<template>
    <div class="brief_box">
        <div class="title">嘉善县博物馆</div>
        <div class="title_img"><img src="~img/bg.png" alt=""></div>
        <div class="content" v-html="content_intro">

        </div>
    </div>
</template>

<script>
    export default {

        name: 'brief',

        data() {
            return {
                content_intro: ''
            }
        },
        created() {
            this.getIntro()
        },
        methods: {
            getIntro() {
                this.$api.MuseumInfo(1).then((res) => {
                    this.content_intro = res.data.content
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .brief_box {
        .title {
            padding: 20px 0 15px 18px;
            font-size: 18px; /*px*/
            font-weight: bold;
        }
        .title_img {
            width: 92%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            background-color: #f5f5f5;
        }
        & img {
            width: 100%;
        }
        .content {
            font-size: 15px; /*px*/
            text-indent: 2em;
            line-height: 30px;
            img {
                width: 100%;
            }
        }
    }
</style>
