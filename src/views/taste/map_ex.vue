<template>
    <div class="e_box">
        <div id="map" class="map_box"></div>
        <div class="two_box" v-if="twoshow">22222222</div>
    </div>
</template>

<script>
    import '../../assets/js/leaflet.js'

    export default {
        name: "map_ex",
        data() {
            return {
                exhibition_id: "",
                info: {},
                lists: [],
                imgWidth: 1488, //图片像素宽
                imgHeight: 1024, //图片像素高
                myMap: null,
                oneshow: false,
                twoshow: false
            }
        },
        created() {
            this.exhibition_id = this.$route.query.exhibition_id;
            this.get_KasOnMap();
        },
        methods: {
            get_KasOnMap() {
                let v = this;
                this.$api.KasOnMap(this.exhibition_id).then(res => {
                    v.info = res.data.exhibition_info;
                    v.lists = res.data.auto_nums;
                    v.$nextTick(function () {
                        v.initMap();
                        v.initMarkers();
                    })
                })
            },
            initMap() {
                var v = this;
                var imgWidth = v.imgWidth;
                var imgHeight = v.imgHeight;
                var imgUrl = v.info.png_map;
                v.myMap = L.map("map", {
                    // 修改坐标系
                    crs: L.CRS.Simple,
                    // 设置最大拖动边界
                    maxBounds: [
                        [-(imgHeight / 2), -(imgWidth / 2)],
                        [imgHeight / 2, imgWidth / 2]
                    ],
                    minZoom: -2.6, // 设置缩放的最小值
                    maxZoom: 2, // 设置地图放大的最大值
                    zoom: -2.6, //设置初始化的缩放值
                    center: [0, 0], //隐藏leaflet
                    zoomControl: false,
                    attributionControl: false
                });
                L.imageOverlay(imgUrl, [
                    [-(imgHeight / 2), -(imgWidth / 2)],
                    [imgHeight / 2, imgWidth / 2]
                ]).addTo(v.myMap).on('load', function () {
                    // v.initMarkers();
                });
            },
            initMarkers() {
                var v = this;
                var imgWidth = v.imgWidth;
                var imgHeight = v.imgHeight;
                var len = v.lists.length;
                for (var i = 0; i < len; i++) {
                    var d = v.lists[i];
                    var nx = d.x - imgWidth * 2;
                    var ny = d.y - imgHeight * 3;
                    var markerContent;
                    var exhibitLen = d.exhibit_list.length;
                    if (exhibitLen == 1) {
                        var o = d.exhibit_list[0];
                        markerContent = `<div class="cell" id="${o.exhibit_id}" data-len="${exhibitLen}">
                                        <div class="cell_icon icon_img">
                                            <img src="${o.map_icon}" alt="" />
                                        </div>
                                    </div><div class="cell_title" id="${o.exhibit_id}" data-len="${exhibitLen}">${o.title}</div>`;
                    } else if (exhibitLen > 1) {
                        markerContent = `<div class="cell"  data-len="${exhibitLen}">
                                        <div class="cell_icon markerbg">
                                            <span>${exhibitLen}</span>
                                        </div>
                                    </div>`;
                    }
                    var myIcon = new L.divIcon({
                        className: "my-exhibits",
                        html: markerContent
                    });
                    var popup = L.popup({
                        className: 'my-exhibits-popup',
                        autoPan: false
                    }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
                    var point = L.marker([ny, nx], {
                        icon: myIcon
                    }).addTo(v.myMap)
                        .bindPopup(popup)
                    // marker.bindPopup(popupContent).openPopup();
                    point.on("click", function (ev) {
                        var target = ev.target;
                        v.myMap.flyTo([500, -50]);
                        var len = this._icon.getElementsByClassName('cell')[0].getAttribute('data-len');

                        if (len == 1) {
                            console.log(len)
                            let one_box = document.getElementsByClassName('one_box')
                            // let index=
                        } else {
                            this.oneshow = false;
                            this.twoshow = true;
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import " ../../assets/css/leaflet.css";

    .e_box {
        min-height: 100vh;
        background-color: #F3F3F3;
        .map_box {
            min-height: 100vh;
            width: 100%;
        }
        /deep/ .leaflet-marker-icon {
            width: auto !important;
            height: auto !important;
            margin: 0 !important;
        }
        /deep/ .cell {
            background-image: url("../../assets/img/bg_marker.png");
            width: 46px;
            height: 59px;
            margin: 0 auto;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            /*flex-direction: column;*/
            .cell_icon {
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border-radius: 50%;
                overflow: hidden;
                width: 30px;
                height: 30px;
                font-size: 20px;
                position: relative;
                /*px*/
                color: $main-color;
                img {
                    width: 100%;
                }
            }
            .markerbg {
                margin-bottom: 10px;
            }
            .icon_img {
                margin-bottom: 12px;
            }
            .one_box {
                display: none;
            }
        }
        /deep/ .cell_title {
            background-color: rgba(0, 0, 0, .6);
            border-radius: 9px;
            margin: 0 auto;
            width: 100px;
            text-align: center;
            padding: 5px 15px;
            @include ellipsis(1);
            font-size: 9px;
            /*px*/
            color: #fff;
        }
        /deep/ .leaflet-popup-pane {
            width: 275px;
            margin: 0 auto;
            box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.16);
            background-color: #fff;
            z-index: 10000;
            position: absolute;
            bottom: 30px;
            left: 0;
            right: 0;
            .leaflet-popup-close-button {
                text-align: right;
                display: block;
                padding: 0 10px;
                color: #C3C1BD;
                font-size: 20px;
                /*px*/
            }
        }
        /deep/ .my-exhibits-popup {
            width: 100%;
            height: 147px;
            left: unset !important;
            transform: none !important;

        }
    }
</style>
