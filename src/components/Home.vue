<template>
    <div class="container">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="240px">
                    <Aside></Aside>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
// 布局容器
import Header from './Header.vue';
import Aside from './Aside.vue';

export default {
    name: 'home',
    components: {
        Header,
        Aside
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style scoped>
    .container {
        background: #F5F5F5;
    }
    .container>>>.el-header {
        height: 48px!important;
        padding: 0!important;
        z-index: 1;
    }
    .container>>>.el-aside {
        min-height: calc(100vh - 48px);
        background: #fff;
        box-shadow: 2px 0 6px 0 rgba(0,21,41,0.12);
    }
    .container>>>.el-main {
        min-height: calc(100vh - 48px);
        margin: 0 16px;
        padding: 0;
    }
</style>
