<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="密码：" prop="password">
				<el-input type="password"  maxlength="20" v-model="form.password" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="新密码：" prop="passwordNew">
				<el-input type="password"  maxlength="20" v-model="form.passwordNew" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="surepassword">
				<el-input type="password"  maxlength="20" v-model="form.surepassword" placeholder="请输入"></el-input>
			</el-form-item>
		</el-form>
		<div class="btns">
			<!-- <el-button class="return">返回</el-button> -->
			<el-button class="save" @click="handleSave">保存</el-button>
		</div>
	</div>
</template>

<script>
import {
	POST_USERCENTER_ADMIN_UPDATE_PASSWORD,
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
				password: '',
				passwordNew: '',
				surepassword: ''
			},
			rules: {
				password: [{required: true, message: '请输入', trigger: ["change", "blur"]}],
				passwordNew: [{required: true, message: '请输入', trigger: ["change", "blur"]}],
				surepassword: [
					{required: true, message: '请输入', trigger: ["change", "blur"]},
					{validator: this.validatePass, trigger: ["change", "blur"]}
				],
			},
		}
	},
    created() {},
	methods: {
		/**
		 * 修改密码
		 * @function handleSave
		 */
		handleSave() {
			let {password = '', passwordNew = ''} = this.form;
			let params = {
				password,
				passwordNew
			}
			POST_USERCENTER_ADMIN_UPDATE_PASSWORD(params).then(() => {
				this.$message.success('修改密码成功');
			});
		},
		/**
		 * 验证新密码 和 确认密码
		 * @function validatePass
		 * @params {Object} rule 验证规则
		 * @params {String} value 确认密码
		 * @params {Function} callback 回调函数
		 */
		validatePass(rule, value, callback) {
			if (!value) {
				callback(new Error('请输入'));
			} else if (value !== this.form.passwordNew) {
				callback(new Error('新密码与确认密码不一致'));
			} else {
				callback();
			}
		},
	}
}
</script>

<style lang="scss" scoped>
	.container {
		height: calc(100vh - 92px);
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