<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="bgfff">
			<el-form ref="form" :model="form" label-width="100px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="业务订单编号:">
							<el-input v-model="form.orderMainCode" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮票名称:">
							<el-input v-model="form.stampName" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="用户手机号:">
							<el-input v-model="form.phone" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="订单状态:">
							<el-select v-model="form.orderMainStatus" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in logisticsStatus" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="支付状态:">
							<el-select v-model="form.paymentStatus" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in payState" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="服务类型:">
							<el-select v-model="form.serviceType" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in serviceType" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="物流状态:">
							<el-select v-model="form.logisticsStatus" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in logisticsStatus" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="鉴评方式:">
							<el-select v-model="form.evalmethod" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in appraisalMode" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="创建时间:">
							<el-date-picker
								v-model="form.create_time"
								size="small"
								:picker-options="pickerOptions"
								type="datetimerange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								:default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<div style="padding-left: 20px;">
							<el-button type="primary" size="small" @click="handleQuery">查询</el-button>
							<el-button size="small" @click="handleReset">重置</el-button>
							<!-- <el-button @click="orderExport" size="small">导出</el-button> -->
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="table_box bgfff">
			<el-table :data="tableData" :header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}" style="width: 100%">
				<el-table-column prop="orderMainCode" label="业务订单编号" width="120"></el-table-column>
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<el-table-column prop="agentName" label="服务商名称"></el-table-column>
				<el-table-column prop="number" label="邮票数量"></el-table-column>
				<el-table-column label="订单金额">
					<template slot-scope="scope">
					<p>¥ {{scope.row.orderMainAmount}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
				<el-table-column prop="paymentDate" label="支付时间"></el-table-column>
				<el-table-column label="订单状态">
					<template slot-scope="scope">
						{{ orderState.find(item => item.value === scope.row.orderMainStatus).name || '' }}
					</template>
				</el-table-column>
				<el-table-column label="支付状态">
					<template slot-scope="scope">
						{{ payState.find(item => item.value === scope.row.paymentStatus).name || '' }}
					</template>
				</el-table-column>
				<el-table-column label="鉴评方式">
					<template slot-scope="scope">
						{{ appraisalMode.find(item => item.value === scope.row.evalmethod).name || '' }}
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="text" v-if="showSendBtn(scope.row)" @click="send(scope.row.orderMainId)">发货</el-button>
						<el-divider v-if="showSendBtn(scope.row)" direction="vertical"></el-divider>
						<el-button type="text" v-if="!showSendBtn(scope.row)" @click="receiving(scope.row)">收货</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-button type="text" @click="detail(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination" v-if="total > pageSize">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next, sizes, jumper"
				:total="total">
			</el-pagination>
		</div>
		<el-dialog
			title="请填写物流信息"
			:visible.sync="sendDialigVisible"
			width="480"
			:before-close="handleClose">
			<div>
				<el-form ref="form" :rules="logisticsRules" :model="logisticsForm" label-width="100px">
					<el-form-item label="物流公司：" prop="ruleLogisticsId">
						<el-select v-model="logisticsForm.ruleLogisticsId" placeholder="请选择单位">
							<el-option
								v-for="item in logisticsCompanys"
								:key="item.ruleLogisticsId"
								:label="item.logisticsName"
								:value="item.ruleLogisticsId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发货类型：" prop="shipmentType">
						<el-radio-group v-model="logisticsForm.shipmentType">
							<el-radio label="正常发货" :value="0"></el-radio>
							<el-radio label="退货" :value="1"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="物流单号：" prop="logisticsOrderNo">
						<el-input v-model="logisticsForm.logisticsOrderNo" placeholder="请输入物流单号："></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="handleSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {
	POST_BUSINESS_APPRAISAL_ORDER_LIST,
	POST_EXPORT_BUSINESS_ORDER_EXPORT,
	POST_USERCENTER_SERVER_PAGELIST,
	POST_BUSINESS_LOGISTISCS_CHANNEL,
	POST_BUSINESS_DELIVERGOODS,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
export default {
	name: '',
	components: {
		Breadcrumb
	},
	data() {
		return {
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			form: {
				orderMainCode: null,
				stampName: null,
				phone: null,
				orderMainStatus: null,
				paymentStatus: null,
				serviceType: null,
				logisticsStatus: null,
				create_time: ['', ''],
				evalmethod: null
			},
			tableData:[],
			total: 110,
			currentPage:0,
			pageSize:15,
			// 服务商名称
			agentName:[],
			// 服务类型
			serviceType:[
				{name: '采集+鉴别',value:0},
				{name: '采集+评级',value:1},
				{name: '采集+鉴别+封装',value:2},
				{name: '采集+评级+封装',value:3},
				{name: '核验',value:4}
			],
			// 支付状态
			payState:[
				{name: '未支付',value:0},
				{name: '已支付',value:1}
			],
			// 物流状态
			logisticsStatus:[
				{name: '服务商未发货',value:0},
				{name: '服务商已发货',value:1},
				{name: '鉴评点未发货',value:2},
				{name: '鉴评点已发货',value:3},
				{name: '鉴评点已退货',value:4},
				{name: '封装厂未发货',value:5},
				{name: '封装厂已发货',value:6},
			],
			// 鉴评方式
			appraisalMode:[
				{name: '远程鉴评',value:0},
				{name: '批量鉴评',value:1}
			],
			// 订单状态
			orderState: [
				{name: '已提交', value: 0},
				{name: '待审核', value: 2},
				{name: '待鉴评', value: 3},
				{name: '封装中', value: 4},
				{name: '已完成', value: 6},
				{name: '售后中', value: 8},
				{name: '已关闭', value: 7},
				{name: '待核验', value: 5}
			],
			sendDialigVisible: false,
			logisticsForm: {
				orderMainId: null,
				ruleLogisticsId: null,
				logisticsOrderNo: null,
				shipmentType: null,
			},
			logisticsRules: {
				ruleLogisticsId: [{required: true, message: '请选择单位', trigger: ['change', 'blur']}],
				logisticsOrderNo: [{required: true, message: '请输入物流单号', trigger: ['change', 'blur']}],
				shipmentType: [{required: true, message: '请选择发货类型', trigger: ['change', 'blur']}],
			},
			logisticsCompanys: [],
		}
	},
	// 模板渲染前钩子函数
	created() {
		this.getAgent();
		this.getList();
		this.getLogistiscs();
	},
	// 模板渲染后钩子函数
	mounted() {

	},
	methods: {
		getLogistiscs() {
			POST_BUSINESS_LOGISTISCS_CHANNEL().then(res => {
				this.logisticsCompanys = res.data;
			});
		},
		getAgent() {
			let params = {
				currentPage: 1,
				pageSize: 1000
			}
			POST_USERCENTER_SERVER_PAGELIST(params).then(res => {
				this.agentName = res.data.rows;
			});
		},
		detail(val){
			this.$router.push({
				path: '/business/orderList/details',
				query: {
				orderMainId: val.orderMainId,
				}
			});
		},
		// 查询
		handleQuery(){
			this.currentPage=1;
			this.getList();
		},
		handleReset() {
			let form = {
				orderMainCode: null,
				stampName: null,
				phone: null,
				orderMainStatus: null,
				paymentStatus: null,
				serviceType: null,
				logisticsStatus: null,
				create_time: ['', ''],
				evalmethod: null
			};
			Object.assign(this.form, form);
		},
		handleSizeChange(val){
			this.pageSize=val;
			this.getList();
		},
		handleCurrentChange(val){
			this.currentPage=val;
			this.getList();
		},
		getList(){
			let params = {
				currentPage: this.currentPage,
				pageSize: this.pageSize,
				queryType: 2,
				orderMainCode: this.form.orderMainCode,
				stampName: this.form.stampName,
				phone: this.form.phone,
				paymentStatus: this.form.paymentStatus,
				logisticsStatus: this.form.logisticsStatus,
				gmtCreateStart: this.form.create_time[1],
				gmtCreateEnd: this.form.create_time[0],
				evalMethod: this.form.evalmethod,
			};
			POST_BUSINESS_APPRAISAL_ORDER_LIST(params).then(res => {
				res.data.rows.forEach(item => {
					item.evalmethod = JSON.parse(item.evalmethod).value;
					item.orderMainStatus = JSON.parse(item.orderMainStatus).value;
					item.paymentStatus = JSON.parse(item.paymentStatus).value;
					item.appraisalStatus = JSON.parse(item.appraisalStatus).value;
					item.logisticsStatus = JSON.parse(item.logisticsStatus).value;
				});
				this.tableData = res.data.rows;
				this.total = Number(res.data.total);
			});
		},
		orderExport(){
			let params = {
				createTimeEnd: this.form.create_time[1],
				createTimeStart: this.form.create_time[0],
				currentPage: this.currentPage,
				evalmethod: this.form.evalmethod,
				stampName: this.form.stampName,
				orderMainCode: this.form.orderMainCode,
				orderMainStatus: this.form.orderMainStatus,
				pageSize: this.pageSize,
				paymentStatus: this.form.paymentStatus,
				phone: this.form.phone,
				logisticsStatus: this.form.logisticsStatus,
				serviceType: this.form.serviceType
			};
			POST_EXPORT_BUSINESS_ORDER_EXPORT(params).then(res => {
				const blob = new Blob([res], {
					type: 'application/vnd.ms-excel;charset=utf-8'
				});
				let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`
				const file_name = `订单列表${curDate}.xls`;
				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(blob, file_name);
				} else {
					const aLink = document.createElement('a');
					aLink.href = URL.createObjectURL(blob);
					aLink.setAttribute('download', file_name);
					aLink.click();
					window.URL.revokeObjectURL(blob);
				}
			});
		},
		/**
		 * 主订单展示发货按钮
		 * @function showSendBtn
		 * @params {Object} val 主订单信息
		 * @params {Number} currentRegSys => 登录角色 服务商: 3；供应链(鉴评点、封装厂): 6;
		 * @params {Number} evalmethod => 鉴评方式 远程鉴评: 0；批量鉴评：1;
		 * @params {Number} orderMainStatus => 订单状态 已提交: 0; 待审核: 2; 待鉴评: 3; 封装中: 4; 待核验: 5; 已完成: 6; 已关闭: 7; 售后中: 8;
		 * @params {Number} logisticsStatus => 物流状态 服务商未发货: 0; 服务商已发货: 1; 鉴评点未发货: 2; 鉴评点已发货: 3; 鉴评点已退货: 4; 封装厂未发货: 5; 封装厂已发货: 6;
		 * @params {Number} appraisalStatus => 鉴评状态 待鉴评: 0; 已鉴评: 1;
		 * @params {Number} serviceType => 服务类型 serviceType: 0; 采集+评级: 1; 采集+鉴别+封装: 2; 采集+评级+封装: 3; 核验: 4
		 * 不同角色登陆系统触发规则：
		 * 1-1、服务商权限登录后，选择远程鉴评，订单状态为封装中，物流状态为服务商未发货，鉴评状态为已鉴评
		 * 1-2、服务商权限登录后，选择批量鉴评，鉴评状态为待鉴评
		 * 2-1、鉴评点权限登录后，鉴评方式为批量鉴评，物流状态为“鉴评点未发货”
		 * 3-1、封装厂权限登录后，服务类型含有“封装”的数据
		 */
		showSendBtn(val) {
			let currentRegSys = sessionStorage.getItem('currentRegSys');
			if ([3].includes(currentRegSys) &&
				[0].includes(val.evalmethod) &&
				[4].includes(val.orderMainStatus) &&
				[0].includes(val.logisticsStatus) &&
				[1].includes(val.appraisalStatus)) {
				return true;
			} else if (
				[3].includes(currentRegSys) &&
				[1].includes(val.evalmethod) &&
				[0].includes(val.appraisalStatus)) {
				return true;
			} else if (
				[6].includes(currentRegSys) &&
				[1].includes(val.evalmethod) &&
				[2].includes(val.logisticsStatus)) {
				return true;
			} else if (
				[6].includes(currentRegSys) &&
				[2, 3].includes(val.serviceType)) {
				return true;
			} else {
				return false;
			}
		},
		send(id) {
			this.sendDialigVisible = true;
			this.logisticsForm.orderMainId = id;
		},
		receiving() {
			this.$confirm('是否确认收货，该操作不可撤销？', '提示', {
				confirmButtonText: '确定收货',
				cancelButtonText: '取消',
			}).then(() => {});
		},
		handleSubmit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('您确认要发货吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						let params = this.logisticsForm;
						POST_BUSINESS_DELIVERGOODS(params).then(() => {
							this.$message.sueecss('发货成功');
							this.getList();
							let form = {
								orderMainId: null,
								ruleLogisticsId: null,
								logisticsOrderNo: null,
								shipmentType: null,
							};
							Object.assign(this.logisticsForm, form);
							this.sendDialigVisible = false;
						});
					});
				} else {
					return;
				}
			});
		},
		handleClose() {
			let form = {
				orderMainId: null,
				ruleLogisticsId: null,
				logisticsOrderNo: null,
				shipmentType: null,
			};
			Object.assign(this.logisticsForm, form);
			this.sendDialigVisible = false;
		},
	}
}
</script>
<style lang="scss" scoped>
	.w240 {
		width: 240px;
	}
	.table_box{
		padding: 20px;
		margin-top: 16px;
	}
	.bgfff{
		background: #FFFFFF;
		padding: 24px;
		>>>.el-form-item{
			margin-bottom: 10px;
		}
		>>>.el-form-item__label{
			color:  rgba(0,0,0,0.85);
		}
		>>>.el-input__inner{
			height: 32px;
			line-height: 32px;
			border-radius: 2px;
		}
	}
	.pagination {
		width: 100%;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 24px;
		background: #fff;
		box-sizing: border-box;
		>>>.el-pagination {
			.btn-next,
			.btn-prev,
			.el-pager li {
				background: #FFF;
				border: 1px solid #D9D9D9;
				border-radius: 2px;
			}
			.el-pager li {
				font-family: HelveticaNeue;
				font-size: 14px;
				font-weight: 100;
				color: rgba(0,0,0,0.65);
			}
			.el-pager li:not(.disabled).active {
				background-color: #409EFF;
				color: #FFF;
			}
			.el-pagination__jump {
				margin: 0;
			}
		}
	}
	>>>.el-dialog {
		.el-form {
			&-item {
				height: 32px;
				margin-bottom: 24px;
				&__label {
					height: 32px;
					line-height: 32px;
					padding: 0;
				}
				&__content {
					display: flex;
					align-items: center;
					height: 32px;
				}
				.el-input {
					width: 328px;
					.el-input__inner {
						height: 32px;
						line-height: 32px;
						border-radius: 2px;
					}
				}
				// 隐藏输入框的上下箭头
				input[type="number"]::-webkit-inner-spin-button,
				input[type="number"]::-webkit-outer-spin-button {
					-webkit-appearance: none !important;
					-moz-appearance: none !important;
					-o-appearance: none !important;
					-ms-appearance: none !important;
					appearance: none !important;
					margin: 0;
				}
				.el-button {
					width: 88px;
					height: 32px;
					line-height: 32px;
					border: 1px solid #1890FF;
					border-radius: 2px;
					color: #1890FF;
					margin-left: 16px;
					padding: 0;
					background: #FFF;
				}
			}
		}
	}
</style>
