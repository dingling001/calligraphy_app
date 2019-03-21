<template>
    <div class="g_box">
        <div class="g_img click_effect" @click="go_study">
            <img src="~img/q.png" alt="">
        </div>
        <div class="g_img click_effect" @click="go_game">
            <img src="~img/g.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "game",
        methods: {
            // 进入游戏
            go_game() {
                window.location.href = '../../../static/game/index.html'
            },
            // 问答闯关
            go_study() {
                this.$router.push('/play/study')
            }
        }
    }
</script>

<style scoped lang="scss">
    .g_box {
        padding: 35px 17px;
        .g_img {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 18px;
            overflow: hidden;
            margin-bottom: 20px;
            img {
                width: 100%;
            }
        }
    }

</style>
