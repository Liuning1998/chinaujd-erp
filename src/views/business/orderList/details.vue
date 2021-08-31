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
					<el-form-item label="收货地址：">
						<el-input v-model="form.orderServicesInfoVO.areaName" placeholder="" disabled class="w272"></el-input>
					</el-form-item>
					<el-form-item label="">
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
							<span v-if="form.orderMainStatus">{{ form.orderMainStatus.desc }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">鉴评方式：</span>
							<span v-if="form.evalmethod">{{ form.evalmethod.desc }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付状态：</span>
							<span v-if="form.paymentStatus">{{ form.paymentStatus.desc }}</span>
						</el-col>
						<el-col :span="8">
							<span class="order_info">支付方式：</span>
							<span v-if="form.paymentMethod">{{ form.paymentMethod.desc }}</span>
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
							<span v-if="form.orderRefundInfoVO.refundStatus">{{ JSON.parse(form.orderRefundInfoVO.refundStatus).desc }}</span>
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
							<el-table-column label="单位">
								<template slot-scope="scope">
									<span v-if="scope.row.unit">{{scope.row.unit.desc}}</span>
								</template>
							</el-table-column>
							<el-table-column label="服务类型">
								<template slot-scope="scope">
									<span v-if="scope.row.serviceType">{{scope.row.serviceType.desc}}</span>
								</template>
							</el-table-column>
							<el-table-column label="服务费用">
								<template slot-scope="scope">
									¥{{ scope.row.cost }}
								</template>
							</el-table-column>
							<el-table-column label="订单状态">
								<template slot-scope="scope">
									<span v-if="scope.row.orderstatus">{{scope.row.orderstatus.desc}}</span>
								</template>
							</el-table-column>
							<el-table-column width="180" label="操作">
								<template slot-scope="scope">
									<el-link
										v-if="scope.row.bindStatus.value === 0 && [2].includes(form.orderMainStatus.value)"
										type="primary"
										@click="bound(scope.row)">绑定</el-link>
									<el-divider
										v-if="scope.row.bindStatus.value === 0 && [2].includes(form.orderMainStatus.value)"
										direction="vertical"></el-divider>
									<el-link
										v-if="scope.row.bindStatus.value === 1 && [2].includes(form.orderMainStatus.value)"
										type="primary"
										@click="Unbound(scope.row.orderId)">解绑</el-link>
									<el-divider
										v-if="scope.row.bindStatus.value === 1 && [2].includes(form.orderMainStatus.value)"
										direction="vertical"></el-divider>
									<!-- <el-link
										v-if="!Number(scope.row.modifyPriceNumber) && [2].includes(form.orderMainStatus)"
										type="primary" @click="modifyPrice(scope.row.orderId)">调价</el-link> -->
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
					v-if="[2].includes(form.orderMainStatus.value) && showExamine"
					type="primary" size="small" @click="audit">审核</el-button>
				<el-button
					v-if="[2].includes(form.orderMainStatus.value)"
					type="primary" size="small" @click="cancel">取消订单</el-button>
				<el-button
					v-if="[0].includes(form.orderMainStatus.value)"
					type="primary" size="small" @click="print">打印订单</el-button>
			</div>
		</div>
		<!-- 绑定弹窗 -->
		<el-dialog title="信息解绑" :visible.sync="alertBind" width="850px" @close="handleClose" class="infoBind">
			<div>
				<el-row>
					<el-col :span="12" class="borderRight">
						<h3>子订单邮票信息</h3>
						<el-table :data="stampList" ref="bindBox" @row-click="stampItem" highlight-current-row max-height	="340px">
							<el-table-column prop="name" label="邮票名称" ></el-table-column>
							<el-table-column label="样例" width="60px">
								<template slot-scope="scope">
									<el-image :src="scope.row.url" fit="contain" :preview-src-list="[scope.row.url]" :z-index="3000" style="width: 40px; height:40px;"></el-image>
								</template>
							</el-table-column>
							<el-table-column label="绑定数量" width="80px" align="center">
								<template slot-scope="scope">
									({{ scope.row.bindArr.length }})
								</template>
							</el-table-column>
						</el-table>
					</el-col>
					<el-col :span="11">
						<h3>邮票采集信息</h3>
						<div class="stampImgList">
							<el-checkbox-group v-model="tempBindData" @change="selectImg">
								<div v-for="(item,index) in stampImgList" :key="index" class="imgItem">
									<el-checkbox :label="item">{{ }}</el-checkbox>
									<el-image :src="item.imageUrl" fit="contain" :preview-src-list="[item.imageUrl]" :z-index="3000" style="width: 144px;height: 144px;background:#333333;"></el-image>
								</div>
							</el-checkbox-group>
						</div>
					</el-col>
				</el-row>
			</div>
			<div slot="footer">
				<el-button @click="cancelBind" size="small">取消</el-button>
				<el-button @click="addBind" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {
	GET_BUSINESS_ORDERMAIN_VIEW,
	POST_BUSINESS_ORDER_UBIND,
	POST_BUSINESS_ORDERMAIN_CANCEL,
	POST_BUSINESS_ORDERMAIN_AUDIT,
	GET_QUERYITEMSBYORDERID,
	POST_QUERYBOUNDSTAMPDATA,
	POST_OREDR_BIND
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
export default {
	name: '',
	components: {
		Breadcrumb
	},
	data() {
		return {
			alertBind:false,
			tempBindData:[],
			stampImgList:[], //全部图片集合
			unselectImgList:[], //剩余未选集合
			checkedImg:[],  //已选集合
			currentRow:null, //当前点击行
			currentRowIndex:0, //当前行的下标
			orderId:'',
			form: {
				orderUserInfoVO: {
					userPhone: ''
				},
				orderServicesInfoVO: {
					areaId: '',
					address: '',
					consignee: '',
					phone: ''
				},
				ordersInfoVOS: [],
				orderMainStatus: '',
				paymentMethod: '',
				paymentStatus: '',
				evalmethod: '',
				paymentDate: '',
				orderMainCode: '',
				orderMainAmount: ''
			},
			stampList:[],
		}
	},
	computed:{
		// 是否全部绑定
		showExamine(){
			let flag=false;
			for(let i=0; i<this.form.ordersInfoVOS.length; i++){
				let item=this.form.ordersInfoVOS[i]
				if(item.bindStatus.value == 1){
					flag=true;
				}else{
					flag=false;
					break;
				}
			}
			if(flag){
				return true;
			}else{
				return false;
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
		/**
		 * 获取订单详情
		 * @function getData
		 */
		getData() {
			let params = {
				orderMainId: this.$route.query.orderMainId
			}
			GET_BUSINESS_ORDERMAIN_VIEW(params).then(res => {
				res.ordersInfoVOS.forEach(item =>{
					item.bindStatus=item.bindStatus&&JSON.parse(item.bindStatus);
					item.orderstatus=item.orderstatus&&JSON.parse(item.orderstatus);
					item.serviceType=item.serviceType&&JSON.parse(item.serviceType);
					item.unit=item.unit&&JSON.parse(item.unit);
				})
				Object.assign(this.form, res);
				let tempArr=res.orderServicesInfoVO.areaName.split(',');
				this.form.orderServicesInfoVO.areaName=tempArr.join('/');
				this.form.evalmethod=res.evalmethod&&JSON.parse(res.evalmethod);
				this.form.orderMainStatus=res.orderMainStatus&&JSON.parse(res.orderMainStatus);
				this.form.paymentStatus=res.paymentStatus&&JSON.parse(res.paymentStatus);
				this.form.paymentMethod=res.paymentMethod&&JSON.parse(res.paymentMethod);
			});
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
			this.$router.push({
				path: '/business/orderList/print',
				query: {
					orderMainId:this.$route.query.orderMainId,
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
					this.goBack();
				});
			}).catch(() => {
				
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
					this.getData();
				});
			}).catch(() => {
				
			});
		},
		// 绑定查询子邮票
		queryStamp(orderId){
			let params={
				orderId:orderId
			}
			GET_QUERYITEMSBYORDERID(params).then(res =>{
				res.forEach(item =>{
					item.bindArr=[]
				});
				this.stampList=res;
				this.$refs.bindBox.setCurrentRow(this.stampList[0]);
				this.currentRow=this.stampList[0];
			})
		},
		// 查询邮票图
		getImg(){
			let params={
				agentId:'751169582139441152',
				userPhoneNumber:'13760321295'
			}
			POST_QUERYBOUNDSTAMPDATA(params).then(res =>{
				this.stampImgList=res.collectionBoundStampVoList;
			})
		},
		// 选择采集图片
		selectImg(){
			// 单选
			if(this.stampList.length > 1){
				if(this.tempBindData.length>1){
					this.tempBindData.splice(0,1)
				}
			}
			// 多选
			this.stampList[this.currentRowIndex].bindArr=this.tempBindData;
		},
		// 表格点击
		stampItem(row, event, column){
			if(this.currentRow == row) return false; //防止重复点击
			this.currentRow=row;
			this.currentRowIndex=this.stampList.indexOf(row);
			this.checkedImg=this.checkedImg.concat(this.tempBindData);
			this.stampImgList=this.stampImgList.filter(item => !this.tempBindData.includes(item));
			this.stampImgList=row.bindArr.concat(this.stampImgList);
			this.tempBindData=row.bindArr;
		},
		// 绑定弹窗
		bound(row) {
			this.alertBind=true;
			this.orderId=row.orderId;
			this.queryStamp(row.orderId);
			this.getImg();
		},
		// 绑定关闭
		handleClose(){
			this.alertBind=false;
			this.tempBindData=[];
			this.stampImgList=[];
			this.unselectImgList=[];
			this.checkedImg=[];
			this.currentRow=null;
			this.currentRowIndex=0;
		},
		// 取消绑定
		cancelBind(){
			this.handleClose();
		},
		// 确认绑定提交
		addBind(){
			let orderItems=[];
			let flag=true;
			if(this.stampList.length>1){
				for(var i=0; i<this.stampList.length; i++){
					let item=this.stampList[i]
					if(item.bindArr.length != item.number){
						this.$message.warning('绑定数量不正确！');
						flag=false;
						break;
					}else{
						flag=true;
					}
				}
				if(!flag) return false;
				orderItems=this.stampList.map(item =>{
					return {
						'collectionStampId':item.bindArr[0]?item.bindArr[0].collectionStampId:null,
						'mcNo':item.bindArr[0]?item.bindArr[0].mcNo:null,
						'orderItemId':item.orderItemId,
						'stampId':item.stampId
					}
				})
			}else{
				for(var i=0; i<this.stampList.length; i++){
					let item=this.stampList[i]
					if(item.bindArr.length != item.number){
						this.$message.warning('绑定数量不正确！');
						flag=false;
						break;
					}else{
						flag=true;
					}
				}
				if(!flag) return false;
				orderItems=this.stampList[0].bindArr.map(item =>{
					return {
						'collectionStampId':item.collectionStampId,
						'mcNo':item.mcNo,
						'orderItemId':this.stampList[0].orderItemId,
						'stampId':this.stampList[0].stampId
					}
				})
			}
			let params={
				orderId:this.orderId,
				orderItems:orderItems
			}
			POST_OREDR_BIND(params).then(res =>{
				this.$message.success('绑定成功！');
				this.getData();
			})
			this.handleClose();
		},
		// 解绑操作
		Unbound(orderId){
			console.log({orderId})
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
			text-indent: 15px;
			padding: 15px 0;
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
	.infoBind {
		>>>.el-dialog__body {
			padding: 0px 20px;
			max-height: 450px;
			overflow: auto;
		}
		h3{
			font-size: 14px;
			color: #333333;
		}
		>>>.cell{
			font-size: 14px;
			color: #333333;
			font-weight: normal;
		}
		.borderRight{
			border-right: 1px solid #E9E9E9;
			padding-right: 20px;
			margin-right: 20px;
			height: 360px;
		}
		.stampImgList{
			height: 340px;
			overflow: auto;
			>>>.el-checkbox-group{
				overflow: hidden;
				.imgItem{
					display: flex;
					float: left;
					justify-content:center;
					align-items:center;
					margin-top: 14px;
					
					>>>.el-checkbox{
						
					}
				}
				.imgItem:nth-child(odd){
					margin-right: 10px;
				}
			}
		}
	}
</style>
