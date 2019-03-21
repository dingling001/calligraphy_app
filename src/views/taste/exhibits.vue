<template>
    <div class="e_box">
        <audio ref="audio" id="audio" preload="auto" :src="currSong" @timeupdate="ontimeupdate"
               @loadedmetadata="onloadedmetadata" @ended="end_audio">
            <!--<source >-->
        </audio>
        <div class="play_process" v-if="show_process">
            <div class="active_process" :style="{width:p_width+'%'}"></div>
            <div class="pause_box" v-if="!is_pause">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                   <rect x="0" y="0" width="2" height="5" fill="#fff">
               <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0s" dur="0.6s" repeatCount="indefinite" />
                 </rect>
                    <rect x="5" y="0" width="2" height="5" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0s" dur="0.6s" repeatCount="indefinite" />
                  </rect>
              <rect x="10" y="0" width="2" height="5" fill="#fff">
              <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0.5s" dur="0.6s" repeatCount="indefinite" />
               </rect>
             </svg>
            </div>
            <div class="iconfont iconliebiaozhengzaibofang" v-else></div>
            <span style="padding: 0 0 0 20px">
                <span v-if="is_playing">正在为你播放“{{eList[indexSong].title}}”语音导览</span>
                <span v-else>加载中...</span>
            </span>
            <span class="close_pro" @click="closePro">X</span>
        </div>
        <div :class="['e_list',show_process?'active_play':'']">
            <div class="e_item" v-for="(item,index) in eList">
                <div class="e_img" @click="go_detail(item.exhibit_id)"><img :src="item.list_img" alt=""></div>
                <div class="e_mid" @click="go_detail(item.exhibit_id)">
                    <div class="e_name">{{item.title}}</div>
                    <div class="e_desc">{{item.brief_desc}}</div>
                </div>
                <div class="icon_box">
                    <div class="iconfont iconerji" v-if="indexSong!=index||item.isPlaying"
                         @click="play_audio(index)"></div>
                    <div style="" class="pause_box" v-else @click="pause_audio(index)">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                   <rect x="0" y="0" width="2" height="5" fill="#fff">
               <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0s" dur="0.6s" repeatCount="indefinite" />
                 </rect>
                    <rect x="5" y="0" width="2" height="5" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0s" dur="0.6s" repeatCount="indefinite" />
                  </rect>
              <rect x="10" y="0" width="2" height="5" fill="#fff">
              <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0.5s" dur="0.6s" repeatCount="indefinite" />
               </rect>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {timeFormat} from "../../assets/js/utils";

    export default {
        name: "exhibits",
        data() {
            return {
                exhibition_id: '',
                eList: [],
                indexSong: -1,
                show_process: false,
                cur: 0,
                p_width: 0,
                currSong: '',
                is_playing: false,
                is_pause: false
            }
        },
        created() {
            this.exhibition_id = this.$route.query.exhibition_id;
            this.getList()
        },
        methods: {
            // 播放
            playAudio() {
                // ios不能自动加载，导致首次加载不能自动读取最大时间,故做此loading弹层提示优化
                this.$refs.audio.play();
                this.is_pause = false;
            },
            // 暂停
            pause_audio(index) {
                var that = this;
                var elist = that.eList;
                that.$refs.audio.pause();
                this.is_pause = true;
                for(let i in elist){
                    elist[i].isPlaying = true;
                }
                // console.log( elist[index].isPlaying)
                // that.indexSong = index;
            },
            // 播放结束
            end_audio() {
                var _audio = document.getElementById('audio');
                console.log('播完了')
                this.is_pause = true;
                this.p_width = 0;
                _audio.load()
                _audio.pause();
                for (let i in this.eList) {
                    this.eList[i].isPlaying = true;
                }
            },
            getList() {
                this.$api.Exhibits(this.exhibition_id).then(res => {
                    this.eList = res.data;
                    for (let i in this.eList) {
                        this.eList[i].isPlaying = true;
                    }
                    this.currSong = this.eList[0].audio
                    // console.log(this.eList)
                    // this.$refs.audio.src = res.data[0].audio
                })
            },
            // 关闭
            closePro() {
                var elist = this.eList;
                elist[this.indexSong].isPlaying = true;
                this.indexSong = -1;
                this.show_process = false;
                this.p_width = 0;
                var _audio = document.getElementById('audio');
                _audio.pause();
                this.$refs.audio.load();
            },
            getAddlisten() {
                var that = this;
                var _audio = document.getElementById('audio');
                _audio.addEventListener("play", function () {
                    //在这里写代码
                    that.is_playing = true;
                });
            },
            // 播放音频
            play_audio(index) {
                var that = this;
                var elist = that.eList;
                that.show_process = true;
                that.currSong = elist[index].audio;
                elist[index].isPlaying = false;
                that.indexSong = index;
                that.getAddlisten()
                that.$nextTick(() => {
                    this.playAudio()
                });
            },
            // 播放进度条
            ontimeupdate() {
                var that = this;
                var _audio = document.getElementById('audio');
                // alert(myaudio.duration);
                var cur = _audio.currentTime;
                var dur = _audio.duration;
                cur = dur - cur;
                that.dur = cur;
                that.p_width = 100 - (cur / dur) * 100
                if (cur > 0) {
                    // console.log(dur)
                } else {
                    // console.log(dur)
                    // clearInterval(interval);
                }
            },
            onloadedmetadata(res) {
                // console.log(res)
                var that = this;
                var cur = res.target.currentTime;
                var dur = res.target.duration;
                cur = dur - cur;
                that.dur = cur;
                that.p_width = 100 - (cur / dur) * 100
                if (cur > 0) {
                    that.audio_time = timeFormat(cur)
                } else {
                    console.log(dur)
                    // clearInterval(interval);
                }
            },
            // 展品详情
            go_detail(id) {
                this.$router.push({path: '/taste/voice_detail', query: {exhibit_id: id}})
            }
        },
    }
</script>

<style scoped lang="scss">
    .e_box {
        padding: 0 0 70px 0;
        .play_process {
            padding: 0 13px;
            display: flex;
            align-items: center;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            /*px*/
            color: #fff;
            background-color: #FFD788;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 10;
            .iconliebiaozhengzaibofang {
                margin-left: -5px;
                font-size: 20px;
                /*px*/
            }
            .active_process {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 0;
                background-color: $main-color;
                z-index: -1;
            }
            .close_pro {
                position: absolute;
                width: 30px;
                text-align: center;
                right: 0;
                z-index: 13;
                font-size: 20px;
                /*px*/
            }
        }
        .e_list {
            .e_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 0 20px;
                padding: 10px 0;
                border-bottom: 1px solid #F0F0F0;
                .e_img {
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #EDE6E1;
                    img {
                        width: 100%;
                    }
                }
                .e_mid {
                    flex: 1;
                    height: 90px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    padding: 10px 30px 10px 16px;
                    .e_name {
                        font-size: 15px;
                        /*px*/
                        color: #323232;
                        font-weight: bold;
                    }
                    .e_desc {
                        font-size: 12px;
                        /*px*/
                        color: #909090;
                        @include ellipsis(2, 30px);
                        line-height: 16px;
                    }
                }
                .icon_box {
                    height: 26px;
                    width: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: $main-color;
                    .iconfont {
                        color: #fff;
                        font-size: 13px;
                        /*px*/
                    }
                }
            }
        }
        .active_play {
            margin-top: 30px;
        }
        .pause_box {
            transform: rotate(180deg);
            display: flex;
            align-items: center;
            justify-content: center
        }
    }
</style>
