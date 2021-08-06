<template>
  <div class="container">
    <div class="home">
      <img class="home-image" src="~@/assets/images/index/home_image.png" alt="">
      <p class="home-message">欢迎进入邮来邮网数字化集邮服务管理系统</p>
    </div>
    <div class="footer">
      <p>CopyRight 2021  www.chinau.com.cn 版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100vh;
    .home {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      background: #fff;
      height: calc(100vh - 100px);
      border-radius: 2px;
      &-image {
        width: 390px;
        height: 293px;
        margin-top: 124px;
      }
      &-message {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333;
        margin-top: 48px;
        text-align: center;
      }
    }
    .footer {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666;
      p {
        padding: 16px;
        text-align: center;
      }
    }
  }
</style>