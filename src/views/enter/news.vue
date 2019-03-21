<template>
    <div class="news_box">
        <div class="j_news">
            <div class="nodata" v-if="newsList.length==0">暂无数据</div>
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loadingText="loadingText" v-else>
                <ul v-if="newsList.length">
                    <router-link tag="li" :to="'/enter/news_detail/'+item.news_id" class="j_news_item"
                                 v-for="(item,index) in newsList" :key="index">
                        <div class="j_news_item--left">
                            <div class="title">{{item.title}}</div>
                            <div class="date">{{item.date}}</div>
                        </div>
                        <div class="j_news_item--right">
                            <img :src="item.list_img">
                        </div>
                    </router-link>
                </ul>
            </v-scroll>
        </div>
    </div>
</template>

<script>
    import Scroll from '@/components/Scroll'
    import {Indicator} from 'mint-ui'

    export default {
        name: 'news',
        data() {
            return {
                newsList: [],
                loadingText: '上拉加载',
                counter: 0,
                take: 10,

            }
        },
        created() {
            this.getNews()
        },
        components: {
            'v-scroll': Scroll
        },
        methods: {
            getNews() {
                Indicator.open({
                    text: '数据加载...',
                    spinnerType: 'fading-circle'
                });
                this.$api.News(5, 0).then((res) => {
                    this.newsList = res.data
                    Indicator.close()
                    if (res.data.length < this.take) {
                        this.loadingText = '';
                    }
                })
            },
            // 下拉刷新
            onRefresh(done) {
                this.loadingText = '上拉加载';
                this.counter = 1;
                this.getNews()
                done() // call done
            },
            // 上拉加载
            onInfinite(done) {
                this.$api.News(this.take, this.take * this.counter).then((res) => {
                    // console.log(res)
                    this.newsList = res.data
                    let arr = res.data.list;
                    this.newsList = this.newsList.concat(arr);
                    if (arr.length < this.take) {
                        this.loadingText = '没有了';
                        //vm.$el.querySelector('.load-more').style.display = 'none';
                        return;
                    } else {
                        this.counter++;
                    }
                    done() // call done
                }, (error) => {
                    console.log(error);
                });

            },
        }
    }
</script>

<style lang="scss" scoped>
    .j_news {
        ul {
            margin: 0 15px;
        }
        li {
            padding: 15px 0;

            border-bottom: 1px solid #E6E6E6;
            &:last-child {
                /*border: 0;*/
            }
        }
        &_item {
            display: flex;
            justify-content: space-between;
            &--left {
                flex: 1;
                width: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title {
                    @include ellipsis(2, 50px);
                    font-size: 16px;
                    /*px*/
                    color: #000;
                }
                .date {
                    @include ellipsis(1);
                    font-size: 13px;
                    /*px*/
                    color: #A5A5A5;
                }
            }
            &--right {
                flex-shrink: 0;
                width: 114px;
                height: 76px;
                margin-left: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

</style>
