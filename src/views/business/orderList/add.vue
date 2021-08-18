<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="floor">
					<h3>选择鉴评方式</h3>
					<el-row type="flex">
						<el-radio-group v-model="form.evalmethod" class="selectRadio" @change="handleChangeRadio">
							<el-col :span="8">
								<el-radio :label="3" :value="0">
									<span class="selectName">远程鉴评</span>
									<p class="title">远程鉴评无需留下实物邮票</p>
								</el-radio>
							</el-col>
							<el-col :span="8">
								<el-radio :label="6" :value="1">
									<span class="selectName">批量鉴评</span>
									<p class="title">批量鉴评需留下实物邮票</p>
								</el-radio>
							</el-col>
							<el-col :span="8">
								<el-radio :label="9" :value="2">
									<span class="selectName">核验</span>
									<p class="title">核验邮票信息</p>
								</el-radio>
							</el-col>
						</el-radio-group>
					</el-row>
				</div>
				<div class="floor">
					<h3>用户基本信息</h3>
					<el-form-item label="手机号">
						<el-input v-model="form.orderAddUserInfoDto.userPhone" type="text" class="w350"></el-input>
					</el-form-item>
					<el-form-item label="验证码">
						<el-input v-model="form.orderAddUserInfoDto.phoneCode" type="text" class="w200"></el-input>
						<el-button @click="getCode" v-if="show" style="width: 138px;" size="small" class="getcode">获取验证码</el-button>
						<el-button v-if="!show" style="width: 138px;" size="small">{{codeTime}}S</el-button>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>服务商基本信息</h3>
					<el-form-item label="收货地址:" prop="areaId">
						<el-cascader v-model="form.orderAddInfoServicesDto.areaId" :options="options"
							:props="{value:'id',label:'name',children:'childrens'}" @change="addressChange"
							class="w350"></el-cascader>
					</el-form-item>
					<el-form-item label="" prop="address">
						<el-input v-model="form.orderAddInfoServicesDto.address" type="textarea" :rows="2" resize="none" placeholder="详细地址"
							class="w350"></el-input>
					</el-form-item>
					<el-form-item label="收货人">
						<el-input v-model="form.orderAddInfoServicesDto.consignee" type="text" class="w350"></el-input>
					</el-form-item>
					<el-form-item label="收货手机号">
						<el-input v-model="form.orderAddInfoServicesDto.phone" type="text" class="w350"></el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>
						<span>邮票列表</span>
						<div style="float: right">
							<el-button class="addBtn" type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
						</div>
					</h3>
					<div class="tableList">
						<el-table :data="form.orders" :header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="fullName" label="邮票名称"></el-table-column>
							<el-table-column prop="unit" label="单位"></el-table-column>
							<el-table-column prop="expectedQuantity" label="采集数量"></el-table-column>
							<el-table-column prop="serviceType" label="服务类型"></el-table-column>
							<el-table-column prop="evalmethod" label="鉴评方式"></el-table-column>
							<el-table-column prop="date" label="服务费用"></el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-link type="primary" :underline="false" @click="modify(scope.row)">修改</el-link>
									<el-divider direction="vertical"></el-divider>
									<el-link type="primary" :underline="false" @click="delete(scope.row)">删除</el-link>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-form>
			<div class="buttom_btn">
				<el-button size="small" @click="handleCancel">取消</el-button>
				<el-button type="primary" size="small" @click="handleSubmit">提交订单</el-button>
			</div>
		</div>
		<!-- 新增弹窗 -->
		<el-dialog title="新增邮票" width="560px" class="addDialog" :visible.sync="addAlert" @close="clearAlert">
			<el-form ref="formAlert" :model="formAlert" label-width="100px">
				<el-form-item label="关联邮票：">
					<el-autocomplete class="w328" v-model="formAlert.signalNo" :fetch-suggestions="querySearch"
					  placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect" @change.native="handleChange">
					  <template slot-scope="{item}">
					    <div>{{ item.value=item.name }}</div>
					  </template>
					</el-autocomplete>
					<p style="font-size: 12px;color: #999999;height: 20px;">请搜索关键字（志编号、名称、图序）标记邮票信息</p>
					<el-image v-if="stampImg" :src="stampImg" fit="contain" style="width: 120px;height: 120px;"></el-image>
				</el-form-item>
				<el-form-item label="单位：">
					<el-select v-model="formAlert.b" placeholder="请选择单位" class="w328">
						<el-option v-for="(item,index) in CompanyList" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="特有属性：" v-if="formAlert.b == 1">
					<el-select v-model="formAlert.b" placeholder="请选择特有属性" class="w328">
						<el-option v-for="(item,index) in attributeList" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采集数量：" v-if="formAlert.b != 2">
					<el-input v-model="formAlert.a" class="w328"></el-input>
				</el-form-item>
				<el-form-item label=" " v-if="formAlert.b == 2">
					<el-checkbox-group v-model="formAlert.c">
						<el-checkbox v-for="(item,index) in childStamp" :label="item.value" :key="index">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="服务类型：">
					<el-select v-model="formAlert.a" placeholder="请选择服务类型" class="w328">
						<el-option v-for="(item,index) in serviceTypeList" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="封装套餐：">
					<el-select v-model="formAlert.a" placeholder="请选择封装套餐" class="w328">
						<el-option v-for="(item,index) in enclosureList" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="cancel" size="small">取消</el-button>
				<el-button @click="addConfirm" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {
	POST_BUSINESS_GET_SMSCODE,
	POST_BUSINESS_ORDERMAIN_ADD,
	findFullName
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
				orderAddUserInfoDto: {
					userPhone: null,
					phoneCode: null
				},
				orderAddInfoServicesDto: {
					address: null,
					areaId: null,
					areaName: null,
					consignee: null,
					phone: null,
				},
				orders: [],
				evalmethod: null,
			},
			evalmethod: null,
			formAlert: {
				a:'',
				b:0,
				c:''
			},
			serviceTypeClicked: false,
			show: true,
			codeTime: 60,
			timer: false,
			options: [],
			addAlert: false,
			serviceTypeList:[
				{name: '采集+鉴别',value: 0},
				{name: '采集+评级',value: 1},
				{name: '采集+鉴别+封装',value: 2},
				{name: '采集+评级+封装',value: 3}
			],
			CompanyList: [
				{name: '枚',value: 0},
				{name: '版',value: 1},
				{name: '套',value: 2}
			],
			enclosureList: [
				{name: '套餐A',value: 0},
				{name: '套餐B',value: 1},
				{name: '套餐C',value: 2}
			],
			attributeList: [
				{name: '小型张',value: 0},
				{name: '小全张',value: 1}
			],
			// 子票列表
			childStamp:[
				{name: 'J.119 戈壁绿洲',value: 0},
				{name: 'J.119 油田、天池',value: 1},
				{name: 'J.119 天山牧场',value: 2},
				{name: 'J.119 天山',value: 3}
			],
			stampImg:''
		}
	},
	// 模板渲染前钩子函数
	created() {

	},
	// 模板渲染后钩子函数
	mounted() {

	},
	methods: {
		getCode() {
			let {userPhone = ''} = this.form.orderAddUserInfoDto;
			if (!userPhone) {
				this.$message.warning('请输入手机号');
				return;
			}
			let params = {
				mobile: userPhone
			}
			POST_BUSINESS_GET_SMSCODE(params).then(res => {
				this.form.orderAddUserInfoDto.phoneCode = res.data.phoneCode;
			});
		},
		addressChange() {

		},
		add() {
			this.addAlert = true;
		},
		modify(val){
			this.addAlert = true;
		},
		delete(val){
			this.$confirm('您确认要删除该记录吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {

			});
		},
		clearAlert(){
			this.addAlert = false;
		},
		addConfirm(){
			this.addAlert = false;
		},
		cancel(){
			this.addAlert = false;
		},
		querySearch(queryString, cb) {
			let list = [{}];
			let params = {
				signalNo: queryString
			}
			//调用的后台接口
			findFullName(params).then(res => {
			  list = res.findFullNameList;
			  cb(list);
			});
		},
		handleSelect(item) {
			// this.stampImg = item.imgUrl;
			// this.stampId = item.stampId;
		},
		handleChange() {
			// if (!this.formAlert.signalNo) {
			//   this.stampImg = '';
			//   this.stampId = '';
			// }
		},
		handleChangeRadio(val) {
			if (this.serviceTypeClicked) {
				this.$confirm('更换鉴评方式，将清空现有数据，是否更换？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					let form = {
						orderAddUserInfoDto: {
							userPhone: null,
							phoneCode: null
						},
						orderAddInfoServicesDto: {
							address: null,
							areaId: null,
							areaName: null,
							consignee: null,
							phone: null,
						},
						orders: [],
						evalmethod: val
					};
					this.evalmethod = val;
					Object.assign(this.form, form);
				}).catch(() => {
					this.form.evalmethod = this.evalmethod;
				});
			} else {
				this.evalmethod = val;
				this.serviceTypeClicked = true;
				return;
			}
		},
		handleCancel() {
			this.$router.push('/business/orderList/index');
		},
		// 提交订单
		handleSubmit() {
			let {orderAddUserInfoDto = {}, orderAddInfoServicesDto = {}, orders = [], evalmethod = null} = this.form;
			let {userPhone = null, phoneCode = null} = orderAddUserInfoDto;
			let {address = null, areaId = null, areaName = null, consignee = null, phone = null} = orderAddInfoServicesDto;

			if (!evalmethod) {
				this.$message.warning('请选择鉴评方式');
				return;
			}
			if (!userPhone || !phoneCode) {
				this.$message.warning('请完善用户基本信息');
				return;
			}
			if (!address || !areaId || !areaName || !consignee || !phone) {
				this.$message.warning('请完善服务商基本信息');
				return;
			}
			if (!orders.length) {
				this.$message.warning('请添加自订单列表');
				return;
			}
			let params = {
				evalmethod,
				orderAddInfoServicesDto,
				orderAddUserInfoDto,
				orders
			}
			POST_BUSINESS_ORDERMAIN_ADD(params).then(() => {
				this.$message.success('新增成功');
				this.$router.push('/business/orderList/index');
			});

		},
	},
}
</script>
<style lang="scss" scoped>
	.selectRadio {
		width: 90%;
		margin: 20px auto;
	}

	.w350 {
		width: 350px;
	}

	.w200 {
		width: 200px;
	}

	.getcode {
		background: #1890FF;
		color: #FFFFFF;
		margin-left: 8px;
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
			box-sizing: border-box;

			span {
				display: inline-block;
				line-height: 32px;
			}

			.addBtn {
				float: right;
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
	.addDialog{
		>>>.el-dialog__body{
			padding: 10px 20px;
		}
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
</style>
