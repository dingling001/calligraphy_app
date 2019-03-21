<template>
    <div class="s_box">
        <div class="s_icon">
            <div class="iconfont icontongyi"></div>
        </div>
        <div class="s_text">您已成功提交志愿者的申请！</div>
        <div class="s_tips">请耐心等待审核结果通知。</div>
        <router-link class="s_btn click_effect" to="/play/vol_index" tag="div">返回首页</router-link>
    </div>
</template>

<script>
    export default {
        name: "vol_success"
    }
</script>

<style scoped lang="scss">
    .s_box {
        min-height: 100vh;
        overflow: hidden;
        .s_icon {
            width: 48px;
            height: 48px;
            margin: 90px auto 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #C33B43;
            border-radius: 50%;
            .iconfont {
                color: #fff;
                font-weight: bold;
                font-size: 30px;
                /*px*/
            }
        }
        .s_text {
            color: #626262;
            font-size: 18px;
            /*px*/
            padding: 26px 0;
            text-align: center;
        }
        .s_tips {
            color: #626262;
            text-align: center;
            font-size: 15px;
            /*px*/
        }
        .s_btn {
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
