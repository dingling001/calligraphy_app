<template>
    <div class="b_box">
        <div class="icon_img"><img src="~img/feedback.png" alt=""></div>
        <span> 您已成功提交反馈意见，感谢您的参与</span>
    </div>
</template>

<script>
    export default {
        name: "feedback"
    }
</script>

<style scoped lang="scss">
    .b_box {
        min-height: 100vh;
        background-color: #F3F5F9;
        overflow: hidden;
        .icon_img {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 78px;
            width: 78px;
            margin: 62px auto 31px auto;
            img {
                width: 100%;
            }
        }
        span {
            display: block;
            font-size: 15px;
            color: #636362;
            line-height: 28px;
            width: 170px;
            margin: 0 auto;
            text-align: center;
        }
    }

</style>
