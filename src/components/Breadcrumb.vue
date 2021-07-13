<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
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
    height: 55px;
    line-height: 55px !important;
  }

  .el-breadcrumb__inner {
    color: #333333;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #017FC5;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #017FC5;
  }

  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    font-weight: normal;
    color: #333;
  }
</style>
