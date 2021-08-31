<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="">
			<el-form ref="form" :rules="infoRules" :model="form" label-width="100px">
				<div class="floor">
					<h3>选择鉴评方式</h3>
					<el-row type="flex">
						<el-radio-group v-model="form.evalmethod" class="selectRadio" @change="handleChangeRadio">
							<el-col :span="8">
								<el-radio :label="0">
									<span class="selectName">远程鉴评</span>
									<p class="title">远程鉴评无需留下实物邮票</p>
								</el-radio>
							</el-col>
							<el-col :span="8">
								<el-radio :label="1">
									<span class="selectName">批量鉴评</span>
									<p class="title">批量鉴评需留下实物邮票</p>
								</el-radio>
							</el-col>
							<el-col :span="8">
								<el-radio :label="2">
									<span class="selectName">核验</span>
									<p class="title">核验邮票信息</p>
								</el-radio>
							</el-col>
						</el-radio-group>
					</el-row>
				</div>
				<div class="floor">
					<h3>用户基本信息</h3>
					<el-form-item label="手机号" prop="orderAddUserInfoDto.userPhone">
						<el-input v-model="form.orderAddUserInfoDto.userPhone" type="text" class="w350" maxlength="11">
						</el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="orderAddUserInfoDto.phoneCode">
						<el-input v-model="form.orderAddUserInfoDto.phoneCode" maxlength="4" type="text" class="w200"></el-input>
						<el-button @click="getCode" v-if="show" style="width: 138px;" size="small" class="getcode">获取验证码
						</el-button>
						<el-button v-if="!show" style="width: 138px;" size="small">{{codeTime}}S</el-button>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>服务商基本信息</h3>
					<el-form-item label="收货地址:" prop="areaId">
						<el-cascader v-model="form.orderAddInfoServicesDto.areaId" ref="nameAddress" :options="options"
							:props="{value:'id',label:'name',children:'childrens'}" @change="addressChange"
							class="w350"></el-cascader>
					</el-form-item>
					<el-form-item label="" prop="address">
						<el-input v-model="form.orderAddInfoServicesDto.address" type="textarea" :rows="2" resize="none"
							placeholder="详细地址" class="w350" maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="收货人">
						<el-input v-model="form.orderAddInfoServicesDto.consignee" type="text" class="w350"
							maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="收货手机号">
						<el-input v-model="form.orderAddInfoServicesDto.phone" type="text" class="w350" maxlength="11">
						</el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>
						<span>邮票列表</span>
						<div style="float: right">
							<el-button class="addBtn" type="primary" size="small" icon="el-icon-plus" @click="add">新增
							</el-button>
						</div>
					</h3>
					<div class="tableList">
						<el-table :data="tableData"
							:header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column label="邮票名称">
								<template slot-scope="scope">
									<p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.fullName}}</p>
								</template>
							</el-table-column>
							<el-table-column label="单位">
								<template slot-scope="scope">
									{{ CompanyList.find(item => item.value === scope.row.unit).name || '' }}
								</template>
							</el-table-column>
							<el-table-column prop="quantity" label="采集数量"></el-table-column>
							<el-table-column prop="serviceType" label="服务类型">
								<template slot-scope="scope">
									{{ serviceTypeList.find(item => item.value === scope.row.serviceType).name || '' }}
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-link type="primary" :underline="false" @click="DeleteStamp(scope.row)">删除</el-link>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-form>
			<div class="buttom_btn">
				<el-button size="small" @click="handleCancel">取消</el-button>
				<el-button type="primary" size="small" @click="handleSubmit('form')">提交订单</el-button>
			</div>
		</div>
		<!-- 新增远程、批量弹窗 -->
		<el-dialog title="新增邮票" width="560px" class="addDialog" :visible.sync="addAlert" @close="clearAlert">
			<el-form ref="formAlert" :rules="formAlertRules" :model="formAlert" label-width="100px">
				<el-form-item label="单位：" prop="unit">
					<el-select v-model="formAlert.unit" placeholder="请选择单位" class="w328" @change="clearStamp">
						<el-option v-for="(item,index) in CompanyList" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关联邮票：" prop="signalNo" v-if="formAlert.unit">
					<el-autocomplete class="w328" v-model="formAlert.signalNo" :fetch-suggestions="querySearch"
						placeholder="请输入内容" :trigger-on-focus="flag" @select="handleSelect"
						@change.native="handleChange">
						<template slot-scope="{item}">
							<div>{{ item.value=item.name }}</div>
						</template>
					</el-autocomplete>
					<p style="font-size: 12px;color: #999999;height: 20px;">请搜索关键字（志编号、名称、图序）标记邮票信息</p>
					<el-image v-if="stampImg" :src="stampImg" fit="contain" class="alertImg"
						style="width: 80px;height: 80px;"></el-image>
				</el-form-item>
				<el-form-item label="参考价：" v-if="alertStampId">
					<span v-if="tempStamp.unit">{{tempStamp.price}}/{{JSON.parse(tempStamp.unit).desc}}</span>
				</el-form-item>
				<el-form-item label="特有属性：" v-if="formAlert.unit == 2">
					<el-select v-model="formAlert.specifName" placeholder="请选择特有属性" class="w328">
						<el-option v-for="(item,index) in attributeList" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采集数量：" v-if="alertStampId && formAlert.unit != 1" prop="quantity">
					<el-input v-model="formAlert.quantity" class="w328"></el-input>
				</el-form-item>
				<el-form-item label=" " v-if="alertStampId && formAlert.unit == 1">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
					<el-checkbox-group v-model="formAlert.orderItems" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="(item,index) in childStamp" :label="item.value" :key="index">{{item.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="服务类型：" prop="serviceType">
					<el-select v-model="formAlert.serviceType" placeholder="请选择服务类型" class="w328">
						<el-option v-for="(item,index) in serviceTypeList" :key="index" :label="item.name"
							:value="item.value" v-if="index !=serviceTypeList.length-1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="封装套餐："
					v-if="alertStampId && (formAlert.serviceType==2 || formAlert.serviceType==3)" prop="packTypeId">
					<el-select v-model="formAlert.packTypeId" placeholder="请选择封装套餐" class="w328">
						<el-option v-for="(item,index) in enclosureList" :key="index" :label="item.packTypeName"
							:value="item.packTypeId"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="cancel" size="small">取消</el-button>
				<el-button @click="addConfirm('formAlert')" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 新增核验弹窗 -->
		<el-dialog title="扫码关联" width="480px" class="addDialog" :visible.sync="addAlertHY" @close="clearAlertHY">
			<el-form :model="formAlertHY" label-width="110px">
				<el-form-item label="请输入核验码：">
					<el-input v-model="formAlertHY.collectionStampId" class="w240" type="text" placeholder="扫码枪扫码录入或手动输入"></el-input>
					<el-button style="width: 65px;margin-left: 20px;" size="small" type="primary" plain @click="Check">查询</el-button>
				</el-form-item>
				<el-form-item label="邮票ID：" v-if="tempStampHY.stampId">
					<span></span>
				</el-form-item>
				<el-form-item label="邮票名称：" v-if="tempStampHY.name">
					<span></span>
				</el-form-item>
				<el-form-item label=" " v-if="tempStampHY.url">
					<el-image v-if="stampImg" :src="stampImg" fit="contain" style="width: 80px;height: 80px;"></el-image>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="cancelHY" size="small">取消</el-button>
				<el-button @click="addConfirmHY" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {
		POST_BUSINESS_GET_SMSCODE,
		POST_BUSINESS_ORDERMAIN_ADD,
		POST_FIND_ID_STAMP,
		GET_ORDERITEM_QUERY,
		POST_AREA_LIST,
		POST_GETPACKTYPE,
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
				flag: false,
				checkAll: false,
				isIndeterminate: true,
				tempStamp:{},
				tempStampHY:{},
				tableData:[],
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
					signalNo: '',
					unit: '',
					serviceType: '',
					quantity: '1',
					specifName: null,
					packTypeId: '',
					orderItems: []
				},
				formAlertHY:{
					collectionStampId:''
				},
				serviceTypeClicked: false,
				show: true,
				codeTime: 60,
				timer: false,
				options: [],
				addAlert: false,
				addAlertHY:false,
				serviceTypeList: [
					{ name: '采集+鉴别', value: 0 },
					{ name: '采集+评级', value: 1 },
					{ name: '采集+鉴别+封装', value: 2 },
					{ name: '采集+评级+封装', value: 3 },
					{ name: '核验', value: 4 }
				],
				CompanyList: [
					{ name: '枚', value: '0' },
					{ name: '版', value: '2' },
					{ name: '套', value: '1' }
				],
				enclosureList: [],
				attributeList: [
					{ name: '小型张', value: 'XXZ' },
					{ name: '小全张', value: 'XQZ' }
				],
				// 子票列表
				childStamp: [],
				stampImg: '',
				alertStampId: '',
				infoRules: {
					orderAddUserInfoDto: {
						userPhone: [
							{ required: true, message: '请填写手机号', trigger: 'blur' },
							{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号填写有误，请重新填写', trigger: 'blur' }
						],
						phoneCode: [
							{ required: true, message: '请填写验证码', trigger: 'blur' }
						]
					}
				},
				formAlertRules: {
					signalNo: [
						{ required: true, message: '请关联邮票', trigger: 'blur' },
					],
					unit: [
						{ required: true, message: '请选择单位', trigger: 'change' }
					],
					quantity: [
						{ required: true, message: '请填写采集数量', trigger: 'blur' },
						{ pattern: /^[1-9]\d*$/, message: '采集数量格式有误', trigger: 'blur' }
					],
					serviceType: [
						{ required: true, message: '请选择服务类型', trigger: 'change' }
					],
					packTypeId: [
						{ required: true, message: '请选择封装套装', trigger: 'change' }
					]
				}
			}
		},
		// 模板渲染前钩子函数
		created() {
			this.getAddressList();
			this.getEnclosureList();
		},
		// 模板渲染后钩子函数
		mounted() {

		},
		methods: {
			// 获取封装套餐
			getEnclosureList(){
				POST_GETPACKTYPE().then(res =>{
					this.enclosureList=res;
				})
			},
			// 获取地址列表
			getAddressList(){
				POST_AREA_LIST().then(res =>{
					this.options=res.provinces;
				})
			},
			// 获取短信验证码
			getCode() {
				let { userPhone = '' } = this.form.orderAddUserInfoDto;
				if (!userPhone) {
					this.$message.warning('请输入手机号');
					return;
				} else {
					let mobileRge = /^1(3|4|5|6|7|8|9)\d{9}$/;
					if (!mobileRge.test(userPhone)) {
						this.$message.warning('手机号格式不正确');
						return;
					}
				}
				let params = { mobile: userPhone }
				POST_BUSINESS_GET_SMSCODE(params).then(res => {
					if (!this.timer) {
					  this.show = false;
					  this.timer = setInterval(() => {
					    if (this.codeTime > 0 && this.codeTime <= 60) {
					      this.codeTime--;
					    } else {
					      this.show = true;
					      clearInterval(this.timer);
					      this.timer = null;
					      this.codeTime = 60;
					    }
					  }, 1000)
					}
				});
			},
			addressChange(val) {
				let lab=this.$refs['nameAddress'].getCheckedNodes()[0].pathLabels;
				this.form.orderAddInfoServicesDto.areaName=lab;
			},
			add() {
					if(this.form.evalmethod == 2){
						this.addAlertHY = true;
					}else if(this.form.evalmethod == 0 || this.form.evalmethod == 1){
						this.addAlert = true;
					}else{
						this.$message.warning('请先选择鉴评方式！');
						return false;
					}
			},
			DeleteStamp(val) {
				let that = this;
				this.$confirm('您确认要删除该记录吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(() => {
					let index=that.tableData.indexOf(val);
					index != -1 && that.tableData.splice(index, 1);
				}).catch(() => {
					
				});
			},
			// 核验查询
			Check(){
				if(!this.formAlertHY.collectionStampId){
					this.$message.warning('请输入核验码！');
					return false;
				}
				let params={
					collectionStampId:this.formAlertHY.collectionStampId
				}
				GET_ORDERITEM_QUERY(params).then(res =>{
					this.tempStampHY=res;
				});
			},
			// 核验弹窗关闭回调
			clearAlertHY(){
				this.tempStampHY={};
				let formAlertHY = {
					collectionStampId: ''
				};
				Object.assign(this.formAlertHY, formAlertHY);
			},
			// 核验确定
			addConfirmHY(){
				if(this.tempStampHY) {
					let tempData=this.tempStampHY;
					tempData.quantity=1;
					tempData.serviceType=4;
					tempData.unit='0';
					this.tableData.push(tempData);
					this.clearAlertHY();
				}else{
					this.$message.warning('请先查询核验吗！');
					return false;
				}
			},
			// 核验取消
			cancelHY() {
				this.addAlertHY=false;
				this.clearAlertHY();
			},
			clearStamp() {
				this.formAlert.signalNo='';
				this.stampImg = '';
				this.alertStampId = '';
			},
			handleCheckAllChange(val) {
				let allStamp=this.childStamp.map(item=>{
					return item.value;
				});
				this.formAlert.orderItems = val ? allStamp : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.childStamp.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.childStamp.length;
			},
			clearAlert() {
				let formAlert = {
					signalNo: '',
					unit: '',
					serviceType: '',
					quantity: '1',
					specifName: null,
					packTypeId: '',
					orderItems: []
				};
				Object.assign(this.formAlert, formAlert);
				this.stampImg = '';
				this.alertStampId = '';
				this.addAlert = false;
				this.$refs['formAlert'].resetFields();
			},
			addConfirm(formName) {
				if(!this.alertStampId) {
					this.$message.warning('请选择关联邮票！');
					return false;
				}
				if(this.formAlert.unit == 1){
					if(this.formAlert.orderItems.length < 4){
						this.$message.warning('最少勾选4枚');
						return false;
					}
				}
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let Items=[]
						if(this.formAlert.unit == 1){
							Items=this.formAlert.orderItems
						}else{
							Items=[this.tempStamp]
						}
						let tempData={
							expectedQuantity:this.tempStamp.expectedQuantity,
							fullName:this.tempStamp.fullName,
							name:this.tempStamp.fullName,
							orderItems:Items,
							packTypeId:this.formAlert.packTypeId,
							pictureSeq:this.tempStamp.pictureSeq,
							price:this.tempStamp.price,
							quantity:this.formAlert.quantity,
							serviceType:this.formAlert.serviceType,
							signalNo:this.tempStamp.signalNo,
							specifName:this.formAlert.specifName,
							stampId:this.tempStamp.stampId,
							unit:this.formAlert.unit,
							url:this.tempStamp.url
						}
						this.tableData.push(tempData);
						this.clearAlert();
					}
				})
			},
			cancel() {
				this.clearAlert();
			},
			querySearch(queryString, cb) {
				let list = [{}];
				let params = {
					signalNo: queryString,
					unit: this.formAlert.unit,
					categoryDetail: this.formAlert.specifName
				}
				//调用的后台接口
				findFullName(params).then(res => {
					list = res.findFullNameAndTypeVos;
					cb(list);
				});
			},
			handleSelect(item) {
				this.tempStamp = item;
				this.stampImg = item.imgUrl;
				this.alertStampId = item.stampId;
				if(this.formAlert.unit == 1){
					let params={
						stampId:this.alertStampId
					}
					POST_FIND_ID_STAMP(params).then(res =>{
						let allData=[];
						res.findFullNameAndTypeVos.forEach(item =>{
							let data={};
							data.name=item.name;
							data.value=item;
							allData.push(data)
						})
						this.childStamp=allData;
					})
				}
			},
			handleChange() {
				if (!this.formAlert.signalNo) {
					this.stampImg = '';
					this.alertStampId = '';
				}
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
						this.tableData=[];
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
			handleSubmit(formName) {
				let { orderAddUserInfoDto = {}, orderAddInfoServicesDto = {}, orders = [], evalmethod = null } = this.form;
				let { userPhone = null, phoneCode = null } = orderAddUserInfoDto;
				let { address = null, areaId = null, areaName = null, consignee = null, phone = null } =
				orderAddInfoServicesDto;
				
				if (evalmethod !=0 && evalmethod !=1 && evalmethod !=2) {
					this.$message.warning('请选择鉴评方式');
					return;
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (!this.tableData.length) {
							this.$message.warning('请添加订单列表');
							return;
						}
						let tempFWS={
							address:address,
							areaId:areaId[2],
							areaName:areaName.join(),
							consignee:consignee,
							phone:phone
						}
						let params = {
							evalMethod:this.form.evalmethod,
							orderAddInfoServicesDto:tempFWS,
							orderAddUserInfoDto,
							orders:this.tableData
						}
						POST_BUSINESS_ORDERMAIN_ADD(params).then(() => {
							this.$message.success('新增成功');
							this.$router.push('/business/orderList/index');
						});
					}
				})
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
	.w240{
		width: 240px;
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

		>>>.el-form-item__label {
			color: #151515;
		}

		>>>.el-input__inner {
			height: 32px;
			line-height: 32px;
		}

		.tableList {
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

	.buttom_btn {
		background-color: #FFFFFF;
		padding: 10px 20px;
		text-align: right;
	}

	.addDialog {
		>>>.el-dialog__body {
			padding: 10px 20px;
			max-height: 450px;
			overflow: auto;
		}

		>>>.el-form-item {
			margin-bottom: 20px;
		}

		>>>.el-form-item__label {
			color: rgba(0, 0, 0, 0.85);
		}

		>>>.el-input__inner {
			height: 32px;
			line-height: 32px;
		}
	}

	.w328 {
		width: 328px;
	}

	.alertImg {
		width: 80px;
		height: 80px;
		position: absolute;
		top: 0;
		right: 0px;
	}
	.childStamp_box{
		max-height: 180px;
		overflow: auto;
	}
</style>
