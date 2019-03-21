<template>
    <div class="q_box">
        <a class="q_item" :href="url"><img src="~img/question.png" alt=""></a>
        <div class="f_title">意见反馈</div>
        <div class="f_text">
            <textarea id="" placeholder="请输入不少于10个字的描述" v-model="text_content"></textarea>
            <div class="f_tips">{{text_content.length}}/200</div>
        </div>
        <div class="f_title">您的联系方式（选填）</div>
        <div class="f_input"><input type="text" placeholder="手机号码或邮箱" v-model="phone"></div>
        <div class="f_btn click_effect" @click="do_FeedbackSave">提交</div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "question",
        data() {
            return {
                text_content: '',
                phone: '',
                url: ''
            }
        },
        created() {
            this.get_FeedbackSave()
        },
        methods: {
            // 调查问卷
            get_FeedbackSave() {
                this.$api.QuestionList().then(res => {
                    console.log(res)
                    this.url = res.data[0].detail_url
                })
            },
            // 意见反馈
            do_FeedbackSave() {
                if (this.text_content == '') {
                    Toast('请输入内容')
                } else if (this.text_content.length < 10) {
                    Toast('请输入不少于10个字的描述')
                } else {
                    this.$api.FeedbackSave(
                        this.U.Cookie.get('slb_api_token'),
                        this.phone,
                        this.text_content
                    ).then(res => {
                        Toast(res.msg)
                        this.$router.push('/play/feedback')
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .q_box {
        min-height: 100vh;
        background-color: #F3F5F9;
        .q_item {
            display: block;
            padding: 16px 18px;
            img {
                width: 100%;
            }
        }
        .f_title {
            padding: 10px 16px;
            color: #878787;
            font-size: 15px;
            /*px*/
        }
        .f_text {
            background-color: #fff;
            height: 140px;
            padding: 10px 16px;
            font-size: 16px;
            /*px*/
            textarea {
                width: 100%;
                height: 100px;
                background: none;
                resize: none;
                border: 0;
                outline: none;
                &::placeholder {
                    color: #ABAAAA;
                }
            }
            .f_tips {
                color: #ABAAAA;
                text-align: right;
                font-size: 15px;
                /*px*/
            }
        }
        .f_input {
            background-color: #fff;
            height: 41px;
            font-size: 16px;
            /*px*/
            input {
                background: none;
                outline: none;
                width: 100%;
                height: 100%;
                border: 0;
                padding: 0 17px;
                &::placeholder {
                    color: #ABAAAA;
                }
            }
        }
        .f_btn {
            width: 80%;
            margin: 34px auto 0 auto;
            padding: 13px 0 16px 0;
            color: #fff;
            border-radius: 22px;
            text-align: center;
            font-size: 16px;
            /*px*/
            background-color: $main-color;
        }
    }
</style>
