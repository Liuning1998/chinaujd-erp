/**
 * 命名规范
 * eg:GET_USERCENTER_DELETE_ROLE
 * 1、请求方式：  POST          post请求
 * 2、模块名：    USERCENTER    系统管理
 * 3、功能名：    DELETE_ROLE   新增角色
 */
import {
  get,
  post,
  postExport
} from '@/api/axios'

let baseURL = '';

if (process.env.NODE_ENV == 'development') { //开发环境
	baseURL = 'http://192.168.51.26:3000/mock/228';
} else if (process.env.NODE_ENV == 'production') { //生产环境地址
  baseURL = 'http://zuul.5g.silkeroad.cn';
} else if (process.env.NODE_ENV == 'testing') { //测试环境地址
  baseURL = 'http://msg5gtest.zuul.srpqa.top';
}

export function login() {};
export function getImageCode() {};
/**
 * 业务中心 Start
 */
// 订单列表-列表页
export function POST_BUSINESS_ORDER_LISTPAGE(params) {
  return post(baseURL + '/philatelic/business/orderMain/listPage', params);
}
// 订单列表-导出
export function POST_EXPORT_BUSINESS_ORDER_EXPORT(params) {
  return postExport(baseURL + '/philatelic/business/orderMain/export', params);
}
// 订单列表-查看-详情
export function GET_BUSINESS_ORDER_VIEW(params) {
  return get(baseURL + '/philatelic/business/orderMain/view', params);
}
/**
 * 业务中心 End
 */
/**
 * 财务中心 Start
 * */
// 对账单列表
export function POST_FINANCE_SLIP_LIST(params) {
  return post(baseURL + '/reconciation/silp/pageList', params);
}
// 分页查询订单
export function POST_FINANCE_SLIP_PAGELIST(params) {
  return post(baseURL + '/financial/order/pageList', params);
}
// 新增对账单
export function POST_FINANCE_SLIP_ADD(params) {
  return post(baseURL + '/reconciation/silp/add', params);
}
// 删除对账单
export function POST_FINANCE_SLIP_DELETE(params) {
  return post(baseURL + '/reconciation/silp/delete', params);
}
// 对账单-订单结算列表
export function POST_FINANCE_SLIP_SETTLEMENT_LIST(params) {
  return post(baseURL +'/reconciation/silp/settlementList', params);
}
// 获取对账单对账内容详情
export function POST_FINANCE_SLIP_RECONCATION_INFO(params) {
  return post(baseURL + '/reconciation/silp/reconciationInfo', params);
}
// 获取对账单订单内容详情
export function POST_FINANCE_SLIP_INFO(params) {
  return post(baseURL + '/reconciation/silp/info', params);
}
// 对账单信息-导出
export function POST_EXPORT_FINANCE_SLIP_EXPORT(params) {
  return postExport(baseURL + '/reconciation/silp/export', params);
}
// 订单结算-订单结算列表
export function POST_FINANCE_SLIP_SETTLEMENT_PAGELIST(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/pageList', params);
}
// 订单结算-审核-通过
export function POST_FINANCE_SLIP_SETTLEMENT_SUCCESS(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/success', params);
}
// 订单结算-审核-驳回
export function POST_FINANCE_SLIP_SETTLEMENT_REJECT(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/reject', params);
}
// 订单结算-查看详情-结算明细
export function POST_FINANCE_SLIP_SETTLEMENT_VIEW(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/viewSettlement', params);
}
// 订单结算-查看明细-订单详情
export function POST_FINANCE_SLIP_ORDER_VIEW(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/viewOrder', params);
}
/**
 * 财务中心 End
 * */
/**
 * 系统管理 Start
 * */
// 分页查询角色
export function POST_USERCENTER_QUERY_ROLE_PAGE(params) {
  return post(baseURL + '/userCenter/role/query/page', params);
}
// 查询所有权限
export function POST_USERCENTER_QUERY_ALL_AUTHORITIES(params) {
  return post(baseURL + '/userCenter/auth/queryAllAuthorities', params);
}
// 新增角色
export function POST_USERCENTER_ADD_ROLE(params) {
  return post(baseURL + '/userCenter/role/add', params);
}
// 删除角色
export function GET_USERCENTER_DELETE_ROLE(params) {
  return get(baseURL + '/userCenter/role/delete', params);
}
// 查看角色
export function GET_USERCENTER_ROLE_VIEW(params) {
  return get(baseURL + '/userCenter/role/view', params);
}
// 更新角色
export function POST_USERCENTER_EDIT_ROLE(params) {
  return post(baseURL + '/userCenter/role/edit', params);
}
// 账号列表
export function POST_USERCENTER_BASE_ADMIN_LIST(params) {
  return post(baseURL + '/base/admin/list', params);
}
// 获取所有菜单
export function POST_USERCENTER_QUERY_ALL_MENU(params) {
  return post(baseURL + '/userCenter/menu/queryAllMenu', params);
}
// 查看菜单
export function GET_USERCENTER_MENU_VIEW(params) {
  return get(baseURL + '/userCenter/menu/view', params);
}
// 更新菜单
export function POST_USERCENTER_UPDATE_MENU(params) {
  return post(baseURL + '/userCenter/menu/update', params);
}
/**
 * 系统管理 End
 * */

/**
 * 其他 Start
 */
// 获取侧边栏
export function POST_BASE_MENU_ROUTE_LIST(params) {
  return post(baseURL + '', params);
}
/**
 * 其他 End
 */


