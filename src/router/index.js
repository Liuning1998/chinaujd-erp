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
	routes: [{
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
			children: [{
				path: '/welcome',
				component: () => import("@/views/index/Index"),
				meta: {
					value: '/welcome',
				},
				name: 'welcome'
			}]
		},
		{
			path: '/business', // 邮政业务中心
			component: () => import("@/components/Home"),
			redirect: '/business/orderList/index',
			meta: {
				value: '/business/orderList',
				title: '邮票业务中心'
			},
			children: [{
					path: '/business/orderList',
					component: () => import("@/components/Middle"),
					redirect: '/business/orderList/index',
					meta: {
						value: '/business/orderList',
						title: '订单列表'
					}, // 当前激活菜单
					name: 'orderList',
					children: [{
						path: '/business/orderList/index',
						component: () => import("@/views/business/orderList/index"),
						meta: {
							value: '/business/orderList'
						},
						name: 'orderIndex'
					}, {
						path: '/business/orderList/add',
						component: () => import("@/views/business/orderList/add"),
						meta: {
							value: '/business/orderList',
							title: '新增'
						},
						name: 'orderAdd'
					}, {
						path: '/business/orderList/details',
						component: () => import("@/views/business/orderList/details"),
						meta: {
							value: '/business/orderList',
							title: '订单详情'
						},
						name: 'orderDetails'
					}, {
						path: '/business/orderList/childdetails',
						component: () => import("@/views/business/orderList/childDetails"),
						meta: {
							value: '/business/orderList',
							title: '子订单详情'
						},
						name: 'childOrderDetails'
					}, {
						path: '/business/orderList/print',
						component: () => import("@/views/business/orderList/Print"),
						meta: {
							value: '/business/orderList',
							title: '订单打印'
						},
						name: 'orderDetails'
					}]
				},
				{
					path: '/business/appraisalOrder',
					component: () => import("@/components/Middle"),
					redirect: '/business/appraisalOrder/index',
					meta: {
						value: '/business/appraisalOrder',
						title: '鉴评单列表'
					},
					name: 'appraisalOrder',
					children: [{
						path: '/business/appraisalOrder/index',
						component: () => import("@/views/business/appraisalOrder/index"),
						meta: {
							value: '/business/appraisalOrder'
						},
						name: 'appraisalOrderIndex'
					}, {
						path: '/business/appraisalOrder/details',
						component: () => import("@/views/business/appraisalOrder/details"),
						meta: {
							value: '/business/appraisalOrder',
							title: '鉴评单详情'
						},
						name: 'appraisalOrderDetails'
					}, {
						path: '/business/appraisalOrder/childDetails',
						component: () => import("@/views/business/appraisalOrder/childDetails"),
						meta: {
							value: '/business/appraisalOrder',
							title: '子订单详情'
						},
						name: 'appraisalChildOrderDetails'
					}]
				},
				{
					path: '/business/packageOrder',
					component: () => import("@/components/Middle"),
					redirect: '/business/packageOrder/index',
					meta: {
						value: '/business/packageOrder',
						title: '封装单列表'
					},
					name: 'packageOrder',
					children: [{
						path: '/business/packageOrder/index',
						component: () => import("@/views/business/packageOrder/index"),
						meta: {
							value: '/business/packageOrder'
						},
						name: 'packageOrderIndex'
					}, {
						path: '/business/packageOrder/details',
						component: () => import("@/views/business/packageOrder/details"),
						meta: {
							value: '/business/packageOrder',
							title: '封装单详情'
						},
						name: 'packageOrderDetails'
					}]
				},
				{
					path: '/business/returnOrder',
					component: () => import("@/components/Middle"),
					redirect: '/business/returnOrder/index',
					meta: {
						value: '/business/returnOrder',
						title: '退货单列表'
					},
					name: 'returnOrder',
					children: [{
						path: '/business/returnOrder/index',
						component: () => import("@/views/business/returnOrder/index"),
						meta: {
							value: '/business/returnOrder'
						},
						name: 'returnOrderIndex'
					}, {
						path: '/business/returnOrder/details',
						component: () => import("@/views/business/returnOrder/details"),
						meta: {
							value: '/business/returnOrder',
							title: '退货单详情'
						},
						name: 'returnOrderDetails'
					}]
				}
			]
		},
		{
			path: '/finance', // 财务中心
			component: () => import("@/components/Home"),
			redirect: '/finance/inquiry',
			meta: {
				title: '财务中心'
			},
			children: [{
					path: '/finance/inquiry',
					component: () => import("@/views/finance/orderInquiry/Index"),
					meta: {
						value: '/finance/inquiry',
						title: '订单查询'
					},
					name: 'inquiry'
				},
				{
					path: '/finance/record',
					component: () => import("@/components/Middle"),
					meta: {
						value: '/finance/record/index',
						title: '订单对账'
					},
					redirect: '/finance/record/index',
					name: 'record',
					children: [{
							path: '/finance/record/index',
							component: () => import('@/views/finance/orderRecord/Index'),
							meta: {
								value: '/finance/record/index'
							},
							name: 'recordindex'
						},
						{
							path: '/finance/record/detail',
							component: () => import("@/views/finance/orderRecord/Detail"),
							meta: {
								value: '/finance/record/index',
								title: '对账单详情'
							},
							name: 'recorddetail'
						},
					]
				},
				{
					path: '/finance/settle',
					component: () => import("@/components/Middle"),
					meta: {
						value: '/finance/settle/index',
						title: '订单结算'
					},
					redirect: '/finance/settle/index',
					name: 'settle',
					children: [
						{
							path: '/finance/settle/index',
							component: () => import('@/views/finance/orderSettle/Index'),
							meta: {
								value: '/finance/settle/index'
							},
							name: 'settleindex'
						},
						{
							path: '/finance/settle/detail',
							component: () => import("@/views/finance/orderSettle/components/Detail"),
							meta: {
								value: '/finance/settle/index',
								title: '对账单详情'
							},
							name: 'settledetail'
						},
					]
				},
				{
					path: '/finance/withdraw',
					component: () => import("@/views/finance/withdrawalManagement/Index"),
					meta: {
						value: '/finance/withdraw',
						title: '提现管理'
					},
					name: 'withdraw'
				}
			]
		},
		{
			path: '/management', // 系统管理
			component: () => import("@/components/Home"),
			redirect: '/management/rolemanagement/index',
			meta: {
				value: '/management/rolemanagement/index',
				title: '系统管理'
			},
			children: [{
					path: '/management/rolemanagement',
					component: () => import("@/components/Middle"),
					redirect: '/management/rolemanagement/index',
					meta: {
						value: '/management/rolemanagement/index',
						title: '角色管理'
					}, // 当前激活菜单
					name: 'roleList',
					children: [{
						path: '/management/rolemanagement/index',
						component: () => import("@/views/management/rolemanagement/index"),
						meta: {
							value: '/management/rolemanagement'
						},
						name: 'roleIndex'
					}, {
						path: '/management/rolemanagement/add',
						component: () => import("@/views/management/rolemanagement/add"),
						meta: {
							value: '/management/rolemanagement',
							title: '新增'
						},
						name: 'roleAdd'
					}, {
						path: '/management/rolemanagement/edit',
						component: () => import("@/views/management/rolemanagement/edit"),
						meta: {
							value: '/management/rolemanagement',
							title: '编辑'
						},
						name: 'roleEdit'
					}]
				},
				{
					path: '/management/accountmanagement',
					component: () => import("@/components/Middle"),
					redirect: '/management/accountmanagement/index',
					meta: {
						value: '/management/accountmanagement/index',
						title: '账号管理'
					}, // 当前激活菜单
					name: 'accountList',
					children: [{
						path: '/management/accountmanagement/index',
						component: () => import("@/views/management/accountmanagement/index"),
						meta: {
							value: '/management/accountmanagement'
						},
						name: 'accountIndex'
					}, {
						path: '/management/accountmanagement/add',
						component: () => import("@/views/management/accountmanagement/add"),
						meta: {
							value: '/management/accountmanagement',
							title: '新增账号'
						},
						name: 'accountAdd'
					}, {
						path: '/management/accountmanagement/edit',
						component: () => import("@/views/management/accountmanagement/edit"),
						meta: {
							value: '/management/accountmanagement',
							title: '编辑账号'
						},
						name: 'accountEdit'
					}, {
						path: '/management/accountmanagement/list',
						component: () => import("@/views/management/accountmanagement/list"),
						meta: {
							value: '/management/accountmanagement',
							title: '服务商列表'
						},
						name: 'serverList'
					}]
				},
				{
					path: '/management/menumanagement',
					component: () => import("@/components/Middle"),
					redirect: '/management/menumanagement/index',
					meta: {
						value: '/management/menumanagement/index',
						title: '菜单管理'
					}, // 当前激活菜单
					name: 'menutList',
					children: [{
						path: '/management/menumanagement/index',
						component: () => import("@/views/management/menumanagement/index"),
						meta: {
							value: '/management/menumanagement'
						},
						name: 'menuIndex'
					}, {
						path: '/management/menumanagement/edit',
						component: () => import("@/views/management/menumanagement/edit"),
						meta: {
							value: '/management/menumanagement',
							title: '编辑'
						},
						name: 'menuEdit'
					}]
				},
				{
					path: '/management/accountsetting',
					component: () => import("@/components/Middle"),
					redirect: '/management/accountsetting/index',
					meta: {
						value: '/management/accountsetting/index',
						title: '账号设置'
					}, // 当前激活菜单
					name: 'accountsettingList',
					children: [{
						path: '/management/accountsetting/index',
						component: () => import("@/views/management/accountsetting/index"),
						meta: {
							value: '/management/accountsetting'
						},
						name: 'accountsettingIndex'
					}]
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
