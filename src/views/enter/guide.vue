<template>
    <div class="guide">
        <!--<div class="title"> 交通路线</div>-->
        <!--<div class="g_title"><span class="iconfont iconarrLeft-fill1"></span><span>博物馆位置</span></div>-->
        <!--<div class="g_content">馆址座落在魏塘镇花园路178号。</div>-->
        <!--<div class="g_title"><span class="iconfont iconarrLeft-fill1"></span><span>乘车路线</span></div>-->
        <!--<div class="g_content">交通路线：乘5、6、9、10、38、44、47、63、337、公交汽车及109路无轨电车、环线2号线地铁等交通工具，至宣武医院、牛街、长椿街等车站下车，均可到达。</div>-->
        <!--<div class="map"><img src="~img/map.png" alt=""></div>-->
        <!--<div class="title"> 联系我们</div>-->
        <!--<div class="g_title"><span class="iconfont iconarrLeft-fill1"></span><a href="tel:0931-6184266">咨询热线-->
        <!--0931-6184266</a></div>-->
        <!--<div class="g_title"><span class="iconfont iconarrLeft-fill1"></span><a href="http://www.gsstm.org">官方网址：www.gsstm.org</a>-->
        <!--</div>-->
        <!--<div class="code_box"><img src="~img/code.jpg" alt=""><span>扫一扫关注我们吧！</span></div>-->
        <div v-html="guide_content"></div>
    </div>
</template>

<script>
    export default {
        name: 'guide',
        data() {
            return {
                guide_content: ''
            }
        },
        created() {
            this.getIntro()
        },
        methods: {
            getIntro() {
                this.$api.MuseumInfo(2).then((res) => {
                    this.guide_content = res.data.content
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .guide {
        padding: 17px 17px 30px 17px;
        font-size: 15px;
        /*px*/
        .title {
            color: $main-color;
            padding: 10px 0;
            font-size: 18px; /*px*/
            border-bottom: 2px solid $main-color; /*no*/
        }
        .g_title {
            font-size: 14px; /*px*/
            padding: 10px 0;
            display: flex;
            align-items: center;
            font-weight: 600;
            & .iconarrLeft-fill1 {
                color: $main-color;
                font-size: 20px;
                /*px*/

            }
        }
        .g_content {
            font-size: 14px;
            /*px*/
            line-height: 30px;
            text-align: justify;
        }
        .map {
            margin: 20px auto;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            & img {
                width: 100%;
            }
        }
        .code_box {
            width: 176px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 14px;
            & img {
                margin: 0 0 10px 0;
            }
        }
    }
</style>
