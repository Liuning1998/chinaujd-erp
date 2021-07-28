<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="bgfff">
			<el-form ref="form" :model="form" label-width="100px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="业务订单编号:">
							<el-input v-model="form.a" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮票名称:">
							<el-input v-model="form.a" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="用户手机号:">
							<el-input v-model="form.a" class="w240"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="订单状态:">
							<el-select v-model="form.a" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in orderState" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="支付状态:">
							<el-select v-model="form.a" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in payState" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="服务类型:">
							<el-select v-model="form.a" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in serviceType" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="物流状态:">
							<el-select v-model="form.a" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in logisticsStatus" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="鉴评方式:">
							<el-select v-model="form.a" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in appraisalMode" :key="index" :label="item.name"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="创建时间:">
							<el-date-picker v-model="form.a" size="small" type="datetimerange" range-separator="至"
								start-placeholder="开始日期" end-placeholder="结束日期"
								:default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<div style="padding-left: 20px;">
							<el-button type="primary" size="small" @click="query">查询</el-button>
							<el-button size="small">重置</el-button>
							<el-button @click="orderExport" size="small">导出</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="table_box bgfff">
			<el-table :data="tableData"
				:header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}" style="width: 100%">
				<el-table-column prop="a" label="业务订单编号"></el-table-column>
				<el-table-column prop="a" label="手机号"></el-table-column>
				<el-table-column prop="a" label="邮票数量"></el-table-column>
				<el-table-column label="订单金额">
					<template slot-scope="scope">
						<p>¥{{scope.row.a}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="a" label="鉴评状态"></el-table-column>
				<el-table-column prop="a" label="订单状态"></el-table-column>
				<el-table-column prop="a" label="物流状态"></el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template slot-scope="scope">
						<el-link type="primary" :underline="false" @click="send(scope.row)">发货</el-link>
						<el-divider direction="vertical"></el-divider>
						<el-link type="primary" :underline="false" @click="detail(scope.row)">查看</el-link>
					</template>
				</el-table-column>
			</el-table>
			<div class="page_box">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pagebox.currentPage-0" :page-sizes="[20, 50, 100, 200]"
					:page-size="pagebox.pageSize-0" layout="total, sizes, prev, pager, next, jumper"
					:total="pagebox.total-0">
				</el-pagination>
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
					a: ''
				},
				formAlert:{
					a:''
				},
				tableData: [{
					a: 1
				}],
				currentPage: 1,
				pageSize: 20,
				pagebox: {},
				sendAlert:false,
				// 物流公司
				logisticsCompany:[
					{name: '顺丰快递',value: 0},
					{name: '中通速运',value: 1}
				],
				// 物流状态
				logisticsStatus: [{
						name: '服务商未发货',
						value: 0
					},
					{
						name: '服务商已发货',
						value: 1
					},
					{
						name: '鉴评点未发货',
						value: 2
					},
					{
						name: '鉴评点已发货',
						value: 3
					},
					{
						name: '鉴评点已退货',
						value: 4
					},
					{
						name: '封装厂未发货',
						value: 5
					},
					{
						name: '封装厂已发货',
						value: 6
					}
				],
				// 服务类型
				serviceType: [{
						name: '采集+鉴别',
						value: 0
					},
					{
						name: '采集+评级',
						value: 1
					},
					{
						name: '采集+鉴别+封装',
						value: 2
					},
					{
						name: '采集+评级+封装',
						value: 3
					},
					{
						name: '核验',
						value: 4
					}
				],
				// 支付状态
				payState: [{
						name: '未支付',
						value: 0
					},
					{
						name: '已支付',
						value: 1
					}
				],
				// 退款状态
				refundStatus: [{
						name: '退款中',
						value: 0
					},
					{
						name: '已退款',
						value: 1
					}
				],
				// 鉴评方式
				appraisalMode: [{
						name: '远程鉴评',
						value: 0
					},
					{
						name: '批量鉴评',
						value: 1
					}
				],
				// 订单状态
				orderState: [{
						name: '已提交',
						value: 0
					},
					{
						name: '待审核',
						value: 1
					},
					{
						name: '待鉴评',
						value: 2
					},
					{
						name: '封装中',
						value: 3
					},
					{
						name: '已完成',
						value: 4
					},
					{
						name: '售后中',
						value: 5
					},
					{
						name: '已关闭',
						value: 6
					},
					{
						name: '待核验',
						value: 7
					}
				]
			}
		},
		// 模板渲染前钩子函数
		created() {

		},
		// 模板渲染后钩子函数
		mounted() {

		},
		methods: {
			detail(val) {
				this.$router.push({
					path: '/business/appraisalOrder/details',
					query: {
						appraisalId: val.appraisalId,
					}
				});
			},
			send(val) {
				this.sendAlert=true;
			},
			// 查询
			query() {
				this.currentPage = 1;
				this.getList();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			},
			getList() {

			},
			orderExport() {

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
	.w240 {
		width: 240px;
	}

	.table_box {
		padding: 20px;
		margin-top: 16px;
	}

	.page_box {
		text-align: center;
		margin: 20px 0 0;
	}

	.bgfff {
		background: #FFFFFF;
		padding: 24px;

		>>>.el-form-item {
			margin-bottom: 10px;
		}

		>>>.el-form-item__label {
			color: rgba(0, 0, 0, 0.85);
		}

		>>>.el-input__inner {
			height: 32px;
			line-height: 32px;
		}
	}
	.w328{
		width: 328px;
	}
	.sendDialog{
		>>>.el-dialog__body{
			padding: 10px 20px;
		}
	}
</style>
