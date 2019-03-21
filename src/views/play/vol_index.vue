<template>
    <div class="v_box">
        <router-link class="v_title" to="/play/vol_list" tag="div">
            <div class="logo_box">
                <div class="logo_img"><img src="~img/logo.png" alt=""></div>
                <div>善博之友</div>
            </div>
            <div class="iconfont iconxiangyou"></div>
        </router-link>
        <div class="v_item">志愿者服务</div>
        <div class="v_content">
            嘉善县博物馆志愿者团队成立于2018年，由嘉善县博物馆社教部负责管理。主要的志愿服务项目包括：展厅讲解服务、教育活动服务、公共接待服务、摄影摄像服务四种。展厅讲解志愿者主要是为观众在展厅解读科技馆的展览，传播历史文化，弘扬爱国主义教育；教育活动志愿者是在教育活动区组织儿童观众开展各种互动体验活动；公共接待服务志愿者则是负责协助解答观众资讯、引导观众使用自主票务系统等工作，协助提升公共参观服务质量；摄影摄像志愿者负责对甘肃科技馆展览、文物及与馆方对外宣传相关的内容进行拍摄。
        </div>
        <div class="v_item">志愿者风采</div>
        <div class="v_imgs">
            <div><img src="~img/t.png" alt=""></div>
            <div><img src="~img/t.png" alt=""></div>
        </div>
        <div class="v_btn click_effect" @click="go_form">申请成为志愿者</div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'

    export default {
        name: "vol_index",
        methods: {
            go_form() {
                this.$api.IsVolunteer().then(res => {
                    if (res.status == 0) {
                        MessageBox({
                            title: '提示',
                            message: res.msg,
                            showCancelButton: false
                        });
                    } else {
                        this.$router.push('/play/vol_form')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .v_box {
        margin: 0 15px;
        padding: 0 0 50px 0;
        .v_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 15px;
            /*px*/
            color: #45474E;
            padding: 20px 0;
            border-bottom: 1px solid #F0F0F0;
            /*no*/
            .logo_box {
                display: flex;
                align-items: center;
                .logo_img {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 17px;
                    img {
                        width: 100%;
                    }
                }
            }
            .iconxiangyou {
                color: #ECDABC;
                font-weight: bold;
                font-size: 19px;
                /*px*/
            }
        }
        .v_item {
            font-size: 15px;
            /*px*/
            color: #45474E;
            border-left: 5px solid $main-color;
            padding: 0 10px;
            margin: 20px 0;
            font-weight: bold;
        }
        .v_content {
            text-indent: 2em;
            font-size: 13px;
            /*px*/
            color: #2A2A2A;
            line-height: 24px;

        }
        .v_imgs {
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 162px;
                img {
                    width: 100%;
                }
            }
        }
        .v_btn {
            position: fixed;
            bottom: 24px;
            width: 80%;
            left: 0;
            right: 0;
            margin: 0 auto;
            text-align: center;
            padding: 15px 0;
            border-radius: 18px;
            background-color: $main-color;
            color: #fff;
            z-index: 2;
            font-size: 16px;
            /*px*/
        }
    }
</style>
