<template>
    <div class="j_de" v-cloak>
        <div class="j_de_header" v-if="detail.imgs.length">
            <div class="j_de_header--banner">
                <!-- <img v-lazy="thumbsimg(detail.big_imgs[0],315,225,33)" :key="detail.big_imgs[0]"> -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in detail.imgs" :key="index">
                        <img v-lazy="item">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="j_de_header--progress">
                <div class="iconfont" :class="[playing?'iconzanting':'iconbofang']" @click="toggleplay">
                </div>
                <!--<div v-if="showLoading">加载中...</div>-->
                <div class="prog_cont">
                    <div class="prog_cont_curtime">{{ currentTime | formatSecond }}</div>
                    <div class="prog_cont_line" @touchstart="handleTouchStart">
                        <div class="slider-track" ref="track"></div>
                        <div class="slider-fill" ref="fill" :style="'width:' + sliderX + '%'"></div>
                        <div class="slider-thumb" ref="thumb" :style="'left:' + sliderX + '%'"></div>
                    </div>
                    <div class="prog_cont_durtime">{{ maxTime | formatSecond }}</div>
                </div>
                <audio ref="audio" preload="auto" :src="detail.audio"
                       @loadedmetadata="onLoadedmetadata" @timeupdate="onTimeupdate" @ended="onEnded">
                </audio>
                <!--<loadingDot msg="音频资源加载中..." :showLoading="showLoading" @handleClose="handleClose"></loadingDot>-->
            </div>
        </div>
        <div class="j_de_body">
            <div class="j_de_body--title">
                <h2>{{detail.title}}</h2>
                <p class="iconfont icond"></p>
            </div>
            <div class="j_de_body--content" v-html="detail.content">
            </div>
        </div>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import {Indicator} from 'mint-ui'
    //时间转换
    const transTime = value => {
        let time = "";
        let h = parseInt(value / 3600);
        value %= 3600;
        let m = parseInt(value / 60);
        let s = parseInt(value % 60);
        if (h > 0) {
            time = formatTime(h + ":" + m + ":" + s);
        } else {
            time = formatTime(m + ":" + s);
        }
        return time;
    }

    //时间格式化
    const formatTime = value => {
        let time = "";
        let s = value.split(':');
        let i = 0;
        for (; i < s.length - 1; i++) {
            time += s[i].length == 1 ? ("0" + s[i]) : s[i];
            time += ":";
        }
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        return time;
    }
    export default {
        name: 'voice_detail',
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    effect: 'slide',
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    loop: false,
                    slidesPerView: 1,
                    centeredSlides: true,
                    observer: true,
                    observerParents: true,
                },
                detail: {
                    imgs: []
                },
                sliderX: 0,
                // 该字段是音频是否处于播放状态的属性
                playing: false,
                // 音频当前播放时长
                currentTime: 0,
                // 音频最大播放时长
                maxTime: 0,
                minTime: 0,
                step: 0.1,
                showLoading: false,
                isFirst: false
            }
        },
        // inject: ['app'],
        components: {
            swiper,
            swiperSlide,
        },
        mounted() {
            this.getDetail();
        },
        // computed: {
        //   percent() {
        //     const value = !!this.sliderX ? parseInt(this.currentTime / this.maxTime * 100) : 0;
        //     return Math.min(1, value);
        //   },
        // },
        methods: {
            /*生成缩略图链接*/
            thumbsimg: function (path, width, height, type) {
                return toThumbsimg(path, width, height, type);
            },
            async getDetail() {
                // this.app.showLoading();
                Indicator.open({
                    text: '数据加载...',
                    spinnerType: 'fading-circle'
                });
                const id = this.$route.query.exhibit_id;
                this.$api.AudioDetail(id).then(res => {
                    this.detail = res.data;
                    Indicator.close()
                });
                // console.log(res.data)
            },
            // 控制音频的播放与暂停
            toggleplay() {

                this.playing ? this.pause() : this.play();

            },
            handleClose() {
                this.currentTime = 0;
                this.maxTime = 0;
                this.sliderX = 0;
                this.showLoading = false;
                this.playing = false;
                this.isFirst = false;
                this.$refs.audio.load();
            },
            loadingopen() {
                Indicator.open({
                    text: '音频加载...',
                    spinnerType: 'fading-circle'
                });
            },
            loadingclose() {
                Indicator.close()
            },
            // 播放音频
            play() {
                // console.log('播放')
                this.sliderX ? this.playing = true : this.loadingopen();
                this.$refs.audio.play();
            },
            // 暂停音频
            pause() {
                // console.log('暂停音频')
                this.playing = false;
                this.$refs.audio.pause();
            },
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata(res) {
                // this.maxTime = parseInt(res.target.duration);
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            // 当音频当前时间改变后，进度条也要改变
            onTimeupdate(res) {
                this.currentTime = res.target.currentTime;
                this.maxTime = parseInt(res.target.duration);
                this.sliderX = parseInt(this.currentTime / this.maxTime * 100);
            },
            //播放结束
            onEnded() {
                this.currentTime = 0;
                this.sliderX = 0;
                this.playing = false;
            },
            handleTouchStart(e) {
                this.setValue(e.touches[0]);
                document.addEventListener('touchmove', this.handleTouchMove);
                document.addEventListener('touchup', this.handleTouchEnd);
                document.addEventListener('touchend', this.handleTouchEnd);
                document.addEventListener('touchcancel', this.handleTouchEnd);
            },
            handleTouchMove(e) {
                this.setValue(e.changedTouches[0]);
            },
            handleTouchEnd(e) {
                this.setValue(e.changedTouches[0]);
                document.removeEventListener('touchmove', this.handleTouchMove);
                document.removeEventListener('touchup', this.handleTouchEnd);
                document.removeEventListener('touchend', this.handleTouchEnd);
                document.removeEventListener('touchcancel', this.handleTouchEnd);
            },
            // 从点击位置更新 value
            setValue(e) {
                const $track = this.$refs.track;
                const {
                    maxTime,
                    minTime,
                    step
                } = this;
                let value = ((e.clientX - $track.getBoundingClientRect().left) / $track.offsetWidth) * (maxTime - minTime);
                value = Math.round(value / step) * step + minTime;
                value = parseFloat(value.toFixed(5));

                if (value > maxTime) {
                    value = maxTime;
                } else if (value < minTime) {
                    value = minTime;
                }

                this.$refs.audio.currentTime = value;
            },
        },
        filters: {
            // 将整数转化成时分秒
            formatSecond(second = 0) {
                return transTime(second);
            }
        },
        watch: {
            sliderX: {
                handler: function (value) {
                    const isFirst = this.isFirst;
                    if (!isFirst) {
                        const isplaying = this.playing;
                        if (value && !isplaying) {
                            this.loadingclose();
                            this.playing = true;
                            this.isFirst = true;
                        }
                    }
                },
                deep: true,
                immediate: true // 默认立即触发一次
            }
        }
    }

</script>
<style lang="scss" scoped>
    .j_de {
        min-height: 100vh;
        background-color: #EEEEEE;

        &_header {
            padding: 20px 15px;
            background-color: #FFFFFF;
            &--banner {
                width: 250px;
                height: 233px;
                margin: 0 auto;

                /*box-shadow: 0 10px 10px #ccc;*/
                /deep/ .swiper-container {
                    height: 100%;
                    .swiper-slide {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    img {
                        width: 100%;
                        height: auto;
                    }
                    .swiper-pagination {
                        bottom: 5px;

                        .swiper-pagination-bullet {
                            width: 5px;
                            height: 5px;
                            display: inline-block;
                            background: #ffffff;
                            border-radius: 5px;
                            transition: width 0.3s ease-in-out;
                            opacity: 1;

                            &.swiper-pagination-bullet-active {
                                width: 15px;
                                height: 5px;
                            }
                        }
                    }
                }
            }

            &--progress {
                height: 70px;
                margin-top: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                user-select: none;
                .iconfont {
                    font-size: 33px;
                    /*px*/
                    color: $main-color;
                }
                /*.prog_btn {*/
                /*width: 36px;*/
                /*height: 36px;*/
                /*flex-shrink: 0;*/
                /*!*background: url('~img/de_pause.png') center center no-repeat;*!*/
                /*background-size: 100% 100%;*/
                /*transition: background-image 0.2s ease-out 0s;*/

                /*&.play {*/
                /*!*background: url('~img/de_play.png') center center no-repeat;*!*/
                /*background-size: 100% 100%;*/
                /*}*/

                /*&.pause {*/
                /*!*background: url('~img/de_pause.png') center center no-repeat;*!*/
                /*background-size: 100% 100%;*/
                /*}*/
                /*}*/

                .prog_cont {
                    flex: 1;
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 20px;

                    &_curtime,
                    &_durtime {
                        color: #323232;
                        font-size: 12px;
                        /*px*/
                    }

                    &_line {
                        position: relative;
                        display: inline-block;
                        flex: 1;
                        margin: 0 12px;
                        height: 30px;
                        // background: #EEEEEE;
                        border-radius: 2px;

                        // &:active .slider-thumb {
                        //   transform: scale(1.8);
                        //   box-shadow: 0 0 10px #999;
                        // }

                        .slider-track {
                            position: absolute;
                            height: 2px;
                            left: 0;
                            right: 0;
                            top: 50%;
                            margin-top: -1px;
                            background-color: #EEEEEE;
                        }

                        .slider-fill {
                            position: absolute;
                            height: 2px;
                            width: 0%;
                            border-radius: 2px;
                            background-color: #AD2229;
                            left: 0;
                            top: 50%;
                            margin-top: -1px;
                        }

                        .slider-thumb {
                            position: absolute;
                            top: 50%;
                            width: 12px;
                            height: 12px;
                            background-color: #EFD2D3;
                            color: #EFD2D3;
                            border-radius: 50%;
                            left: 50%;
                            top: 50%;
                            margin-left: -6px;
                            margin-top: -6px;
                            cursor: pointer;

                            &:after {
                                display: block;
                                content: " ";
                                width: 4px;
                                height: 4px;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                margin-top: -2px;
                                margin-left: -2px;
                                background-color: #AD2229;
                                border-radius: 50%;
                            }

                            &:active {
                                transform: scale(1.8);
                                box-shadow: 0 0 10px #b1b1b1;
                            }
                        }
                    }
                }
            }
        }

        &_body {
            margin-top: 15px;
            padding: 20px 15px;
            background-color: #FFFFFF;

            &--title {
                border-bottom: 1px solid #E5E5E5;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 0;
                h2 {
                    font-size: 18px;
                    /*px*/
                    color: #4D4D4D;
                    word-break: break-all;
                }

                .icond {
                    font-size: 25px;
                    /*px*/
                    color: $main-color;
                }
            }

            &--content {
                word-wrap: break-word;
                padding: 15px 0 0;

                /deep/ p {
                    font-size: 16px;
                    /*px*/
                    color: #323232;
                    line-height: 1.5;
                    text-indent: 2em;
                    @include text_jusify();
                }
            }
        }
    }

</style>
