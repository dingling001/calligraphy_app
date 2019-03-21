<template>
  <div class="info">
    <div class="info__block">
      <div class="info__title">填写预约信息</div>
      <div class="info__block__item" @click="$router.replace('/enter/choose_date')">
        <div class="lt">参观时间</div>
        <div class="rt date">{{visitDate}}<i class="iconfont iconicon_on_the_right"></i></div>
      </div>
    </div>
    <div class="info__line"></div>
    <div class="info__block">
      <div class="info__list" v-if="infoList.length">
        <ul v-for="(a,i) in infoList" :key="i">
          <li>
            <label>{{a.username}}</label>
            <span class="del_btn" @click="delThis(i)">删除</span>
          </li>
          <li>
            <label>{{a.card_type}}</label>
            <span>{{a.idcard}}</span>
          </li>
          <li>
            <label>成人票</label>
            <span>{{a.ticket}}</span>
          </li>
        </ul>
      </div>
      <div class="info__block__item pdr">
        <div class="lt">添加参观者（限5人）</div>
        <div class="rt right">
          <span class="add_btn" @click="addNewVisitor">+ 添加参观者</span>
        </div>
      </div>
      <div class="info__block__item">
        <div class="lt">手机号</div>
        <div class="rt"><input type="text" v-model.trim="phone" placeholder="请输入手机号" maxlength="11"></div>
      </div>
    </div>
    <div class="info__notice">
      <p>观众参观购票须知：</p>
      <p>1、每名成人最多可携带两名1.3m以下的儿童。</p>
      <p>2、网上预约或注册用户时，请务必提供真实有效身份信息，并正确填写，如填写错误，将有可能无法领取参观票。</p>
    </div>
    <div class="info__submit"><span :class="{'disabled':disabled}" @click="submitInfo">提交信息</span></div>
    <transition name="fade">
      <div class="cover" v-show="showAddModal" @click="showAddModal=!showAddModal" @touchmove.prevent></div>
    </transition>
    <transition name="slid_up">
      <div class="info__fill" v-show="showAddModal">
        <div class="info__block">
          <div class="info__block__item">
            <div class="lt">选择门票类型</div>
            <div class="rt checkbox">成人票</div>
          </div>
          <div class="info__block__item">
            <div class="lt">观众姓名</div>
            <div class="rt"><input type="text" v-model.trim="edit.username" placeholder="请输入姓名" /></div>
          </div>
          <div class="info__block__item">
            <div class="lt">证件类型</div>
            <div class="rt">
              <select v-model="edit.cardtype_id" @change="changeSelected">
                <option v-for="(a,i) in cardType" :value="a.cardtype_id" :key="i">
                  {{a.card_type}}
                </option>
              </select>
            </div>
          </div>
          <div class="info__block__item">
            <div class="lt">证件号码</div>
            <div class="rt"><input type="text" v-model.trim="edit.idcard" placeholder="请输入证件号码"></div>
          </div>
          <div class="info__block__item">
            <div class="lt">选择门票</div>
            <div class="rt check_ticket on">{{ticketInfo.ticket_name}}</div>
          </div>
        </div>
        <ul class="info__fill--btns">
          <li class="reset" @click="resetInfo">重置</li>
          <li class="confirm" @click="addVisitor">确定添加</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
export default {
  name: 'fill_info',
  props: [],
  data() {
    return {
      showAddModal: false,
      visitDate: localStorage.choose_date || "",
      ticketInfo: "", //门票信息
      cardType: [{
        'card_type': '身份证',
        'cardtype_id': 1
      }], //证件类型
      infoList: [
        // {
        //   'username': "王欣欣",
        //   'card_type':"身份证",
        //   'idcard': "12010222938477839210",
        //   'cardtype_id': 1,
        //   'ticket': "参观门票"
        // },
      ],
      disabled: true,
      edit: {
        username: '', //姓名
        cardtype_id: 1, //证件id（类型、默认1身份证）
        card_type: '身份证', //证件号
        idcard: '', //证件号
      },

      ticket_id: 1, //门票id（目前仅一张门票）
      td_id: localStorage.yy_info ? JSON.parse(localStorage.yy_info).td_id : "", //日期id
      phone: '', //联系电话
    };
  },
  created() {
    let v = this;
    v.infoList = v.U.Local.get('yy_userinfo') || [];
    v.getTicket();
  },
  mounted() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      [].forEach.call(document.querySelectorAll("input,select"), function(el) {
        // Add event listener
        el.addEventListener("blur", function(event) {
          event.preventDefault();
          setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
          }, 100);
        }, false);
      });
    }
  },
  computed: {

  },
  methods: {

    getTicket() {
      let v = this;

      v.$api.TicketDetail().then(res => {
        // console.log(res);
        v.ticketInfo = res.data.ticket; //门票信息
        v.cardType = res.data.cardtype; //证件信息
        v.edit.cardtype_id = res.data.cardtype[0].cardtype_id; //option默认选中
      })
    },
    changeSelected(othis) {
      let v = this;
      let othis_id = othis.target.value;
      v.cardType.forEach((o) => {
        if (o.cardtype_id == othis_id) {
          v.edit.card_type = o.card_type;
        }
      });
    },
    delThis(i) {
      let v = this;
      v.infoList.splice(i, 1);
      v.U.Local.set('yy_userinfo', v.infoList);
      if (v.infoList.length == 0) {
        v.disabled = true;
        v.U.Local.remove('yy_userinfo');
      }
    },
    /**
     * @打开新增弹层
     */
    addNewVisitor() {
      let v = this;
      if (v.infoList.length == 5) {
        Toast('最多能预定5张门票');
        return false;
      } else {
        v.showAddModal = true;
      }
    },
    /**
     * @新增单项
     */
    addVisitor() {
      let v = this;

      if (!v.edit.username) {
        Toast('*请输入正确的姓名');
        return;
      }
      if (Number(v.edit.cardtype_id) == 1) {
        //身份证
        if (!v.U.idCodeValid(v.edit.idcard)) {
          Toast('*请输入正确的证件号');
          return;
        }
      } else {
        //其他证件
        if (v.edit.idcard.length < 5) {
          Toast('*请输入正确的证件号');
          return;
        }
      }
      var lastTime = 0;
      var nowTime = new Date().getTime();
      if (nowTime - lastTime > 500) {
        v.infoList.push({
          'username': v.edit.username,
          'idcard': v.edit.idcard,
          'card_type': v.edit.card_type,
          'cardtype_id': v.edit.cardtype_id,
          'ticket': v.ticketInfo.ticket_name
        });
        v.U.Local.set('yy_userinfo', v.infoList);
        v.showAddModal = false;
        v.disabled = false;
        v.resetInfo();
        lastTime = nowTime;
      } else {
        Toast('请勿频繁操作');
      }
    },
    /**
     * @重置
     */
    resetInfo() {
      let v = this;
      v.edit.username = '';
      v.edit.idcard = '';
      v.edit.cardtype_id = 1;
      v.edit.card_type = '身份证';
    },
    submitInfo() {
      let v = this;
      if (!v.disabled) {
        let list = v.infoList;
        let len = v.infoList.length;

        if (!len) {
          Toast('*请添加参观者');
          return;
        }
        if (!v.phone) {
          Toast('*请输入手机号');
          return;
        } else if (!/^1\d{10}$/.test(v.phone)) {
          Toast('*请输入正确手机号');
          return;
        }
        let ticket_id = v.ticket_id;
        let td_id = v.td_id;
        let contact_phone = v.phone;
        let toi_username = list.map(res => {
          return res.username;
        });
        let toi_cardtype_id = list.map(res => {
          return res.cardtype_id;
        });
        let toi_card_num = list.map(res => {
          return res.idcard;
        });
        Indicator.open({
          text: '处理中...',
          spinnerType: 'fading-circle'
        });
        setTimeout(() => {
          v.$api.TicketSubmit(ticket_id, td_id, contact_phone, toi_username, toi_cardtype_id, toi_card_num).then((res) => {
            Indicator.close();
            // console.log(res);
            if (res.status == 1) {
              v.$router.replace('/enter/success');
              v.U.Local.remove('yy_userinfo');
              v.U.Local.remove('yy_info');
              v.U.Local.remove('activeNum');
              v.U.Local.remove('choose_date');
              v.U.Local.remove('choose_week');
            } else {
              Toast({
                message: res.msg,
                position: 'center',
                duration: 3000
              });
            }
          })
        }, 800)
      } else {
        Toast('请确认信息是否填写正确!!');
      }
    },
    getJson() {
      let res = {
        "status": 1,
        "msg": "",
        "data": {
          "ticket": {
            "ticket_id": 1,
            "ticket_name": "门票",
            "yy_min_days": 0,
            "yy_max_days": 7,
            "default_price": 0,
            "info": "",
            "remark": "",
            "yy_stock": 500,
            "nyy_stock": 500,
            "yy_date": [{
                "td_id": 29,
                "t_date": "2017-09-21",
                "t_date_show": "9月21日 周四",
                "yy_stock_last": 500
              },
              {
                "td_id": 30,
                "t_date": "2017-09-22",
                "t_date_show": "9月22日 周五",
                "yy_stock_last": 500
              },
              {
                "td_id": 31,
                "t_date": "2017-09-23",
                "t_date_show": "9月23日 周六",
                "yy_stock_last": 500
              },
              {
                "td_id": 32,
                "t_date": "2017-09-24",
                "t_date_show": "9月24日 周日",
                "yy_stock_last": 500
              },
              {
                "td_id": 33,
                "t_date": "2017-09-25",
                "t_date_show": "9月25日 周一",
                "yy_stock_last": 500
              },
              {
                "td_id": 34,
                "t_date": "2017-09-26",
                "t_date_show": "9月26日 周二",
                "yy_stock_last": 500
              },
              {
                "td_id": 35,
                "t_date": "2017-09-27",
                "t_date_show": "9月27日 周三",
                "yy_stock_last": 500
              },
              {
                "td_id": 36,
                "t_date": "2017-09-28",
                "t_date_show": "9月28日 周四",
                "yy_stock_last": 500
              }
            ],
            "date_show": "长期有效"
          },
          "cardtype": [{
              "cardtype_id": 1,
              "card_type": "身份证"
            },
            {
              "cardtype_id": 2,
              "card_type": "护照"
            },
            {
              "cardtype_id": 3,
              "card_type": "台湾居民来往大陆通行证"
            },
            {
              "cardtype_id": 4,
              "card_type": "港澳居民来往内地通行证"
            },
            {
              "cardtype_id": 5,
              "card_type": "军官证"
            },
            {
              "cardtype_id": 6,
              "card_type": "其它"
            }
          ],
          "top_show": "未登录用户只能预约一张免费门票，需预约多张门票请登录后预约。"
        }
      }
      return res;
    },
  },
};

</script>
<style lang="scss" scoped>
.info {
  min-height: 100vh;
  background-color: #FFF;
  padding-bottom: 110px;

  &__line {
    height: 10px;
    background-color: #F3F3F3;
  }

  &__notice {
    padding: 20px 15px;

    p {
      line-height: 1.5;
      font-size: 11px;
      color: #FC8995;
    }
  }

  &__block {
    padding: 20px 15px;
    background-color: #fff;

    // &+& {
    //   margin-top: 10px;
    // }
    // 
    &__item {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &+& {
        margin-top: 12px;
      }

      &.pdr {
        border-bottom: 1px solid #D2D2D2;
        padding-bottom: 10px;
      }

      .lt {
        min-width: 25%;
      }

      .rt {
        flex: 1;

        &.date {
          color: #ED5565;
          display: flex;
          justify-content: space-between;

          i {
            color: #576882;
            font-size: 10px;
          }
        }

        &.right {
          text-align: right;

          .add_btn {
            display: inline-block;
            width: 90px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            color: #FF9E04;
            border: 1px dashed #FF9E04;
            border-radius: 3px;
            transition: all .2s ease-in-out 0s;

            &:active {
              transform: scale(1.05);
            }
          }
        }

        &.checkbox {
          &:before {
            content: "";
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 8px;
            background: url('~img/icon_selected.png') center center / 100% 100% no-repeat;
          }
        }

        &.check_ticket {
          &:before {
            content: "";
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 8px;
            background-position: center center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('~img/no_selected.png');
          }

          &.on {
            &:before {
              background-image: url('~img/icon_selected.png');
            }
          }
        }
      }
    }
  }

  &__title {
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }



  &__list {

    ul {
      padding: 10px;
      border-radius: 3px;
      border: 1px solid #D2D2D2;
      margin-bottom: 12px;

      li {
        display: flex;
        font-size: 12px;

        &+li {
          margin-top: 12px;
        }

        label {
          width: 50px;
        }

        span {
          flex: 1;

          &.del_btn {
            color: #ED5565;
            text-align: right;
          }
        }

      }
    }
  }

  &__submit {
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

      &.disabled {
        background-color: #D2D2D2;
      }
    }



  }

  &__fill {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 204;

    &--btns {
      display: flex;

      height: 50px;
      line-height: 50px;
      color: #fff;

      li {
        text-align: center;
        width: 50%;

        &+li {
          // border-left: 1px solid #fff;
        }

        &:active {
          opacity: .7;
        }

      }

      .reset {
        background-color: #D2D2D2;
      }

      .confirm {
        background-color: #FF9E04;
      }
    }
  }

  input,
  select {
    width: 100%;
    height: 35px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(210, 210, 210, 1);
    padding: 0 15px;
    outline: 0;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  input {
    &::placeholder {
      color: #D2D2D2;
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
  z-index: 203;
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
