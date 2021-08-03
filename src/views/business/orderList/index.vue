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
							<el-select v-model="form.a" placeholder="请选择" class="w240">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in logisticsStatus" :key="index" :label="item.name"
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
							<el-button type="primary" size="small" @click="query">查询</el-button>
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
			  <el-table-column prop="orderMainCode" label="业务订单编号"></el-table-column>
			  <el-table-column prop="phone" label="手机号"></el-table-column>
			  <el-table-column prop="a" label="服务商名称"></el-table-column>
				<el-table-column prop="number" label="邮票数量"></el-table-column>
				<el-table-column label="订单金额">
					<template slot-scope="scope">
					  <p>¥{{scope.row.orderMainAmount}}</p>
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
			  <el-table-column fixed="right" label="操作" width="100" align="center">
			    <template slot-scope="scope">
			      <el-button @click="detail(scope.row)" type="text">查看</el-button>
			    </template>
			  </el-table-column>
			</el-table>
			<div class="page_box pagination" v-if="total > pageSize">
			  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			  	:current-page="currentPage-0" background
			  	:page-size="pageSize-0" layout="prev, pager, next, sizes, jumper"
			  	:total="total-0">
			  </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		POST_BUSINESS_ORDER_LISTPAGE,
		POST_EXPORT_BUSINESS_ORDER_EXPORT,
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
					serviceType: null
				},
				tableData:[],
				total: 0,
				currentPage:1,
				pageSize:15,
				// 物流状态
				logisticsStatus:[
					{name: '服务商未发货',value:0},
					{name: '服务商已发货',value:1},
					{name: '鉴评点未发货',value:2},
					{name: '鉴评点已发货',value:3},
					{name: '鉴评点已退货',value:4},
					{name: '封装厂未发货',value:5},
					{name: '封装厂已发货',value:6}
				],
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
				]
			}
		},
		// 模板渲染前钩子函数
		created() {
			this.getList();
		},
		// 模板渲染后钩子函数
		mounted() {

		},
		methods: {
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
			query(){
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
				let table = [
					{
						evalmethod: 1,
						orderMainCode: 10086,
						orderMainId: 12580,
						orderMainStatus: 2,
						paymentStatus: 0,
						phone: 12345678901,
						gmtCreate: '2020.02.02',
						paymentDate: '2021.12.21',
						number: 12,
						orderMainAmount: 250
					}
				];
				this.tableData = table;
				POST_BUSINESS_ORDER_LISTPAGE(params).then(res => {
					this.tableData = res.data.rows;
					this.total = res.data.total;
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
					serviceType: null
				};
				Object.assign(this.form, form);
			},
			orderExport(){
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
			}
		},
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
	.page_box{
	  text-align: center;
	  margin:20px 0 0;
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
</style>
