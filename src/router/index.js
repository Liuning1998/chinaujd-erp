import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'


Vue.use(Router)
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
  }
  return originalReplace.call(this, location).catch(err => err);
};


// 刷新防止vuex丢失
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'));
  store.commit('set_name', sessionStorage.getItem('name'));
  store.commit('set_userId', sessionStorage.getItem('userId'));
}

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import("@/components/Login")
    },
    {
      path: '/index',
      component: () => import("@/components/Home"),
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import("@/views/index/Index"),
          name: 'welcome'
        }
      ]
    },
    {
      path: '/business',  // 邮政业务中心
      component: () => import("@/components/Home"),
      redirect: '/business/orderList/index',
			meta: {value: '/business/orderList', title: '邮票业务中心'},
      children: [
        {
          path: '/business/orderList',
          component: () => import("@/components/Middle"),
					redirect: '/business/orderList/index',
          meta: {value: '/business/orderList', title: '订单列表'},   // 当前激活菜单
          name: 'orderList',
					children: [
						{
							path: '/business/orderList/index',
							component: () => import("@/views/business/orderList/index"),
							meta: {value: '/business/orderList'},
							name: 'orderIndex'
						},{
							path: '/business/orderList/add',
							component: () => import("@/views/business/orderList/add"),
							meta: {value: '/business/orderList', title: '新增订单'},
							name: 'orderAdd'
						},{
							path: '/business/orderList/details',
							component: () => import("@/views/business/orderList/details"),
							meta: {value: '/business/orderList', title: '订单详情'},
							name: 'orderDetails'
						},{
							path: '/business/orderList/print',
							component: () => import("@/views/business/orderList/print"),
							meta: {value: '/business/orderList', title: '打印订单'},
							name: 'orderPrint'
						}
					]
        }
      ]
    },
    {
      path: '/finance',   // 财务中心
      component: () => import("@/components/Home"),
      redirect: '/finance/index',
      children: [
        {
          path: '/finance/index',
          component: () => import("@/views/finance/OrderInquiry"),
          meta: {value: '/finance/index', title: '订单查询'},
          name: 'inquiry'
        },
        {
          path: '/finance/record',
          component: () => import("@/views/finance/OrderRecord"),
          meta: {value: '/finance/record', title: '订单对账'},
          name: 'record',
          children: [
            {
              path: '/finance/record/detail',
              component: () => import("@/views/finance/OrderRecordDetail"),
              meta: {value: '/finance/record', title: '对账详情'},
              name: 'detail'
            },
          ]
        },
        {
          path: '/finance/fund',
          component: () => import("@/views/finance/FundManagement"),
          meta: {value: '/finance/fund', title: '资金管理'},
          name: 'fund'
        },
        {
          path: '/finance/withdraw',
          component: () => import("@/views/finance/WithdrawalManagement"),
          meta: {value: '/finance/withdraw', title: '提现管理'},
          name: 'withdraw'
        }
      ]
    },
    {
      path: '/management',  // 系统管理
      component: () => import("@/components/Home"),
      redirect: '/management/index',
      children: [
        {
          path: '/management/index',
          component: () => import("@/views/management/Index"),
          meta: {value: '/management/index'},
          name: 'material'
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = store.state.token;
    if (['', null].includes(token)) {
      // next('/login');
      next();
    } else {
      next();
    }
  }
});
export default router
