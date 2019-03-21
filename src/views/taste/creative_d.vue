<template>
    <div class="d_box">
        <div class="d_img">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in d_detail.imgs" :key="item">
                    <img :src="item" alt="">
                </swiper-slide>
            </swiper>
        </div>
        <div class="d_name">{{d_detail.title}}</div>
        <div class="d_date">2018-11-08</div>
        <div class="d_price">售价：60元</div>
        <div class="d_content" v-html="d_detail.content"></div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name: "creative_d",
        data() {
            return {
                w_id: '',
                d_detail: [],
                swiperOption: {
                    notNextTick: true,
                    loop: false,
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeSticky: true,
                    spaceBetween: 12,
                    observer: true,
                    observerParents: true,
                },
            }
        },
        created() {
            this.w_id = this.$route.query.w_id;
            this.get_WenchuangDetail()
        },
        methods: {
            get_WenchuangDetail() {
                this.$api.WenchuangDetail(this.w_id).then(res => {
                    console.log(res)
                    this.d_detail = res.data
                })
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
    }
</script>

<style scoped lang="scss">
    .d_box {
        .d_img {
            /*display: flex;*/
            /*width: 100%;*/
            /*align-items: center;*/
            /*justify-content: center;*/
            img {
                width: 100%;
            }
        }
        .d_name {
            color: #262932;
            font-size: 16px;
            /*px*/
            font-weight: bold;
            padding: 21px 21px 10px 21px;
            line-height: 25px;
            text-align: justify;
        }
        .d_date {
            color: #A5A5A5;
            font-size: 12px;
            /*px*/
            padding: 0 0 10px 10px;
            margin: 0 15px;
            border-bottom: 1px solid #E5E5E5;
            /*no*/
        }
        .d_price{
            padding: 20px 20px 0 20px;
            color: #6D6D6D;
            font-size: 14px;
            /*px*/
        }
        .d_content{
            margin: 20px;
            color: #323232;
        }
    }
</style>
