<template>
  <div class="container">
		<div class="print_box">
			<h2>邮票业务单</h2>
			<p class="print_time">打印时间：{{printData.printDate}}</p>
			<el-table :data="printData.ordersInfoVOS"
				:header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
				<el-table-column label="序号" type="index"></el-table-column>
				<el-table-column prop="orderId" label="子订单号"></el-table-column>
				<el-table-column prop="fullName" label="邮票名称"></el-table-column>
				<el-table-column label="单位">
					<template slot-scope="scope">
						<span v-if="scope.row.unit">{{ JSON.parse(scope.row.unit).desc }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="quantity" label="数量">1</el-table-column>
				<el-table-column label="服务类型">
					<template slot-scope="scope">
						<span v-if="scope.row.serviceType">{{ JSON.parse(scope.row.serviceType).desc }}</span>
					</template>
				</el-table-column>
				<el-table-column label="服务费用">
					<template slot-scope="scope">
						<span>¥{{ scope.row.serviceType }}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-row class="pay_info">
				<el-col :span="12" class="left">
					<p>手机号：{{printData.userPhone}}</p>
					<p>业务订单编号：{{printData.orderMainId}}</p>
					<p>合计：¥{{printData.orderMainAmount}}</p>
				</el-col>
				<el-col :span="12" class="right">
					<div>
						<P>订单付款码</P>
						<el-image :src="printData.codeUrl" fit="contain" style="width: 80px;height:80px;"></el-image>
					</div>
				</el-col>
			</el-row>
		</div>
  </div>
</template>
<script>
	import { GET_BUSINESS_ORDERMAIN_PRINT } from '@/api/request';
  export default {
    name: '',
    data() {
      return {
				printData:{
					ordersInfoVOS:[]
				}
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
			getData(){
				let params={
					orderMainId:this.$route.query.orderMainId
				}
				GET_BUSINESS_ORDERMAIN_PRINT(params).then(res =>{
					this.printData=res;
				})
			}
    },
  }
</script>
<style lang="scss" scoped>
	.container{
		background-color: #FFFFFF;
		margin-top: 20px;
		.print_box{
			width: 794px;
			margin: 0 auto;
			h2{
				font-size: 24px;
				color: #333333;
				text-align: center;
				padding: 24px 0;
			}
			.print_time{
				font-size: 14px;
				color: #333333;
				margin-bottom: 16px;
			}
			.pay_info{
				margin-top: 20px;
				padding: 0 24px;
				.left{
					text-align: left;
					font-size: 14px;
					color: #333333;
					p{
						margin-bottom: 15px;
					}
					p:last-child{
						font-size: 16px;
						color: #151515;
					}
				}
				.right{
					text-align: right;
					div{
						width: 80px;
						display: inline-block;
						text-align: center;
						p{
							margin-bottom:10px;
						}
					}
				}
			}
		}
	}
</style>
