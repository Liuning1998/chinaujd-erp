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
	baseURL = 'http://172.18.3.11:8070';
} else if (process.env.NODE_ENV == 'production') { //生产环境地址
  baseURL = 'http://zuul.5g.silkeroad.cn';
} else if (process.env.NODE_ENV == 'testing') { //测试环境地址
  baseURL = 'http://msg5gtest.zuul.srpqa.top';
}

export function login() {};
export function getImageCode() {};
/**
 * 财务中心 Start
 * */
// 对账单列表
export function POST_FINANCE_SLIP_LIST(params) {
  return post(baseURL + '/reconciation/silp/pageList', params);
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


