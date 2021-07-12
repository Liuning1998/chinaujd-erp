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
        background: rgb(243, 248, 249);
    }
    .container>>>.el-header {
        padding: 0!important;
    }
    .container>>>.el-aside {
        background: #fff;
    }
    .container>>>.el-main {
        height: 100vh;
        margin: 10px 10px 0 10px;
        padding: 0;
    }
</style>
