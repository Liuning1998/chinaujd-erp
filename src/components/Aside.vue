<template>
    <div class="container">
        <el-menu :default-active="path" router active-text-color="#2D8CF0" @open="handleOpen">
            <template v-for="(item, index) in menu">
                <el-submenu :key="index" v-if="item.children && item.children.length" :index="item.url">
                    <template slot="title">
                        <img :src="is_actice_url === item.url ? iconMaps[item.url][1] : iconMaps[item.url][0]">
                        {{ item.menuName }}
                    </template>
                    <el-menu-item v-for="(value, key) in item.children" :key="key" :index="value.url">
                        <template slot="title">{{ value.menuName }}</template>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="index" :index="item.url">
                    <template slot="title">
                        <img :src="is_actice_url === item.url ? iconMaps[item.url][1] : iconMaps[item.url][0]">
                        {{ item.menuName }}
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import {
    POST_BASE_MENU_ROUTE_LIST
} from '@/api/request.js';

export default {
    name: 'asider',
    data() {
        return {
            menu: [],
            path: '',
            is_actice_url: '/welcome',
            iconMaps: {
                '/welcome': ['', ''],
                '/business': [require('../assets/images/aside/icon_business.png'), require('../assets/images/aside/icon_business_select.png')],
                '/finance': [require('../assets/images/aside/icon_finance.png'), require('../assets/images/aside/icon_finance_select.png')],
                '/management': [require('../assets/images/aside/icon_system.png'), require('../assets/images/aside/icon_system_select.png')]
            },
            menu: [],
        }
    },
    watch: {
        $route: {
            handler() {
                this.getCurrentUrl();
            },
            deep: true,
        }
    },
    created() {
        this.getCurrentUrl();
        this.getUserMenu();
    },
    methods: {
        getUserMenu() {
            POST_BASE_MENU_ROUTE_LIST({
                regSys: '6',
                currentRegSys: sessionStorage.getItem('currentRegSys')
            }).then(res =>{
                this.menu = res;
            });
        },
        getCurrentUrl() {
            this.path = this.$route.meta.value;
            this.is_actice_url = `/${this.$route.meta.value.split('/')[1]}`;
        },
        handleOpen(key) {
            this.path = key;
            this.$router.push({
                path: this.path
            });
            this.getCurrentUrl();
            this.getUserMenu();
        },
    }
}
</script>

<style scoped>
    .container {
        font-family: PingFangSC-Regular;
        margin-top: 20px;
        font-size: 14px;
        color: #666;
    }
    .container>>>.el-menu {
        border-right: 0;

    }
    .container>>>.el-menu .el-submenu .el-submenu__title,
    .container>>>.el-menu .el-submenu .el-menu--inline .el-menu-item {
        height: 40px;
        line-height: 40px;
        margin-bottom: 8px;
        color: #555;
        padding-left: 16px!important;
    }
    .container>>>.el-menu .el-submenu .el-menu--inline .el-menu-item {
        padding-left: 46px!important;
    }
    .container>>>.el-menu .el-menu-item img,
    .container>>>.el-menu .el-submenu img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }
    .container>>>.el-menu .el-submenu .el-menu--inline .is-active {
        border-right: 2px solid #1890FF;
    }
    .container>>>.el-menu .el-menu-item.is-active {
        background: #ecf5ff;
    }
</style>
