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
							<el-input v-model="form.name" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="用户手机号:">
							<el-input v-model="form.phone" class="w240"></el-input>
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
						<el-form-item label="订单状态:">
							<el-select v-model="form.orderMainStatus" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in orderState" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="退款状态:">
							<el-select v-model="form.refundStatus" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in refundStatus" :key="index" :label="item.name"
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
						<el-form-item label="服务商名称:">
							<el-select v-model="form.agentName" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in agentName" :key="index" :label="item.agentName"
									:value="item.agentId"></el-option>
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
						<el-form-item label="支付时间:">
							<el-date-picker
								v-model="form.payment_time"
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
					<el-col :span="16">
						<div style="padding-left: 20px;">
							<el-button type="primary" size="small" @click="handleQuery">查询</el-button>
							<el-button size="small" @click="handleReset">重置</el-button>
							<el-button type="primary" size="small" @click="addOrder">新增业务单</el-button>
							<el-button @click="orderExport" size="small">导出</el-button>
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
						<P v-if="scope.row.orderMainStatus">{{JSON.parse(scope.row.orderMainStatus).desc}}</P>
					</template>
				</el-table-column>
				<el-table-column label="支付状态">
					<template slot-scope="scope">
						<P v-if="scope.row.paymentStatus">{{JSON.parse(scope.row.paymentStatus).desc}}</P>
					</template>
				</el-table-column>
				<el-table-column label="鉴评方式">
					<template slot-scope="scope">
						<P v-if="scope.row.appraisalStatus">{{JSON.parse(scope.row.appraisalStatus).desc}}</P>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="detail(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination" >
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
	</div>
</template>
<script>
import {
	POST_BUSINESS_ORDER_LISTPAGE,
	POST_EXPORT_BUSINESS_ORDER_EXPORT,
	GET_AGENT_LIST,
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
				create_time: ['', ''],
				evalmethod: null,
				name: null,
				orderMainCode: null,
				orderMainStatus: null,
				payment_time: ['', ''],
				phone: null,
				refundStatus: null,
				serviceType: null,
				agentName: null,
				paymentStatus: null
			},
			tableData:[],
			total: 0,
			currentPage:1,
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
			// 退款状态
			refundStatus:[
				{name: '退款中',value:0},
				{name: '已退款',value:1}
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
		}
	},
	// 模板渲染前钩子函数
	created() {
		this.getAgent();
		this.getList();
	},
	// 模板渲染后钩子函数
	mounted() {

	},
	methods: {
		getAgent() {
			GET_AGENT_LIST().then(res => {
				this.agentName = res.agentVos;
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
		addOrder(){
			this.$router.push({
				path: '/business/orderList/add',
			});
		},
		// 查询
		handleQuery(){
			this.currentPage=1;
			this.getList();
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
				createTimeEnd: this.form.create_time[1],
				createTimeStart: this.form.create_time[0],
				currentPage: this.currentPage,
				evalmethod: this.form.evalmethod,
				name: this.form.name,
				orderMainCode: this.form.orderMainCode,
				orderMainStatus: this.form.orderMainStatus,
				pageSize: this.pageSize,
				paymentStatus: this.form.paymentStatus,
				paymentTimeStart: this.form.payment_time[0],
				paymentTimeEnd: this.form.payment_time[1],
				phone: this.form.phone,
				refundStatus: this.form.refundStatus,
				serviceType: this.form.serviceType
			};
			POST_BUSINESS_ORDER_LISTPAGE(params).then(res => {
				this.tableData = res.rows;
				this.currentPage=Number(res.currentPage);
				this.pageSize=Number(res.pageSize);
				this.total = Number(res.total);
			});
		},
		handleReset() {
			let form = {
				create_time: ['', ''],
				evalmethod: null,
				name: null,
				orderMainCode: null,
				orderMainStatus: null,
				payment_time: ['', ''],
				phone: null,
				refundStatus: null,
				serviceType: null,
				agentName: null,
				paymentStatus: null
			};
			Object.assign(this.form, form);
		},
		orderExport(){
			let params = {
				createTimeEnd: this.form.create_time[1],
				createTimeStart: this.form.create_time[0],
				// currentPage: this.currentPage,
				evalmethod: this.form.evalmethod,
				name: this.form.name,
				orderMainCode: this.form.orderMainCode,
				orderMainStatus: this.form.orderMainStatus,
				// pageSize: this.pageSize,
				paymentStatus: this.form.paymentStatus,
				paymentTimeStart: this.form.payment_time[0],
				paymentTimeEnd: this.form.payment_time[1],
				phone: this.form.phone,
				refundStatus: this.form.refundStatus,
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
