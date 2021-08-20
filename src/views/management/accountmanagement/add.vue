<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="账号名称：" prop="name">
				<el-input v-model="form.name" placeholder="请输入" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="手机号：" prop="mobile">
				<el-input v-model="form.mobile" placeholder="请输入" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="密码：" prop="password">
				<el-input v-model="form.password" placeholder="请输入" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="权限：" prop="roleId">
				<el-radio-group v-model="form.roleId">
					<el-radio v-for="item in roles" :key="item.roleId" :label="item.roleId">{{ item.roleName }}</el-radio>
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
import {
	POST_USERCENTER_BASE_ADMIN_ADD,
	POST_USERCENTER_ROLE_ALL,
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
				name: null,
				mobile: null,
				password: null,
				roleId: null
			},
			rules: {
				name: [{required: true, message: '请输入账号名称', trigger: ['blur', 'change']}],
				mobile: [{required: true, message: '请输入手机号', trigger: ['blur', 'change']}],
				password: [{required: true, message: '请输入密码', trigger: ['blur', 'change']}],
				roleId: [{required: true, message: '请选择权限', trigger: ['blur', 'change']}],
			},
			roles: [],
		}
	},
    created() {
		this.getRoles();
	},
	methods: {
		/**
		 * 获取所有角色
		 * @function getRoles
		 */
		getRoles() {
			let params = {
				regSys: '6',
			};
			POST_USERCENTER_ROLE_ALL(params).then(res => {
				this.roles = res;
			});
		},
		/**
		 * 返回上一级
		 * @function handleReturn
		 */
		handleReturn() {
			let form = {
				name: null,
				mobile: null,
				password: null,
				roleId: null
			};
			Object.assign(this.form, form);
			this.$router.push('/management/accountmanagement/index');
		},
		/**
		 * 保存
		 * @function handleSave
		 */
		handleSave() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					let params = this.form;
					POST_USERCENTER_BASE_ADMIN_ADD(params).then(() => {
						this.$message.success('新增成功');
						this.handleReturn();
					});
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