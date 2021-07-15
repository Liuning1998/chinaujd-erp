<template>
    <div class="container">
        <el-menu :default-active="path" router active-text-color="#2D8CF0" @open="handleOpen">
            <template v-for="(item, index) in menu">
                <el-submenu :key="index" v-if="item.children && item.children.length" :index="item.url">
                    <template slot="title">
                        <i :class="iconMaps[index]"></i>
                        {{ item.menuName }}
                    </template>
                    <el-menu-item v-for="(value, key) in item.children" :key="key" :index="value.url" style="padding-left: 40px!important;">
                        <template slot="title"><span class="dot">·</span>{{ value.menuName }}</template>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="index" :index="item.url">
                    <template slot="title">
                        <i :class="iconMaps[index]"></i>
                        {{ item.menuName }}
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import {
    // POST_BASE_MENU_ROUTE_LIST
} from '@/api/request.js';

export default {
    name: 'asider',
    data() {
        return {
            menu: [],
            path: '',
            iconMaps: [
                'el-icon-edit',
                'el-icon-share',
                'el-icon-delete'
            ],
            menu: [
                {
                    menuName: '邮票业务中心',
                    url: '/business',
                    children: [
                        {menuName: '订单列表', url: '/business/orderList'},
                        {menuName: '鉴评单列表', url: '/business/appraisalOrder'},
                        {menuName: '封装单列表', url: '/business/packageOrder'},
                        {menuName: '退货单列表', url: '/business/returnOrder'},
                    ],
                },
                {
                    menuName: '财务中心',
                    url: '/finance',
                    children: [
                        {menuName: '订单查询', url: '/finance/inquiry'},
                        {menuName: '订单对账', url: '/finance/record/index'},
                        {menuName: '订单结算', url: '/finance/settle'},
                        {menuName: '提现管理', url: '/finance/withdraw'},
                    ],
                },
                {
                    menuName: '系统管理',
                    url: '/management',
                    children: [
                        {menuName: '角色管理', url: '/management/rolemanagement'},
                        {menuName: '账号管理', url: '/management/accountmanagement'},
                        {menuName: '菜单管理', url: '/management/menumanagement'},
                        {menuName: '账号设置', url: '/management/accountsetting'},
                    ],
                },
            ]
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
        // this.getUserMenu();
    },
    methods: {
        getUserMenu() {
            POST_BASE_MENU_ROUTE_LIST({
                regSys: 1
            }).then(res =>{
                res.forEach((item, index) => {
                    if (['/board', '/material/index', '/template/index'].includes(item.url)) {
                        delete item.children;
                    }
                });
                this.menu = res;
            });
        },
        getCurrentUrl() {
            this.path = this.$route.meta.value;
        },
        handleOpen(key) {
            this.path = key;
            this.$router.push({
                path: this.path
            });
            this.getCurrentUrl();
        }
    }
}
</script>

<style scoped>
    .container>>>.el-menu {
        border-right: 0;
    }
    .container>>>.el-menu .el-menu-item,
    .container>>>.el-menu .el-submenu .el-submenu__title,
    .container>>>.el-menu .el-menu--inline .el-menu-item {
        color: #555;
        padding: 0 32px!important;
    }
    .container>>>.el-menu .el-menu-item img,
    .container>>>.el-menu .el-submenu img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }
    .container>>>.el-menu .el-menu-item.is-active {
        background: #ecf5ff;
    }
    .container>>>.dot {
        font-size: 24px;
        margin: 0 6px 0 -12px;
    }
</style>
