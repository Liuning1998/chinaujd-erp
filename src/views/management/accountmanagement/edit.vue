<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="账号名称：" prop="name">
				<el-input v-model="form.name" placeholder="请输入" maxlength="20" disabled></el-input>
			</el-form-item>
			<el-form-item label="手机号：" prop="phone">
				<el-input v-model="form.phone" placeholder="请输入" maxlength="20" disabled></el-input>
			</el-form-item>
			<el-form-item label="密码：" prop="password">
				<el-input v-model="form.password" placeholder="请输入" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="权限：" prop="jurisdiction">
				<el-radio-group v-model="form.jurisdiction">
					<el-radio label="1">超级管理员</el-radio>
					<el-radio label="2">财务</el-radio>
					<el-radio label="3">运营</el-radio>
					<el-radio label="4">客服</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div class="btns">
			<el-button @click="handleReturn">返 回</el-button>
			<el-button class="save" @click="handleSave">保 存</el-button>
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
				name: '',
				phone: '',
				password: '',
				jurisdiction: ''
			},
			rules: {
				name: [{required: true, message: '请输入账号名称', trigger: ['blur', 'change']}],
				phone: [{required: true, message: '请输入手机号', trigger: ['blur', 'change']}],
				password: [{required: true, message: '请输入密码', trigger: ['blur', 'change']}],
				jurisdiction: [{required: true, message: '请选择权限', trigger: ['blur', 'change']}],
			}
		}
	},
    created() {},
	methods: {
		/**
		 * 获取用户信息
		 */
		getData() {
			this.getData();
		},
		/**
		 * 返回上一级
		 * @function handleReturn
		 */
		handleReturn() {
			this.$router.push('/management/accountmanagement/index');
		},
		/**
		 * 保存
		 * @function handleSave
		 */
		handleSave() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					this.$message.success('新增成功');
					this.$router.push('/management/accountmanagement/index');
				} else {
					return;
				}
			});
		},
	}
}
</script>

<style lang="scss" scoped>
	.container {
		>>>.el-form {
			width: 100%;
			padding: 24px;
			background: #FFF;
			&-item {
				margin-bottom: 0;
			}
			&-item:not(:last-child) {
				margin-bottom: 24px;
			}
			.el-input {
				width: 272px;
				.el-input__inner {
					height: 32px;
					border-radius: 2px;
				}
			}
		}
		.btns {
			padding: 16px 24px 16px 124px;
			background: #FFF;
			>>>.el-button {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				width: 65px;
				height: 32px;
				background: #FFF;
				color: #666;
				border-radius: 2px;
				border: 1px solid #D9D9D9;
				padding: 0;
			}
			.save {
				background: #1890FF;
				color: #FFF;
				border: 0;
			}
		}
	}
</style>