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
      redirect: '/business/index',
      children: [
        {
          path: '/business/index',
          component: () => import("@/views/business/Index"),
          meta: {value: '/business/index'},   // 当前激活菜单
          name: 'business'
        }
      ]
    },
    {
      path: '/finance',   // 财务中心
      component: () => import("@/components/Home"),
      redirect: '/finance/index',
      children: [
        {
          path: '/finance/index',   // 订单查询
          component: () => import("@/views/finance/OrderInquiry"),
          meta: {value: '/finance/index'},
          name: 'inquiry'
        },
        {
          path: '/finance/record',    // 订单对账
          component: () => import("@/views/finance/OrderRecord"),
          meta: {value: '/finance/record'},
          name: 'record'
        },
        {
          path: '/finance/fund',  // 资金管理
          component: () => import("@/views/finance/FundManagement"),
          meta: {value: '/finance/fund'},
          name: 'fund'
        },
        {
          path: '/finance/withdraw',    // 提现管理
          component: () => import("@/views/finance/WithdrawalManagement"),
          meta: {value: '/finance/withdraw'},
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
