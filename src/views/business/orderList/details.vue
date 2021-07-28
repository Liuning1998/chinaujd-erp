<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="floor">
					<h3>用户基本信息</h3>
					<el-form-item label="手机号">
						<el-input v-model="form.phone" type="text" disabled class="w350"></el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>服务商基本信息</h3>
					<el-form-item label="收货地址:" prop="areaId">
						<el-cascader v-model="form.areaId" :options="options" disabled
							:props="{value:'id',label:'name',children:'childrens'}"
							class="w350"></el-cascader>
					</el-form-item>
					<el-form-item label="" prop="address">
						<el-input v-model="form.address" type="textarea" disabled :rows="2" resize="none" placeholder="详细地址"
							class="w350"></el-input>
					</el-form-item>
					<el-form-item label="收货人">
						<el-input v-model="form.phone" type="text" disabled class="w350"></el-input>
					</el-form-item>
					<el-form-item label="收货手机号">
						<el-input v-model="form.phone" type="text" disabled class="w350"></el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>订单信息</h3>
					<el-row>
						<el-col :span="8">
							<span class="order_info">业务订单编号：</span>
							<span>343535455</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">订单状态：</span>
							<span>已提交</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">鉴评方式：</span>
							<span>远程鉴评</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付状态：</span>
							<span>未支付</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付方式：</span>
							<span>343535455</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">订单金额：</span>
							<span>¥189.00</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付时间：</span>
							<span>343535455</span>
						</el-col>
					</el-row>
				</div>
				<div class="floor">
					<h3>售后信息</h3>
					<el-row>
						<el-col :span="8">
							<span class="order_info">售后状态：</span>
							<span>343535455</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">退款金额：</span>
							<span>已提交</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">退款时间：</span>
							<span>远程鉴评</span>
						</el-col>
					</el-row>
				</div>
				<div class="floor">
					<h3>邮票列表</h3>
					<div class="tableList">
						<el-table :data="tableData" :header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
							<el-table-column prop="date" label="序号"></el-table-column>
							<el-table-column prop="date" label="子订单号"></el-table-column>
							<el-table-column prop="date" label="邮票名称"></el-table-column>
							<el-table-column prop="date" label="单位"></el-table-column>
							<el-table-column prop="date" label="数量"></el-table-column>
							<el-table-column prop="date" label="服务类型"></el-table-column>
							<el-table-column prop="date" label="鉴评方式"></el-table-column>
							<el-table-column prop="date" label="服务费用"></el-table-column>
							<el-table-column prop="date" label="订单状态"></el-table-column>
							<el-table-column prop="date" label="操作">
								<template slot-scope="scope">
									<el-link type="primary" :underline="false" @click="goDetails(scope.row)">绑定</el-link>
									<el-divider direction="vertical"></el-divider>
									<el-link type="primary" :underline="false" @click="Unbound(scope.row)">解绑</el-link>
									<el-divider direction="vertical"></el-divider>
									<el-link type="primary" :underline="false" @click="goDetails(scope.row)">调价</el-link>
									<el-divider direction="vertical"></el-divider>
									<el-link type="primary" :underline="false" @click="goDetails(scope.row)">查看</el-link>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-form>
			<div class="buttom_btn">
				<el-button @click="goBack" size="small">返回</el-button>
				<el-button type="primary" size="small">审核</el-button>
				<el-button type="primary" size="small" @click="goConfirm">补缴确认</el-button>
				<el-button type="primary" size="small" @click="cancel">取消订单</el-button>
				<el-button type="primary" size="small" @click="print">打印订单</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	import Breadcrumb from '@/components/Breadcrumb';
	export default {
		name: '',
		components: {
			Breadcrumb
		},
		data() {
			return {
				form: {
					serviceType: '',
					phone: '',
					areaId: '',
					address: ''
				},
				show: true,
				codeTime: 60,
				timer: false,
				options: [],
				tableData:[{date:1}]
			}
		},
		// 模板渲染前钩子函数
		created() {

		},
		// 模板渲染后钩子函数
		mounted() {

		},
		methods: {
			goDetails(val){
				this.$router.push({
				  path: '/business/orderList/childDetails',
				  query: {
				    appraisalId: val.appraisalId,
				  }
				});
			},
			print(){
				this.$router.push({
				  path: '/business/orderList/print',
				  query: {
				    appraisalId: '',
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
					this.$message({
						type: 'success',
						message: '取消成功!'
					});
					this.goBack();
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消发货'
					// });  
				});
			},
			// 解绑操作
			Unbound(val){
				this.$confirm('您确认要解除该子订单与邮票关系吗？', '提示：解绑', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					this.$message({
						type: 'success',
						message: '解绑成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消解绑'
					});  
				});
			},
			// 补缴确认
			goConfirm(){
				this.$confirm('确认该订单是否已补缴？', '提示：补缴确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					this.$message({
						type: 'success',
						message: '确认成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消确认'
					});  
				});
			},
		},
	}
</script>
<style lang="scss" scoped>
	.w350 {
		width: 350px;
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
	.buttom_btn{
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
