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
          <span>{{ name }}</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="logout">退出</span>
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
      name: '',
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    // 看板页
    goHomePage() {
      if (this.$route.name === '/board') {
        return;
      }
      this.$router.push('/board');
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

<style scoped>
  .container {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(222,222,222,0.50);
  }
  .container>>>.el-header {
    padding: 0;
  }
  .left {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #2D8CF0;
    margin-left: 53px;
  }
  .left p {
    cursor: pointer;
  }
  .left p>:last-child {
    color: #151515;
  }
  .right {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #2A2A2A;
    line-height: 20px;
    margin-right: 30px;
    text-align: right;
  }
  .right>:last-child {
    font-family: PingFangSC-Medium;
    color: #333333;
    cursor: pointer;
  }
</style>
