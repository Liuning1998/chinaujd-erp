<template>
  <div class="container">
    <el-header>
      <el-row type="flex" align="middle">
        <el-col :span="12" class="left">
          <p @click="goHomePage">
            <span>数字化集邮服务管理系统</span>
          </p>
        </el-col>
        <el-col :span="12" class="right">
          <i></i>
          <span>{{ name | capitalize }}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="logout" @click="logout">退出</span>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
// import {logout} from '@/api/request.js';
export default {
  name: 'Index',
  data () {
    return {
      name: '18210652597',
    }
  },
  created() {
    // this.getUser();
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      return value.substr(0,3) + "****" + value.substr(7);
    }
  },
  methods: {
    // 看板页
    goHomePage() {
      if (['/welcome', '/index'].includes(this.$route.name)) {
        return;
      }
      this.$router.push('/welcome');
    },
    getUser() {
      this.name = sessionStorage.getItem('name');
    },
    // 退出
    logout() {
      this.$confirm('确定退出登录吗?', '请选择', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      }).then(() => {
        let params={
          userId: this.$store.state.userId
        };
        logout(params).then(() => {
          this.$store.commit('del_token');
          this.$store.commit('del_name');
          this.$store.commit('del_userId');
          this.$router.push('/login');
        });
      }).catch(() => {});
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 21,41,0.12);
    >>>.el-header {
      padding: 0;
    }
    .left {
      font-family: PingFang-SC-Heavy;;
      font-size: 20px;
      color: #333;
      margin-left: 24px;
      p {
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666;
      line-height: 22px;
      margin-right: 24px;
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url('../assets/images/head/icon_top_head.png') no-repeat top center;
        margin-right: 8px;
        border-radius: 50%;
      }
      >.logout {
        color: #999;
        cursor: pointer;
      }
    }
  }
</style>
