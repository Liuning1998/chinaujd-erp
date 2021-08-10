<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="floor">
					<h3>用户基本信息</h3>
					<el-form-item label="手机号：">
						<el-input v-model="form.orderUserInfoVO.userPhone" type="text" disabled class="w272"></el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>服务商基本信息</h3>
					<el-form-item label="收货地址：" prop="areaId">
						<el-input v-model="form.orderServicesInfoVO.areaId" placeholder="" disabled class="w272"></el-input>
					</el-form-item>
					<el-form-item label="" prop="address">
						<el-input v-model="form.orderServicesInfoVO.address" type="textarea" disabled :rows="2" resize="none" placeholder="详细地址"
							class="w272"></el-input>
					</el-form-item>
					<el-form-item label="收货人：">
						<el-input v-model="form.orderServicesInfoVO.consignee" type="text" disabled class="w272"></el-input>
					</el-form-item>
					<el-form-item label="收货手机号：">
						<el-input v-model="form.orderServicesInfoVO.phone" type="text" disabled class="w272"></el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>订单信息</h3>
					<el-row>
						<el-col :span="8">
							<span class="order_info">业务订单编号：</span>
							<span>{{ form.orderMainCode }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">订单状态：</span>
							<span>{{ orderState.find(item => item.value === form.orderMainStatus).name || '' }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">鉴评方式：</span>
							<span>{{ appraisalMode.find(item => item.value === form.evalmethod).name || ''  }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付状态：</span>
							<span>{{ payState.find(item => item.value === form.paymentStatus).name || ''  }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付方式：</span>
							<span>{{ paymentMethod.find(item => item.value === form.paymentMethod).name || '' }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">订单金额：</span>
							<span>¥ {{ form.orderMainAmount }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付时间：</span>
							<span>{{ form.paymentDate }}</span>
						</el-col>
					</el-row>
				</div>
				<div class="floor" v-if="form.orderRefundInfoVO">
					<h3>售后信息</h3>
					<el-row>
						<el-col :span="8">
							<span class="order_info">售后状态：</span>
							<span>{{ refundStatus.find(item => item.value === form.orderRefundInfoVO.refundStatus).name || '' }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">退款金额：</span>
							<span>¥ {{ form.orderRefundInfoVO.refundCost }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">退款时间：</span>
							<span>{{ form.orderRefundInfoVO.refundDate }}</span>
						</el-col>
					</el-row>
				</div>
				<div class="floor">
					<h3>邮票列表</h3>
					<div class="tableList">
						<el-table :data="form.ordersInfoVOS" :header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="orderId" label="子订单号"></el-table-column>
							<el-table-column prop="fullName" label="邮票名称"></el-table-column>
							<el-table-column prop="unit" label="单位"></el-table-column>
							<!-- <el-table-column prop="quantity" label="数量"></el-table-column> -->
							<el-table-column label="服务类型">
								<template slot-scope="scope">
									{{ serviceType.find(item => item.value === scope.row.serviceType).name }}
								</template>
							</el-table-column>
							<el-table-column label="鉴评方式">
								<template slot-scope="scope">
									{{ appraisalMode.find(item => item.value === scope.row.evalmethod).name }}
								</template>
							</el-table-column>
							<el-table-column prop="modifyPriceNumber" label="服务费用"></el-table-column>
							<el-table-column label="订单状态">
								<template slot-scope="scope">
									{{ orderState.find(item => item.value === scope.row.orderstatus).name }}
								</template>
							</el-table-column>
							<el-table-column width="180" label="操作">
								<template slot-scope="scope">
									<el-link
										v-if="Number(scope.row.bindStatus) === 0 && [2].includes(form.orderMainStatus)"
										type="primary"
										@click="bound(scope.row.orderId)">绑定</el-link>
									<el-divider
										v-if="Number(scope.row.bindStatus) === 0 && [2].includes(form.orderMainStatus)"
										direction="vertical"></el-divider>
									<el-link
										v-if="Number(scope.row.bindStatus) === 1 && [2].includes(form.orderMainStatus)"
										type="primary"
										@click="Unbound(scope.row.orderId)">解绑</el-link>
									<el-divider
										v-if="Number(scope.row.bindStatus) === 1 && [2].includes(form.orderMainStatus)"
										direction="vertical"></el-divider>
									<el-link
										v-if="!Number(scope.row.modifyPriceNumber) && [2].includes(form.orderMainStatus)"
										type="primary" @click="modifyPrice(scope.row.orderId)">调价</el-link>
									<el-divider
										v-if="!Number(scope.row.modifyPriceNumber) && [2].includes(form.orderMainStatus)"
										direction="vertical"></el-divider>
									<el-link
										type="primary"
										@click="goDetails(scope.row.orderId)">查看</el-link>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-form>
			<div class="button_btn">
				<el-button @click="goBack" size="small">返回</el-button>
				<el-button
					v-if="[2].includes(form.orderMainStatus)"
					type="primary" size="small" @click="audit">审核</el-button>
				<el-button
					v-if="[1].includes(form.orderMainStatus)"
					type="primary" size="small" @click="cancel">取消订单</el-button>
				<el-button
					v-if="[0].includes(form.orderMainStatus)"
					type="primary" size="small" @click="print">打印订单</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import {
	GET_BUSINESS_ORDERMAIN_VIEW,
	POST_BUSINESS_ORDER_UBIND,
	POST_BUSINESS_ORDERMAIN_CANCEL,
	POST_BUSINESS_ORDERMAIN_AUDIT,
	GET_BUSINESS_ORDERMAIN_PRINT,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
export default {
	name: '',
	components: {
		Breadcrumb
	},
	data() {
		return {
			form: {
				orderUserInfoVO: {
					userPhone: '',
				},
				orderServicesInfoVO: {
					areaId: '',
					address: '',
					consignee: '',
					phone: ''
				},
				ordersInfoVOS: [
					{
						orderId: 1,
						fullName: '大撒上的',
						unit: '个',
						quantity: 12,
						serviceType: 1,
						evalmethod: 1,
						modifyPriceNumber: 111,
						orderstatus: 3,
						bindStatus: 1,
						modifyPriceNumber: 1
					},
					{
						orderId: 1,
						fullName: '大撒上的',
						unit: '个',
						quantity: 12,
						serviceType: 1,
						evalmethod: 1,
						modifyPriceNumber: 111,
						orderstatus: 3,
						bindStatus: 0,
						modifyPriceNumber: 0
					},
					{
						orderId: 1,
						fullName: '大撒上的',
						unit: '个',
						quantity: 12,
						serviceType: 1,
						evalmethod: 1,
						modifyPriceNumber: 111,
						orderstatus: 3,
						bindStatus: 0,
						modifyPriceNumber: 1
					},
					{
						orderId: 1,
						fullName: '大撒上的',
						unit: '个',
						quantity: 12,
						serviceType: 1,
						evalmethod: 1,
						modifyPriceNumber: 111,
						orderstatus: 3,
						bindStatus: 1,
						modifyPriceNumber: 0
					},
				],
				orderMainStatus: '',
				paymentMethod: '',
				paymentStatus: '',
				evalmethod: '',
				paymentDate: '',
				orderMainCode: '',
				orderMainAmount: ''
			},
			show: true,
			codeTime: 60,
			timer: false,
			options: [],
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
			appraisalMode:[
				{name: '远程鉴评',value:0},
				{name: '批量鉴评',value:1}
			],
			payState:[
				{name: '未支付',value:0},
				{name: '已支付',value:1}
			],
			paymentMethod: [
				{name: '微信小程序支付', value: 'WX'},
				{name: '微信扫码支付', value: 'WX_OFFLINE'}
			],
			serviceType:[
				{name: '采集+鉴别',value:0},
				{name: '采集+评级',value:1},
				{name: '采集+鉴别+封装',value:2},
				{name: '采集+评级+封装',value:3},
				{name: '核验',value:4}
			],
			refundStatus: [
				{name: '退款中', value: 0},
				{name: '已退款', value: 1}
			],
			bindDialogVisible: false,
		}
	},
	// 模板渲染前钩子函数
	created() {
		this.getData();
	},
	// 模板渲染后钩子函数
	mounted() {

	},
	methods: {
		/**
		 * 获取订单详情
		 * @function getData
		 */
		getData() {
			let params = {
				orderMainId: this.$route.query.orderMainId
			}
			GET_BUSINESS_ORDERMAIN_VIEW(params).then(res => {
				Object.assign(this.form, res.data);
			});
			let data = {
				orderUserInfoVO: {
					userPhone: 11,
				},
				orderServicesInfoVO: {
					areaId: 22,
					address: '山西',
					consignee: '张三',
					phone: '10086'
				},
				// orderRefundInfoVO: {
				// 	refundCost: '11',
				// 	refundDate: '2020.20.20',
				// 	refundStatus: 1
				// },
				orderMainStatus: 2,
				paymentMethod: 'WX_OFFLINE',
				paymentStatus: 1,
				evalmethod: 1,
				paymentDate: '2020.01.01',
				orderMainCode: 12345678,
				orderMainAmount: 100
			};
			Object.assign(this.form, data);
		},
		/**
		 * 获取邮票列表-绑定用
		 * @function getStampList
		 * @params {Number} orderMainId
		 */
		getStampList() {
			
		},
		goDetails(orderId){
			this.$router.push({
				path: '/business/orderList/childDetails',
				query: {
				orderId,
				}
			});
		},
		print(){
			GET_BUSINESS_ORDERMAIN_PRINT({
				orderMainId: this.$route.query.orderMainId
			}).then(res => {
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
		goBack(){
			this.$router.go(-1);
		},
		// 取消订单
		cancel(){
			this.$confirm('您确认要取消全部订单吗？', '提示：取消订单', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				POST_BUSINESS_ORDERMAIN_CANCEL({
					orderMainId: this.$route.query.orderMainId
				}).then(() => {
					this.$message.success('取消成功!');
				});
			});
		},
		// 审核订单
		audit() {
			this.$confirm('您确认要审核通过吗？', '提示：审核', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				POST_BUSINESS_ORDERMAIN_AUDIT({
					orderMainId: this.$route.query.orderMainId
				}).then(() => {
					this.$message.success('审核成功!');
				});
			});
		},
		// 绑定
		bound(orderId) {},
		// 解绑操作
		Unbound(orderId){
			this.$confirm('您确认要解除该子订单与邮票关系吗？', '提示：解绑', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				POST_BUSINESS_ORDER_UBIND({
					orderId
				}).then(() => {
					this.$message.success('解绑成功');
					this.getData();
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消解绑'
				});
			});
		},
		// 调价
		modifyPrice(orderId) {},
	},
}
</script>
<style lang="scss" scoped>
	.w272 {
		width: 272px;
	}

	.w200 {
		width: 200px;
	}

	.floor {
		background: #FFFFFF;
		margin-bottom: 16px;
		padding-bottom: 10px;
		>>>.el-form-item__label{
			color: #151515;
		}
		>>>.el-input__inner{
			height: 32px;
			line-height: 32px;
		}
		.tableList{
			padding: 0 20px 10px;
		}
		h3 {
			width: 100%;
			font-size: 16px;
			color: #333333;
			line-height: 24px;
			border-bottom: 1px solid #E9E9E9;
			padding: 15px;
			margin-bottom: 24px;
			overflow: hidden;

			span {
				display: inline-block;
				line-height: 32px;
			}
		}
	}

	.title {
		font-size: 14px;
		color: #666666;
		margin: 8px 0 0 24px;
	}

	.selectName {
		font-size: 16px;
		color: #333333;
	}
	.button_btn{
		background-color: #FFFFFF;
		padding: 10px 20px;
		text-align: right;
	}
	.order_info{
		display: inline-block;
		width: 120px;
		text-align: right;
		margin-bottom: 20px;
	}
</style>
