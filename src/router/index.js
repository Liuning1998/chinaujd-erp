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
        },
				{
					path: '/business/appraisalOrder',
					component: () => import("@/components/Middle"),
					redirect: '/business/appraisalOrder/index',
					meta: {value: '/business/appraisalOrder', title: '鉴评单列表'},
					name: 'appraisalOrder',
					children: [
						{
							path: '/business/appraisalOrder/index',
							component: () => import("@/views/business/appraisalOrder/index"),
							meta: {value: '/business/appraisalOrder'},
							name: 'appraisalOrderIndex'
						},{
							path: '/business/appraisalOrder/details',
							component: () => import("@/views/business/appraisalOrder/details"),
							meta: {value: '/business/appraisalOrder', title: '鉴评单详情'},
							name: 'appraisalOrderDetails'
						}
					]
				},
				{
					path: '/business/packageOrder',
					component: () => import("@/components/Middle"),
					redirect: '/business/packageOrder/index',
					meta: {value: '/business/packageOrder', title: '封装单列表'},
					name: 'packageOrder',
					children: [
						{
							path: '/business/packageOrder/index',
							component: () => import("@/views/business/packageOrder/index"),
							meta: {value: '/business/packageOrder'},
							name: 'packageOrderIndex'
						},{
							path: '/business/packageOrder/details',
							component: () => import("@/views/business/packageOrder/details"),
							meta: {value: '/business/packageOrder', title: '封装单详情'},
							name: 'packageOrderDetails'
						}
					]
				},
				{
					path: '/business/returnOrder',
					component: () => import("@/components/Middle"),
					redirect: '/business/returnOrder/index',
					meta: {value: '/business/returnOrder', title: '退货单列表'},
					name: 'returnOrder',
					children: [
						{
							path: '/business/returnOrder/index',
							component: () => import("@/views/business/returnOrder/index"),
							meta: {value: '/business/returnOrder'},
							name: 'returnOrderIndex'
						},{
							path: '/business/returnOrder/details',
							component: () => import("@/views/business/returnOrder/details"),
							meta: {value: '/business/returnOrder', title: '退货单详情'},
							name: 'returnOrderDetails'
						}
					]
				}
      ]
    },
    {
      path: '/finance',   // 财务中心
      component: () => import("@/components/Home"),
      redirect: '/finance/inquiry',
      meta: {title: '财务中心'},
      children: [
        {
          path: '/finance/inquiry',
          component: () => import("@/views/finance/orderInquiry/Index"),
          meta: {value: '/finance/inquiry', title: '订单查询'},
          name: 'inquiry'
        },
        {
          path: '/finance/record',
          component: () => import("@/components/Middle"),
          meta: {value: '/finance/record/index', title: '订单对账'},
          redirect: '/finance/inquiry/index',
          name: 'record',
          children: [
            {
              path: '/finance/record/index',
              component: () => import('@/views/finance/orderRecord/Index'),
              meta: {value: '/finance/record/index'},
              name: 'index'
            },
            {
              path: '/finance/record/detail',
              component: () => import("@/views/finance/orderRecord/Detail"),
              meta: {value: '/finance/record/index', title: '对账详情'},
              name: 'detail'
            },
          ]
        },
        {
          path: '/finance/fund',
          component: () => import("@/views/finance/fundManagement/Index"),
          meta: {value: '/finance/fund', title: '资金管理'},
          name: 'fund'
        },
        {
          path: '/finance/withdraw',
          component: () => import("@/views/finance/withdrawalManagement/Index"),
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
