<template>
  <div class="success">
    <div class="success__title">预约完成</div>
    <div class="success__tips">
      <div class="success__tips--icon">
        <i class="iconfont iconkongxinduigou"></i>预约成功！
      </div>
      <div class="success__tips--txt">
        参观当日，观众通过在闸机处扫描微信中的二维码电子门票即可进馆参观。或直接使用二代身份证验证进馆。
      </div>
    </div>
    <ul class="success__btns">
      <router-link tag="li" to="/enter/tickets_apply">返回首页</router-link>
      <router-link tag="li" to="/enter/order_list">查看订单</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'success',
  props: [],
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  computed: {

  },
  methods: {

  },
};

</script>
<style lang="scss" scoped>
.success {
  min-height: 100vh;
  padding: 20px 15px;
  background-color: #FFF;

  &__title {
    text-align: center;
    font-size: 18px;
  }

  &__tips {
    text-align: center;
    width: 300px;
    margin: 50px auto 100px;
    font-size: 13px;
    line-height: 2;

    &--icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;

      .iconkongxinduigou {
        font-size: 37px;
        color: #ED5565;
        margin-right: 10px;
      }
    }
  }

  &__btns {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    li {
      width: 138px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      background-color: #FF9E04;
      border-radius: 22px;

      &:active {
        opacity: .7;
      }
    }
  }
}

</style>
