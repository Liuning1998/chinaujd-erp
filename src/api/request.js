/**
 * 命名规范
 * eg:GET_USERCENTER_DELETE_ROLE
 * 1、请求方式：  GET           get请求
 * 2、模块名：    USERCENTER    系统管理
 * 3、功能名：    DELETE_ROLE   新增角色
 */
import {
  get,
  post,
  postExport
} from '@/api/axios';

let baseURL = '';

if (process.env.NODE_ENV == 'development') { //开发环境
	baseURL = 'http://172.18.1.11:8070';
} else if (process.env.NODE_ENV == 'production') { //生产环境地址
  baseURL = 'http://zuul.5g.silkeroad.cn';
} else if (process.env.NODE_ENV == 'testing') { //测试环境地址
  baseURL = 'http://msg5gtest.zuul.srpqa.top';
}

export function login(params) {
  return post(baseURL + '/userCenter/login/username', params);
}
export function logout(params) {
  return post(baseURL + '/userCenter/logout', params);
}
export function getImageCode() {
  return get(baseURL + '/cmsServer/sms/getImageCode');
};
/**
 * 业务中心 Start
 */
// 订单列表-列表页
export function POST_BUSINESS_ORDER_LISTPAGE(params) {
  return post(baseURL + '/philatelic/business/orderMain/listPage', params);
}
//  服务商下拉列表
export function GET_AGENT_LIST(params) {
  return get(baseURL + '/philatelic/base/list/agent', params);
}
// 订单列表-导出
export function POST_EXPORT_BUSINESS_ORDER_EXPORT(params) {
  return postExport(baseURL + '/philatelic/business/orderMain/export', params);
}
// 邮票名称级联查询
export function findFullName(params) {
  return post(baseURL + '/stamp/findFullNameAndType', params)
}
// 邮票Id查询子票
export function POST_FIND_ID_STAMP(params) {
  return post(baseURL + '/stamp/findIdStamp', params);
}
// 新增核验-扫码查询
export function GET_ORDERITEM_QUERY(params) {
  return get(baseURL + '/philatelic/business/orderitem/query', params);
}
// 订单列表-查看-详情
export function GET_BUSINESS_ORDERMAIN_VIEW(params) {
  return get(baseURL + '/philatelic/business/orderMain/view', params);
}
// 子订单详情
export function GET_BUSINESS_ORDER_VIEW(params) {
  return get(baseURL + '/philatelic/business/order/view', params);
}
// 解除绑定
export function POST_BUSINESS_ORDER_UBIND(params) {
  return post(baseURL + '/philatelic/business/order/ubind', params);
}
// 取消订单
export function POST_BUSINESS_ORDERMAIN_CANCEL(params) {
  return post(baseURL + '/philatelic/business/orderMain/cancel', params);
}
// 审核订单
export function POST_BUSINESS_ORDERMAIN_AUDIT(params) {
  return post(baseURL + '/philatelic/business/orderMain/audit', params);
}
// 打印订单
export function GET_BUSINESS_ORDERMAIN_PRINT(params) {
  return get(baseURL + '/philatelic/business/orderMain/print', params);
}
// 物流渠道
export function POST_BUSINESS_LOGISTISCS_CHANNEL() {
  return post(baseURL + '/philatelic/business/applet/appraisalOrder/LogisticsChannel');
}
// 发货
export function POST_BUSINESS_DELIVERGOODS(params) {
  return post(baseURL + '/philatelic/business/applet/appraisalOrder/deliverGoods', params);
}
// 获取短信验证码
export function POST_BUSINESS_GET_SMSCODE(params) {
  return post(baseURL + '/philatelic/business/orderMain/get/smsCode', params);
}
// 订单列表-新增子订单
export function POST_BUSINESS_ORDERMAIN_ADD(params) {
  return post(baseURL + '/philatelic/business/orderMain/add', params);
}
// 地址列表
export function POST_AREA_LIST(params) {
  return post(baseURL + '/philatelic/base/area/list', params);
}
// 获取封装套餐
export function POST_GETPACKTYPE(params) {
  return post(baseURL + '/philatelic/business/orderMain/get/getPackType', params);
}
// 子订单列表-绑定
export function POST_OREDR_BIND(params) {
  return post(baseURL + '/philatelic/business/order/bind', params);
}
// 绑定-查询子订单邮票列表
export function GET_QUERYITEMSBYORDERID(params) {
  return get(baseURL + '/philatelic/business/orderitem/queryItemsByOrderId', params);
}
// 绑定-查询采集邮票图
export function POST_QUERYBOUNDSTAMPDATA(params) {
  return post(baseURL + '/collection/business/collectionSheet/queryBoundStampData', params);
}
// 邮票查看
export function GET_STAMPVIEW(params) {
  return get(baseURL + '/philatelic/business/order/stampView', params);
}
// 鉴评单/封装厂详情页
export function POST_APPRAISALORDER_VIEW(params) {
  return post(baseURL + '/philatelic/business/appraisalOrder/view', params);
}
/**
 * 业务中心 End
 */
/**
 * 财务中心 Start
 * */
// 对账单列表
export function POST_FINANCE_SLIP_LIST(params) {
  return post(baseURL + '/philatelic/finance/reconciation/silp/pageList', params);
}
// 分页查询订单
export function POST_FINANCE_SLIP_PAGELIST(params) {
  return post(baseURL + '/philatelic/finance/order/pageList', params);
}
// 新增对账单
export function POST_FINANCE_SLIP_ADD(params) {
  return post(baseURL + '/philatelic/finance/reconciation/silp/add', params);
}
// 删除对账单
export function POST_FINANCE_SLIP_DELETE(params) {
  return post(baseURL + '/philatelic/finance/reconciation/silp/delete', params);
}
// 对账单-订单结算列表
export function POST_FINANCE_SLIP_SETTLEMENT_LIST(params) {
  return post(baseURL +'/philatelic/finance/reconciation/silp/settlementList', params);
}
// 获取对账单对账内容详情
export function POST_FINANCE_SLIP_RECONCATION_INFO(params) {
  return post(baseURL + '/philatelic/finance/reconciation/silp/reconciationInfo', params);
}
// 获取对账单订单内容详情
export function POST_FINANCE_SLIP_INFO(params) {
  return post(baseURL + '/philatelic/finance/reconciation/silp/info', params);
}
// 根据订单编号查询流水
export function POST_FINANCE_SLIP_DETAIL(params) {
  return post(baseURL + '/philatelic/finance/reconciation/silp/getDetailByOrderNum', params);
}
// 对账单信息-导出
export function POST_EXPORT_FINANCE_SLIP_EXPORT(params) {
  return postExport(baseURL + '/philatelic/finance/reconciation/silp/export', params);
}
// 订单对账-订单结算申请
export function POST_FINANCE_SLIP_SETTLEMENT_SAVE(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/save', params);
}
// 订单结算-订单结算列表
export function POST_FINANCE_SLIP_SETTLEMENT_PAGELIST(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/pageList', params);
}
// 获取新增对账单开始时间
export function POST_FINANCE_SLIP_GETSTARTTIME() {
  return post(baseURL + '/philatelic/finance/reconciation/silp/getStartTime');
}
// 下载模版
export function POST_FINANCE_SLIP_DOWNLOAD_TEMPLATE() {
  return post(baseURL + '/philatelic/finance/reconciation/silp/downloadTemplate');
}
// 订单结算-审核-通过
export function POST_FINANCE_SLIP_SETTLEMENT_SUCCESS(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/success', params);
}
// 订单结算-审核-驳回
export function POST_FINANCE_SLIP_SETTLEMENT_REJECT(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/reject', params);
}
// 订单结算-查看详情-结算明细-备注
export function POST_FINANCE_SLIP_REMARKS_SAVE(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/saveRemarks', params);
}
// 系统角色-结算明细
export function POST_FINANCE_SLIP_VIEWSETTLEMENT_VIEW(params) {
  return post(baseURL + '/philatelic/finance/settlement//slip/viewSettlement/view', params);
}
// 订单结算-结算支付
export function POST_FINANCE_SLIP_PAY(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/pay', params);
}
// 订单结算-查看详情-结算明细
export function POST_FINANCE_SLIP_SETTLEMENT_VIEW(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/viewSettlement', params);
}
// 订单结算-查看明细-订单详情
export function POST_FINANCE_SLIP_ORDER_VIEW(params) {
  return post(baseURL + '/philatelic/finance/settlement/slip/viewOrder', params);
}
// 提现管理-查询账户信息
export function POST_FINANCE_SLIP_ACCOUNT_MESSAGE(params) {
  return post(baseURL + '/philatelic/finance/account/accountMessage', params);
}
// 提现管理-提现
export function POST_FINANCE_SLIP_CARRY_CASH(params) {
  return post(baseURL + '/philatelic/finance/cashout/carryCash', params);
}
// 提现管理-添加银行卡
export function POST_FINANCE_SLIP_ADD_BANKCARD(params) {
  return post(baseURL + '/philatelic/finance/base/cardBagAdd', params);
}
// 提现管理-删除银行卡
export function POST_FINANCE_SLIP_DELETE_BANKCARD(params) {
  return post(baseURL + '/financeCenter/cardBag/cardBagDelete', params);
}
// 查询省市集合
export function POST_BASE_QUERY_PROVINCE_CITY_LIST() {
  return post(baseURL + '/financeCenter/bank/queryProvinceCityList');
}
// 查询开户行集合
export function POST_FINANCE_SLIP_OPENBANK_LIST(params) {
  return post(baseURL + '/financeCenter/bank/queryOpenBankList', params);
}
// 查询银行列表
export function POST_FINANCE_SLIP_BANK_LIST(params) {
  return post(baseURL + '/financeCenter/bank/queryBankList', params);
}
// 查询资金明细
export function POST_FINANCE_SLIP_QUERY_ACCOUNT_HISTORY(params) {
  return post(baseURL + '/philatelic/finance/history/queryAccountHistory', params);
}
// 提现管理-提现审核
export function POST_FINANCE_SLIP_CASHOUT_LIST(params) {
  return post(baseURL + '/philatelic/finance/cashout/queryCashOutList', params);
}
// 提现管理-提现详情
export function POST_FINANCE_SLIP_CASHOUT_INFO(params) {
  return post(baseURL + '/philatelic/finance/cashout/queryCashOutInfo', params);
}
// 提现管理-提现结算
export function POST_FINANCE_SLIP_SETTLE_CASHOUT(params) {
  return post(baseURL + '/philatelic/finance/cashout/settleCashOut', params);
}
// 提现管理-提现审核
export function POST_FINANCE_SLIP_AUDIT_CASHOUT(params) {
  return post(baseURL + '/philatelic/finance/cashout/auditCashOut', params);
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
// 管理员账号列表
export function POST_USERCENTER_BASE_ADMIN_LIST(params) {
  return post(baseURL + '/philatelic/base/admin/pageList', params);
}
// 新增管理员
export function POST_USERCENTER_BASE_ADMIN_ADD(params) {
  return post(baseURL + '/philatelic/base/admin/add', params);
}
// 编辑管理员
export function POST_USERCENTER_BASE_ADMIN_EDIT(params) {
  return post(baseURL + '/philatelic/base/admin/edit', params);
}
// 禁用管理员
export function POST_USERCENTER_BASE_ADMIN_DEAL_DISABLE(params) {
  return post(baseURL + '/philatelic/base/admin/dealDisable', params);
}
// 恢复管理员
export function POST_USERCENTER_BASE_ADMIN_DEAL_ENABLE(params) {
  return post(baseURL + '/philatelic/base/admin/dealEnable', params);
}
// 查看管理员详情
export function POST_USERCENTER_BASE_ADMIN_VIEW(params) {
  return post(baseURL + '/philatelic/base/admin/view', params);
}
// 获取所有菜单
export function POST_USERCENTER_QUERY_ALL_MENU(params) {
  return post(baseURL + '/userCenter/menu/queryAllMenu', params);
}
// 查看菜单
export function GET_USERCENTER_MENU_VIEW(params) {
  return get(baseURL + '/userCenter/menu/view', params);
}
// 查看所有角色
export function POST_USERCENTER_ROLE_ALL(params) {
  return post(baseURL + '/userCenter/role/query/all', params);
}
// 更新菜单
export function POST_USERCENTER_UPDATE_MENU(params) {
  return post(baseURL + '/userCenter/menu/update', params);
}
// 修改密码
export function POST_USERCENTER_ADMIN_UPDATE_PASSWORD(params) {
  return post(baseURL + '/philatelic/base/admin/editPassword', params);
}
// 账号管理-服务商列表
export function POST_USERCENTER_SERVER_PAGELIST(params) {
  return post(baseURL + '/philatelic/base/admin/serverPageList', params);
}
// 物流信息
export function POST_BUSINESS_LOGISTISCS_INFO_MATION(params) {
  return post(baseURL + '/philatelic/business/applet/appraisalOrder/logisticsInformation', params);
}
// 鉴评单列表/封装厂列表
export function POST_BUSINESS_APPRAISAL_ORDER_LIST(params) {
  return post(baseURL + '/philatelic/business/appraisalOrder/list', params);
}
/**
 * 系统管理 End
 * */

/**
 * 其他 Start
 */
// 获取侧边栏
export function POST_BASE_MENU_ROUTE_LIST(params) {
  return post(baseURL + '/userCenter/menuRoute/query', params);
}
// 获取token
export function GET_TOKEN(params) {
  return get(baseURL + '/imageFile/getToken', params);
}
let templateUploadUrl = baseURL + '/philatelic/finance/reconciation/silp/uploadReconciliation';
let payOrderUploadUrl = baseURL + '/imageFile/upload';
export {
  templateUploadUrl,
  payOrderUploadUrl,
}
/**
 * 其他 End
 */


