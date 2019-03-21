<template>
  <div class="detail">
    <div class="detail__title">预约详情</div>
    <ul class="detail__info">
      <li>
        <p>
          <span>订单编号：{{detail.order_sn}}</span>
          <span class="status__txt">{{detail.order_status_show}}</span>
        </p>
      </li>
      <li>
        <p>参观日期：{{detail.t_date}}</p>
        <p>预约时间：{{detail.add_time}}</p>
      </li>
    </ul>
    <ul class="detail__list" v-if="detail.item.length>0" v-for="(a,ai) in detail.item" :key="ai">
      <li>
        <label>{{a.toi_username}}<small>成人票</small></label>
        <!-- toi_status  1待取票 2待检票 3已检票 5已过期 6已退票 55已取消 -->
        <span class="list__status yellow" @click="toggleQrcode(ai)" v-if="a.tickets[0].toi_status==1||a.tickets[0].toi_status==2">{{ai === toggleIndex?'收起':'检票二维码'}}</span>
        <span class="list__status green" v-else-if="a.tickets[0].toi_status==3">{{a.tickets[0].toi_status_show}}</span>
        <span class="list__status gray" v-else>{{a.tickets[0].toi_status_show}}</span>
      </li>
      <li>
        <label>身份证</label>
        <span>{{a.toi_card_num}}</span>
      </li>
      <li v-if="a.tickets.length>0">
        <label v-for="(b,bi) in a.tickets"><span class="select_icon" :class="{'on':refundId.indexOf(b.titem_id) != -1}" v-if="b.can_refund && isRefund" @click="checkRefund(b.titem_id)"></span>{{b.ticket_name}}</label>
      </li>
      <li v-show="(a.tickets[0].toi_status==1||a.tickets[0].toi_status==2) && a.tickets[0].qp_qrcode && ai === toggleIndex">
        <div class="qrcode"><img :src="a.tickets[0].qp_qrcode"></div>
      </li>
    </ul>
    <transition-group name="slid_up">
      <div class="detail__refund" v-if="detail.can_refund && refundId.length==0" @click="isRefund=!isRefund" key="btn1"><span>退票</span></div>
      <div class="detail__refund" v-if="refundId.length>0" key="btn2" @click="refundLayerStatus=1"><span>确认退票</span></div>
    </transition-group>
    <transition name="fade">
      <div class="cover" v-show="refundLayerStatus" @click="refundLayerStatus=0" @touchmove.prevent></div>
    </transition>
    <div class="modal" v-if="refundLayerStatus==1" key="modal1">
      <div class="modal__body">
        <div class="confrim">确定提交退票申请吗？</div>
      </div>
      <div class="modal__foot">
        <span @click="refundLayerStatus=0">取消</span>
        <span @click="refund">确定</span>
      </div>
    </div>
    <div class="modal" v-if="refundLayerStatus==2" key="modal2">
      <div class="modal__body">
        <div class="success">
          <div class="icon__status">
            <i class="iconfont iconkongxinduigou"></i>
            <p>退票成功!</p>
          </div>
          <div>您已成功退票，其余门票请准时到馆参观</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
export default {
  name: 'order_detail',
  props: [],
  data() {
    return {
      id: '',
      // list: [{
      //   torder_id: 1,
      //   name: "王欣欣",
      //   idCard: "12010222938477839210",
      //   ticket: "参观门票"
      // }, {
      //   torder_id: 2,
      //   name: "王欣欣",
      //   idCard: "12010222938477839210",
      //   ticket: "参观门票"
      // }, {
      //   torder_id: 3,
      //   name: "王欣欣",
      //   idCard: "12010222938477839210",
      //   ticket: "参观门票"
      // }, ],
      detail: {
        item: [{
          tickets: [{
            "titem_id": "",
            "ticket_id": "",
            "ticket_name": "",
            "toi_status": 0,
            "toi_status_show": "", //门票状态
            "can_refund": false, //门票退票标记位
          }]
        }]
      },
      toggleIndex: "",
      isRefund: false,
      refundId: [],
      refundLayerStatus: 0, //1确认退票，2、成功
    };
  },
  components: {

  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
  },
  mounted() {
    // console.log(this.list)
    // 
  },
  computed: {

  },
  methods: {
    getDetail() {
      // let res = {
      //   "status": 1,
      //   "msg": "",
      //   "data": {
      //     "torder_id": 34, //预约单id
      //     "order_sn": "JS19030714273783", //预约单号
      //     "order_status": 66, //订单状态，1待审核，2待付款，3已完成（已付款），5已取消，6已退款
      //     "add_time": "2019-03-07 14:27:07", //下单时间
      //     "contact_phone": "13821430922", //联系电话
      //     "t_date": "2019-03-09", //参观日期
      //     "order_status_show": "部分退票", //显示的状态
      //     "can_refund": false, //订单退票标记位
      //     // 预约信息
      //     "item": [{
      //         "toi_username": "lijinyu", //姓名
      //         "toi_cardtype": "身份证", //证件类型名称
      //         "toi_card_num": "110***********4696", //证件号码
      //         "qp_qrcode": "http://192.168.11.253:8407/qrcodes/p_b5a50b3c64d23a0ada0cbc4b59024b8d.png", //取票二维码url，空值则不能取票
      //         "tickets": [{
      //           "titem_id": 53,
      //           "ticket_id": 1,
      //           "ticket_name": "门票",
      //           "toi_status": 6,
      //           "toi_status_show": "已退票", //门票状态
      //           "can_refund": false, //门票退票标记位
      //         }]
      //       },
      //       {
      //         "toi_username": "ljd",
      //         "toi_cardtype": "身份证",
      //         "toi_card_num": "110***********3431",
      //         "qp_qrcode": "http://192.168.11.253:8407/qrcodes/p_fce4a1a6c3ab460c26319039ea221679.png",
      //         "tickets": [{
      //           "titem_id": 54,
      //           "ticket_id": 1,
      //           "ticket_name": "门票",
      //           "toi_status": 3,
      //           "toi_status_show": "已检票",
      //           "can_refund": false
      //         }]
      //       }
      //     ]
      //   }
      // }

      Indicator.open({
        text: '数据加载...',
        spinnerType: 'fading-circle'
      });
      this.$api.OrderDetail(this.id).then((res) => {
        // console.log(res);
        Indicator.close();
        this.detail = res.data;
      })
    },
    toggleQrcode(index) {
      let v = this;
      v.toggleIndex = index !== v.toggleIndex ? index : "";
    },
    checkRefund(id) {
      let v = this;
      let index = v.refundId.indexOf(id);
      index == -1 ? v.refundId.push(id) : v.refundId.splice(index, 1);
    },
    showConfirm(val) {
      let v = this;
      v.refundLayerStatus = val;
    },
    refund() {
      let v = this;
      if (v.U.Exp.isArray(v.refundId) && v.refundId.length) {
        v.refundLayerStatus = 0;
        Indicator.open({
          text: '处理中...',
          spinnerType: 'fading-circle'
        });
        let idstr = v.refundId.join(',');
        setTimeout(() => {
          v.$api.OrderRefund(idstr).then((res) => {
            Indicator.close();
            // console.log(res)；
            if (res.status == 1) {
              Toast({
                message: '退票成功！',
                iconClass: 'iconfont iconduigou',
                position: 'center',
                duration: 3000
              });
              v.isRefund = false;
              v.refundId = [];
              v.getDetail(); //重新获取订单信息
            } else {
              Toast({
                message: res.msg,
                position: 'center',
                duration: 3000
              });
            }
          })
        }, 800)
      }
    }
  }
};

</script>
<style lang="scss" scoped>
.detail {
  min-height: 100vh;
  padding: 20px 15px 110px;
  background-color: #FFF;

  &__title {
    color: #45474E;
    text-align: center;
    font-size: 18px;
  }

  &__info {
    margin-top: 20px;

    li {
      padding: 5px 0;
      font-size: 13px;


      &:nth-of-type(1) {
        border-bottom: 1px solid #D2D2D2;
      }

      .status__txt {
        color: #ED5565;
      }

      p {
        line-height: 1.8;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &__list {
    padding: 10px;
    border-radius: 2px;
    margin-top: 10px;
    background-color: #F3F3F3;

    li {
      display: flex;
      font-size: 13px;

      &+li {
        margin-top: 12px;
      }

      label {
        min-width: 50px;
        display: flex;
        align-items: center;

        small {
          margin-left: 5px;
          color: #8D8D8D;
          font-size: 10px;
        }

        span.select_icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 5px;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('~img/no_selected.png');

          &.on {
            background-image: url('~img/icon_selected.png');
          }
        }
      }

      >span {
        flex: 1;

        &.list__status {
          text-align: right;

          &.yellow {
            color: #FF9E04;
          }

          &.green {
            color: #4FCB7B;
          }

          &.gray {
            color: #8D8D8D;
          }
        }
      }

      .qrcode {
        width: 124px;
        height: 124px;
        margin: 0 auto;
      }
    }
  }

  &__refund {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 30px 0;
    background-color: #FFF;

    span {
      display: block;
      width: 300px;
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      margin: 0 auto;
      background-color: #FF9E04;
      border-radius: 22px;
      transition: all .2s ease-in-out 0s;

      &:active {
        opacity: .7;
      }

    }

  }
}


.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 100;
}

.modal {
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 101;
  transform: translate(-50%, -50%);
  background-color: #fff;
  font-size: 13px;
  border-radius: 4px;

  &__body {
    color: #858585;
    text-align: center;
    margin: 0 10px;
    border-bottom: 1px solid #D2D2D2;

    .confrim,
    .success {
      padding: 30px 0;
    }

    .icon__status {
      color: #4FCB7B;
      margin-bottom: 10px;

      .iconkongxinduigou {
        display: block;
        font-size: 37px;
        color: #4FCB7B;
        margin-bottom: 10px;
      }
    }
  }

  &__foot {
    display: flex;

    span {
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: block;

      &:active {
        opacity: .7;
      }

      &:nth-of-type(2) {
        color: #FF9E04;
      }
    }
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slid_up-enter-active,
.slid_up-leave-active {
  transition: all 0.3s;
}

.slid_up-enter,
.slid_up-leave-active {
  transform: translate3d(0, 100%, 0);
}

</style>
