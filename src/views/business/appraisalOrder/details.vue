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
							<el-table-column prop="date" label="采集数量"></el-table-column>
							<el-table-column prop="date" label="服务类型"></el-table-column>
							<el-table-column prop="date" label="服务费用"></el-table-column>
							<el-table-column prop="date" label="订单状态"></el-table-column>
							<el-table-column prop="date" label="鉴评状态"></el-table-column>
							<el-table-column prop="date" label="物流状态"></el-table-column>
							<el-table-column prop="date" label="操作" width="150px" align="center">
								<template slot-scope="scope">
									<el-link type="primary" :underline="false" @click="logistics(scope.row)">物流信息</el-link>
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
				<el-button @click="send" type="primary" size="small">发货</el-button>
				<el-button @click="receiving" type="primary" size="small">收货</el-button>
			</div>
		</div>
		<!-- 发货弹窗 -->
		<el-dialog title="请填写物流信息" width="480px" class="sendDialog" :visible.sync="sendAlert" @close="sendAlertBeforeClose">
			<el-form ref="formAlert" :model="formAlert" label-width="100px">
				<el-form-item label="物流公司：">
					<el-select v-model="formAlert.a" placeholder="请选择" class="w328">
						<el-option v-for="(item,index) in logisticsCompany" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发货类型：">
					<el-radio-group v-model="formAlert.a">
						<el-radio :label="3">
							<span style="color: #333333;">正常发货</span>
						</el-radio>
						<el-radio :label="6">
							<span style="color: #333333;">退货</span>
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="物流单号：">
					<el-input v-model="formAlert.a" class="w328"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="cancel" size="small">取消</el-button>
				<el-button @click="Reconfirm" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 物流信息弹窗 -->
		<el-dialog title="物流信息" width="480px" class="sendDialog" :visible.sync="expressAlert">
			<div class="info">
				<span>物流公司：</span>
				<span>顺丰速运</span>
			</div>
			<div class="info">
				<span>快递单号：</span>
				<span>SF344255424255</span>
			</div>
			<div>
				<span>物流动态：</span>
				<p>2021-07-02 17:14:32  您的货物已发出，祝您签收愉快</p>
			</div>
			<div slot="footer">
				<el-button @click="expressAlert = false" size="small">关闭</el-button>
			</div>
		</el-dialog>
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
				formAlert:{
					a:''
				},
				show: true,
				codeTime: 60,
				timer: false,
				options: [],
				tableData:[{date:1}],
				sendAlert:false,
				expressAlert:false,
				// 物流公司
				logisticsCompany:[
					{name: '顺丰快递',value: 0},
					{name: '中通速运',value: 1}
				],
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
				  path: '/business/appraisalOrder/childDetails',
				  query: {
				    appraisalId: val.appraisalId,
				  }
				});
			},
			logistics(val){
				this.expressAlert=true;
			},
			goBack(){
				this.$router.go(-1);
			},
			send(){
				this.sendAlert=true;
			},
			receiving(){
				this.$confirm('是否确认收货，该操作不可撤销？', '提示', {
					confirmButtonText: '确定收货',
					cancelButtonText: '取消',
				}).then(() => {
					this.$message({
						type: 'success',
						message: '收货成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消收货'
					});  
				});
			},
			sendAlertBeforeClose(){
				this.$refs['formAlert'].resetFields();
			},
			Reconfirm(){
				this.$confirm('您确认要发货吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					this.$message({
						type: 'success',
						message: '发货成功!'
					});
					this.cancel();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消发货'
					});  
					this.cancel();
				});
			},
			cancel(){
				this.sendAlert=false;
			}
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
	.sendDialog{
		>>>.el-dialog__body{
			padding: 10px 20px;
		}
		.info{
			margin-bottom: 10px;
			color: #333333;
		}
		div{
			color: #333333;
			p{
				color: #666666;
				margin-top: 10px;
				line-height: 22px;
			}
		}
	}
</style>
