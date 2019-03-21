<template>
    <div class="m_box">
        <div id="map" class="map_box"></div>
        <div class="btn_box">
            <span :class="{active_span:curT==index}" @click="changeMap(index)" v-for="(item ,index) in menus">{{index+1}}F</span>
            <!--<span :class="{active_span:curT==1}" @click="changeMap(1)">2F</span>-->
            <!--<span :class="{active_span:curT==2}" @click="changeMap(2)">3F</span>-->
        </div>
    </div>
</template>

<script>
    import '../../assets/js/leaflet.js'
    import {Indicator} from 'mint-ui'

    export default {
        name: "map_index",
        data() {
            return {
                curT: 0,
                menus: [{map_path: ""}],
                imgUrl: "",
                imgWidth: 1000, //图片像素宽
                imgHeight: 900, //图片像素高
                myMap: null,
                imageOverlay: null,
                myLayerGroup: null,
                lists: [], //坐标点

            }
        },
        created() {
            this.getMapInfo(0)
            this.myLayerGroup = new L.LayerGroup();
        },
        mounted() {

        },
        methods: {
            //更换图层
            changeMap: function (idx) {
                Indicator.open({
                    text: '地图切换中...',
                    spinnerType: 'fading-circle'
                });
                var v = this;
                var url = v.menus[idx].map_path;
                this.getFloorHall(idx + 1)
                v.imageOverlay.setUrl(url); //更换图层
                // v.initMarkers(idx); //更换图标
                v.imageOverlay.on('load', function () {
                    v.curT = idx;
                    v.imgWidth = v.menus[idx].width / 4;
                    v.imgHeight = v.menus[idx].height / 4;
                    Indicator.close()
                })

            },
            // 获取楼层图
            getMapInfo(floor_id) {
                this.$api.MapInfo(floor_id).then((res) => {
                    if (res.status == 1) {
                        this.menus = res.data;
                        this.initMap()
                        this.getFloorHall(1)
                    }
                })
            },
            // 获取楼层下的展厅列表
            getFloorHall(id) {
                this.$api.MapFloor(id).then((res) => {
                    console.log(res)
                    if (res.status == 1 && res.data.length >= 1) {
                        var data = res.data;
                        this.renderPoint(data, id)
                    } else {
                    }
                })
            },
            // 初始化地图
            initMap: function () {
                var v = this;
                var url = v.menus[0].map_path; //吉鸿昌||嘉善
                var imgWidth = v.menus[0].width;
                var imgHeight = v.menus[0].height;
                // v.imgWidth = v.menus[0].width;
                // v.imgHeight = v.menus[0].height;
                v.myMap = new L.map("map", {
                    // 修改坐标系
                    crs: L.CRS.Simple,
                    // 设置最大拖动边界
                    maxBounds: [
                        [-(imgHeight / 4), -(imgWidth / 4)],
                        [imgHeight / 4, imgWidth / 4]
                    ],
                    minZoom: -1.8, // 设置缩放的最小值
                    maxZoom: 2, // 设置地图放大的最大值
                    zoom: -1.8, //设置初始化的缩放值
                    center: [0, 0], //隐藏leaflet
                    zoomControl: false,
                    attributionControl: false
                });
                v.imageOverlay = new L.imageOverlay(url, [
                    // [-(imgHeight / 2), -(imgWidth / 2)],
                    // [imgHeight / 2, imgWidth / 2]
                    [-imgHeight / 4, -imgWidth / 4],
                    [imgHeight / 4, imgWidth / 4],
                ]).addTo(v.myMap);
            },
            renderPoint(data, id) {
                // // 添加底图
                // var baseImg = L.imageOverlay(data.map, [
                //     [-(imgHeight / 2), -(imgWidth / 2)],
                //     [imgHeight / 2, imgWidth / 2]
                // ]).addTo(myMap);
                // 添加点位

                var floolr_id = id - 1;
                var v = this;
                v.myLayerGroup.clearLayers();
                // console.log(floolr_id)
                for (var i in data) {
                    console.log(data)
                    var d = data[i];
                    // 添加点位
                    var nx = d.x - this.menus[floolr_id].width / 2;
                    var ny = d.y - this.menus[floolr_id].height;
                    // var nx = d.x,
                    //     ny = d.y;
                    var myIcon = L.divIcon({
                        className: "my-div-icon",
                        html: `   <div class="img" id="${d.exhibition_id}">
                                <div class="ex_name">${d.title}</div>
                    <div class="ex_enter">点击进入 <span class="iconfont iconjinru"></span></div>
                                 </div>`

                    });
                    var point = L.marker([ny, nx], {
                        icon: myIcon,
                        title: d.title
                    }).addTo(v.myMap);
                    // 点位添加点击事件
                    point.on("click", function (ev) {
                        var target = ev.target;
                        var id = this._icon.getElementsByClassName('img')[0].getAttribute('id')
                        v.$router.push("/taste/map_ex?exhibition_id=" + id);
                    });
                    v.myLayerGroup.addLayer(point);
                    v.myMap.addLayer(v.myLayerGroup);
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    @import " ../../assets/css/leaflet.css";

    .m_box {
        min-height: 100vh;
        background-color: #F3F3F3;
        .map_box {
            min-height: 100vh;
            width: 100%;
        }
        .btn_box {
            position: fixed;
            bottom: 13px;
            width: 52%;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 15px;
            background-color: #fff;
            overflow: hidden;
            span {
                flex: 1;
                text-align: center;
                padding: 11px 0;
                color: $main-color;
                font-size: 13px;
                /*px*/
            }
            .active_span {
                color: #fff;
                background-color: $main-color;
            }
        }
        /deep/ .img {
            width: 100px !important;

            color: #fff;

            background-color: red;
            text-align: center;
            .ex_name {
                font-size: 14px;
                /*px*/
                padding: 5px 0;
            }
            .ex_enter {
                font-size: 12px;
                /*px*/
                .iconfont {
                    color: #fff;
                    font-size: 16px;
                    /*px*/
                }
            }
        }
    }
</style>
