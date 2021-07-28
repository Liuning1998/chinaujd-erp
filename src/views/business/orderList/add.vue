<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="floor">
					<h3>选择鉴评方式</h3>
					<el-row type="flex">
						<el-radio-group v-model="form.serviceType" class="selectRadio">
							<el-col :span="8">
								<el-radio :label="3">
									<span class="selectName">远程鉴评</span>
									<p class="title">远程鉴评无需留下实物邮票</p>
								</el-radio>
							</el-col>
							<el-col :span="8">
								<el-radio :label="6">
									<span class="selectName">批量鉴评</span>
									<p class="title">批量鉴评需留下实物邮票</p>
								</el-radio>
							</el-col>
							<el-col :span="8">
								<el-radio :label="9">
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
						<el-input v-model="form.phone" type="text" class="w350"></el-input>
					</el-form-item>
					<el-form-item label="验证码">
						<el-input v-model="form.phone" type="text" class="w200"></el-input>
						<el-button @click="getCode" v-if="show" style="width: 138px;" size="small" class="getcode">获取验证码</el-button>
						<el-button v-if="!show" style="width: 138px;" size="small">{{codeTime}}S</el-button>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>服务商基本信息</h3>
					<el-form-item label="收货地址:" prop="areaId">
						<el-cascader v-model="form.areaId" :options="options"
							:props="{value:'id',label:'name',children:'childrens'}" @change="addressChange"
							class="w350"></el-cascader>
					</el-form-item>
					<el-form-item label="" prop="address">
						<el-input v-model="form.address" type="textarea" :rows="2" resize="none" placeholder="详细地址"
							class="w350"></el-input>
					</el-form-item>
					<el-form-item label="收货人">
						<el-input v-model="form.phone" type="text" class="w350"></el-input>
					</el-form-item>
					<el-form-item label="收货手机号">
						<el-input v-model="form.phone" type="text" class="w350"></el-input>
					</el-form-item>
				</div>
				<div class="floor">
					<h3>
						<span>邮票列表</span>
						<el-button class="addBtn" type="primary" size="small">新增</el-button>
					</h3>
					<div class="tableList">
						<el-table :data="tableData" :header-cell-style="{'background':'#fafafa','font-size':'14px','color':'#333333'}">
							<el-table-column prop="date" label="序号"></el-table-column>
							<el-table-column prop="date" label="邮票名称"></el-table-column>
							<el-table-column prop="date" label="单位"></el-table-column>
							<el-table-column prop="date" label="采集数量"></el-table-column>
							<el-table-column prop="date" label="服务类型"></el-table-column>
							<el-table-column prop="date" label="操作">
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
				<el-button size="small">取消</el-button>
				<el-button type="primary" size="small">提交订单</el-button>
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
			getCode() {

			},
			addressChange() {

			},
			modify(val){
				
			},
			delete(val){
				
			}
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
</style>
