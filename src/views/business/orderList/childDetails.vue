<template>
  <div class="container">
		<Breadcrumb></Breadcrumb>
		<div>
			<div class="floor">
				<h3>订单信息</h3>
				<el-row>
					<el-col :span="8">
						<span class="order_info">业务订单编号：</span>
						<span>{{ form.orderMainCode }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">子订单号：</span>
						<span>{{ form.orderId }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">订单状态：</span>
						<span>{{ form.orderstatus }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">支付状态：</span>
						<span>{{ form.paymentStatus }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">支付方式：</span>
						<span>{{ form.paymentMethod }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">支付时间：</span>
						<span>{{ form.paymentDate }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">鉴评方式：</span>
						<span>{{ form.evalmethod }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">补缴金额（或退换金额）：</span>
						<span>¥ {{ form.refPayCost }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">补缴时间（或退还时间）：</span>
						<span>{{ form.refPayDate }}</span>
					</el-col>
					<el-col :span="8">
						<span class="order_info">服务费用总计：</span>
						<span>¥ {{ form.orderMainCode }}</span>
					</el-col>
				</el-row>
				<div class="splitAmount">
					<p class="line"></p>
					<div>
						<span>采集</span>
						<span>¥ {{ form.collectionCost }}</span>
					</div>
					<div>
						<span>鉴别</span>
						<span>¥ {{ form.appraisalFee }}</span>
					</div>
					<div>
						<span>评级</span>
						<span>¥ {{ form.ratingFee }}</span>
					</div>
					<div>
						<span>封装</span>
						<span>¥ {{ form.packagingCost }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="floor">
			<h3>邮票列表</h3>
			<div class="tableList">
				<el-table :data="form.orderItems" :header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
					<el-table-column label="序号" type="index"></el-table-column>
					<el-table-column prop="fullName" label="邮票名称"></el-table-column>
					<el-table-column prop="date" label="单位">枚</el-table-column>
					<el-table-column prop="date" label="数量">1</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-link
								v-if="![0].includes(form.orderstatus)"
								type="primary" :underline="false"
								@click="openDetails(scope.row)">查看</el-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog title="订单详情" :visible.sync="detailsAlert" width="640px" class="details">
			<div style="height: 400px; overflow: auto;">
				<Details></Details>
			</div>
		</el-dialog>
  </div>
</template>
<script>
import {
	GET_BUSINESS_ORDER_VIEW,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
import Details from '@/views/business/Index';
export default {
    name: '',
		components: {
			Breadcrumb,
			Details
		},
    data() {
		return {
			form:[],
			detailsAlert:false,
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
		getData() {
			let params = {
				orderId: this.$route.query.orderId
			}
			GET_BUSINESS_ORDER_VIEW(params).then(res => {
				Object.assign(this.form, res.data);
			});
		},
		openDetails(val){
			this.detailsAlert=true;
		}
    },
  }
</script>
<style lang="scss" scoped>
	.floor {
		background: #FFFFFF;
		margin-bottom: 16px;
		padding-bottom: 10px;
		font-size: 14px;
		color: #333333;
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
		}
	}
	.order_info{
		display: inline-block;
		width: 175px;
		text-align: right;
		margin-bottom: 20px;
	}
	.splitAmount{
		padding: 0 24px;
		.line{
			border:1px dashed #E9E9E9;
		}
		div{
			margin-top: 15px;
			span{
				font-size: 14px;
				color: #666666;
				margin: 0 100px;
			}
		}
	}
	.details{
		>>>.el-dialog__body{
			padding: 10px 20px;
		}
	}
</style>
