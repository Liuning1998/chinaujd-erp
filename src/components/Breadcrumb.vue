<template>
  <el-breadcrumb class="app-breadcrumb">
    <template v-for="item in levelList">
      <el-breadcrumb-item :to="item.path" :key="item.path" v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
  export default {
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      getBreadcrumb() {
        this.levelList = this.$route.matched;
      }
    }
  }
</script>

<style>
  .app-breadcrumb {
    height: 44px;
    line-height: 44px !important;
  }

  .el-breadcrumb__inner {
    font-size: 12px;
    color: #868686;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #333;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #409eff;
    cursor: pointer;
  }

  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    font-weight: normal;
    color: #868686;
  }
</style>
