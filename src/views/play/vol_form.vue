<template>
    <div class="f_box">
        <div class="f_title">申请信息填写</div>
        <div class="f_info">个人信息</div>
        <div class="a_parent">
            <div class="a_input">
                <span class="span"><span class="a_require">*</span>姓名：</span>
                <input type="text" placeholder="请输入姓名" class="input" v-model="name">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 身份证号：</span>
                <input type="text" placeholder="请输入身份证号码" class="input" v-model="id_card">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 民族：</span>
                <input type="text" placeholder="请输入民族信息" class="input" v-model="nation">
            </div>
            <div class="a_input" @click="popupVisible=true">
                <span class="span"><span class="a_require">*</span> 学历：</span>
                <div class="input picker_item">
                    <span v-if="degree">{{degree}}</span>
                    <span v-else style="color:#878787 ">请选择学历</span>
                    <span class="iconfont iconxiangyou"></span>
                </div>
            </div>
            <div class="a_input" @click="regionVisible=true">
                <span class="span"><span class="a_require">*</span> 居住地区：</span>
                <div class="input picker_item">
                    <!-- <span v-if="province&&city">{{province}}-{{city}}</span> -->
                    <span v-if="areaString">{{areaString}}</span>
                    <span v-else style="color:#878787 ">请居住地区</span>
                    <span class="iconfont iconxiangyou"></span>
                </div>
                <!--<input type="text" placeholder="请输入民族信息（必填）" class="input">-->
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 详细地址：</span>
                <input type="text" placeholder="请输入详细地址" class="input" v-model="address">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 联系电话：</span>
                <input type="text" placeholder="请输入联系电话" class="input" v-model="phone">
            </div>
            <div class="a_input">
                <span class="span"><span class="a_require">*</span> 入会须知：</span>
                <span class="input agree">《嘉善县博物馆志愿者管理办法》</span>
            </div>
        </div>
        <div class="agree_box" @click="agree_show=!agree_show">
            <div class="icon_box">
                <div class="iconfont icontongyi" v-if="agree_show"></div>
            </div>
            <div>我已阅读并同意以上条款与条件</div>
        </div>
        <div class="f_btn" @click="post_form">提交</div>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="edu_list" valueKey="1" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
            <!-- <mt-picker :slots="myAddressSlots" valueKey="region_name" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker> -->
            <mt-picker :slots="slots" @change="onCityValuesChange"></mt-picker>
            <!--@change="addressChange"-->
        </mt-popup>
    </div>
</template>
<script>
    import {Indicator, Toast} from 'mint-ui';
    // import cityData from '../../../static/city.json';

    let province, city, area;
    // let data = cityData.data;
    let index1 = 0;
    let index2 = 0;
    export default {
        name: "vol_form",
        data() {
            return {
                agree_show: false,
                popupVisible: false,
                edu_list: [{
                    flex: 1,
                    values: ['专科', '本科', '研究生', '其他'],
                    className: 'slot',
                    textAlign: 'center'
                },],
                region: '', //三级地址
                province: '', //省
                city: '', //市
                area: '', //县
                regionVisible: false, //弹出框是否可见
                regionInit: false, //禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
                //地址picker组件插槽
                slots: null,
                areaString: '',
                name: '',
                id_card: "",
                nation: '',
                degree: '',
                region_id: '', //已选区域id,
                phone: '',
                address: '',
                data:[]
            }
        },
        beforeCreate() {
            // console.log(this.$api.City)
            this.$api.City().then(res => {
                let data = res.data;
                this.data=res.data;
                // 初始化省
                province = data.map(res => {
                    return res.region_name
                });
                // 初始化市
                city = data[index1].nodes.map(res => {
                    return res.region_name
                });
                // 初始化区
                area = data[index1].nodes[index2].nodes.map(res => {
                    return res.region_name
                });
                this.slots = [{
                    flex: 1,
                    values: province,
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: city,
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: area,
                    className: 'slot5',
                    textAlign: 'center'
                }]
            });

        },
        computed: {},
        methods: {
            onValuesChange(picker, values) {
                this.degree = values[0];
            },
            onCityValuesChange(picker, values) {
                if (this.regionInit) {
                    // console.log(values)
                    let one = values[0];
                    let two = values[1];
                    let three = values[2];
                    index1 = province.indexOf(one);
                    if (index1 >= 0 && province.length > 0) {
                        city = this.data[index1].nodes.map(res => {
                            return res.region_name
                        })
                        picker.setSlotValues(1, city)
                        two = values[1]
                    }

                    index2 = city.indexOf(two)
                    if (index2 >= 0 && city.length > 0) {
                        area = this.data[index1].nodes[index2].nodes.map(res => {
                            return res.region_name
                        })
                        picker.setSlotValues(2, area)
                        three = values[2]
                    }
                    if (index1 >= 0 && index2 >= 0) {
                        this.data[index1].nodes[index2].nodes.forEach(res => {
                            if (res && res.region_name == three) {
                                this.region_id = res.region_id;
                            }
                        })
                    }
                    this.areaString = values.join(' ');
                } else {
                    this.regionInit = true;
                }
            },
            // 提交
            post_form() {
                let idcardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                    telReg = /^1[34578]\d{9}$/,
                    name = this.name,
                    id_card = this.id_card,
                    nation = this.nation,
                    degree = this.degree,
                    region_id = this.region_id,
                    phone = this.phone,
                    address = this.address;
                //     post = {
                //         name,
                //         id_card,
                //         nation,
                //         degree,
                //         region_id,
                //         phone,
                //         address,
                //     };
                // console.log(post)
                if (name == '') {
                    Toast('请输入姓名')
                } else if (!idcardReg.test(id_card)) {
                    Toast('请输入正确的身份证号')
                } else if (nation == '') {
                    Toast('请输入名族')
                } else if (degree == '') {
                    Toast('请选择学历')
                } else if (address == '') {
                    Toast('请填写详细地址')
                }
                else if (!telReg.test(phone)) {
                    Toast('请输入正确的手机号')
                }
                else if (!this.agree_show) {
                    Toast('请同意条款与条件')
                } else {
                    this.$api.VolunteerInfoSubmit(name,
                        id_card,
                        nation,
                        degree,
                        region_id,
                        phone,
                        address,).then(res => {
                        if (res.status == 0) {
                            Toast(res.msg)
                        } else {

                        }
                        console.log(res)
                    })
                }
            }
        },
    }

</script>
<style scoped lang="scss">
    .f_box {
        padding: 0 15px;

        /deep/ .mint-popup {
            width: 100%;
        }

        .f_title {
            text-align: center;
            padding: 15px 0;
            font-weight: bold;
            font-size: 18px;
            /*px*/
            color: #45474E;
            border-bottom: 1px solid #F0F0F0;
            /*no*/
        }

        .f_info {
            color: #878787;
            font-size: 15px;
            /*px*/
            padding: 15px 0;
        }

        .a_parent {
            background-color: #fff;
            margin-bottom: 10px;

            .a_input {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #C8C8C8;
                /*no*/
                color: #2A2A2A;
                font-size: 15px;

                /*px*/
                .span {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    text-align: justify;
                }

                .input {
                    flex: 2;
                    padding: 16px 0;
                    border: 0;

                    &::placeholder {
                        color: #878787;
                    }
                }

                .a_require {
                    color: #848483;
                }

                &:last-child {
                    border: 0;
                }

                .agree {
                    text-decoration: underline;
                    font-size: 14px;
                    /*px*/
                    color: #61B8FE;
                    text-align: justify;
                }

                .picker_item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }

        .agree_box {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 30px;

            .icon_box {
                height: 19px;
                width: 19px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #A8A6A6;
                /*no*/
                margin: 0 10px 0 0;

                .iconfont {
                    color: #C63C44;
                    font-size: 25px;
                    /*px*/
                }
            }
        }
        .f_btn {
            width: 83%;
            margin: 30px auto;
            border-radius: 18px;
            background-color: $main-color;
            color: #fff;
            font-size: 16px;
            /*px*/
            text-align: center;
            padding: 13px 0;
        }
    }

</style>
