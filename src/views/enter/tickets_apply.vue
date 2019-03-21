<template>
  <div class="ticket_box">
    <div class="ticket_banner"><img src="~img/bg.png" alt=""></div>
    <div class="btn_box">
      <router-link tag="span" to="/enter/choose_date">个人门票预约</router-link>
      <span @click="show_team=true">团队门票预约</span>
    </div>
    <div class="btn_box">
      <router-link tag="span" to="/enter/order_list" class="record">预约记录/退票</router-link>
    </div>
    <div class="ticket_content">
      <div class="p">观众参观预约须知:</div>
      <div class="" v-html="ticket_info.remark"></div>
      <!--<ul>-->
      <!--<li>一、嘉善县博物馆实行免费参观制度（特展除外），观众可凭二代身份证等有效证件自北门入馆。</li>-->
      <!--<li>二、预约服务系统自2018年12月12日上线，观众需至少提前 一天在“嘉善县博物馆”官方微信预约，参观当天凭预约时使用 的本人二代身份证从北门东侧入馆参观，一人一证。</li>-->
      <!--<li> 三、目前参观预约仅提供个人参观预约，预约采取实名制，请提供预约人真实姓名、联系方式、二代身份证号码等信息，每人每次最多为5人预约，每个身份证每天只能预约1次。</li>-->
      <!--</ul>-->
    </div>
    <div class="team_ticket" v-if="show_team">
      <div class="team_item">
        <div class="team_tips">拨打{{ticket_info.team_contact_phone}}预约团队参观？</div>
        <div class="team_btn"><span class="cancel_btn" @click="show_team=false">取消</span>
          <span class="confirm_btn"><a :href="'tel:'+ticket_info.team_contact_phone">确定</a></span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'tickets_apply',

  data() {
    return {
      show_team: false,
      ticket_info: {},
      team_contact_phone: ''
    }
  },
  created() {
    this.getTicket()
  },
  methods: {
    // 获取票务基本信息
    getTicket() {
      this.$api.Ticket().then(res => {
        console.log(res)
        this.ticket_info = res.data[0];
        this.team_contact_phone = res.data[0].team_contact_phone;
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.ticket_box {
  .ticket_banner {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 100%;
    }
  }

  .btn_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 18px 0 18px;

    span {
      width: 45%;
      text-align: center;
      background-color: $main-color;
      padding: 13px 0 16px 0;
      font-size: 16px;
      /*px*/
      color: #fff;
      border-radius: 22px;

      &:active {
        opacity: .7;
      }
    }

    .record {
      width: 100%;
    }
  }

  .ticket_content {
    padding: 24px 18px;

    .p {
      font-size: 15px;
      /*px*/
      padding: 0 0 10px 0;
    }

    ul li {
      font-size: 12px;
      /*px*/
      line-height: 24px;
      text-align: justify;
    }
  }

  .team_ticket {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    padding: 100px 0 0 0;

    .team_item {
      width: 70%;
      margin: 0 auto;
      background-color: #fff;
      overflow: hidden;
      border-radius: 4px;
      /*no*/
      font-size: 13px;

      /*px*/
      .team_tips {
        text-align: center;
        padding: 30px 0;
      }

      .team_btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 16px 0;
        margin: 0 15px;
        border-top: 1px solid #D2D2D2;

        /*no*/
        .cancel_btn {
          flex: 1;
          text-align: center;
          color: #858585;
        }

        .confirm_btn {
          text-align: center;
          flex: 1;

          a {
            color: #E54657;
            display: inline-block;
          }
        }

      }
    }
  }
}

</style>
