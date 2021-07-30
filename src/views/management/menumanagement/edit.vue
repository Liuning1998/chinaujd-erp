<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="菜单名称：">
				<span>{{ form.menuName }}</span>
			</el-form-item>
			<el-form-item label="链接地址：" prop="menuUrl">
				<el-input v-model="form.menuUrl" placeholder="请输入"></el-input>
			</el-form-item>
		</el-form>
		<div class="btns">
			<el-button @click="handleReturn">返 回</el-button>
			<el-button class="submit" @click="handleSubmit">提 交</el-button>
		</div>
	</div>
</template>
<script>
import {
	GET_USERCENTER_MENU_VIEW,
	POST_USERCENTER_UPDATE_MENU,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
export default {
	name: '',
	components: {
		Breadcrumb,
	},
	data() {
		return {
			form: {
				menuName: '',
				menuUrl: ''
			},
			rules: {
				menuUrl: [{required: true, message: '请输入链接地址', trigger: ['blur', 'change']}]
			},
		}
	},
	// 模板渲染前钩子函数
	created() {
		this.getData();
	},
	methods: {
		/**
		 * 获取菜单数据
		 * @function getData
		 */
		getData() {
			// let params = {
			// 	menuId: this.$route.query.menuId
			// };
			// GET_USERCENTER_MENU_VIEW(params).then(res => {
			// 	this.form = res.data;
			// 	Object.assign(this.form, res.data);
			// });
			let obj = {
				menuName: '邮票业务中心',
				menuUrl: '/agent/index'
			};
			Object.assign(this.form, obj);
		},
		/**
		 * 返回上一级
		 * @function handleReturn
		 */
		handleReturn() {
			this.$router.push('/management/menumanagement/index');
		},
		/**
		 * 提交
		 * @function handleSubmit
		 */
		handleSubmit() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					// let params = {
					// 	menuId: this.$route.query.menuId,
					// 	menuUrl: this.form.menuUrl,
					// 	regSys: 'APPRAISAL_BOSS'
					// }
					// POST_USERCENTER_UPDATE_MENU(params).then(res => {
					// 	this.$message.success('编辑成功');
					// 	this.$router.push("/management/menumanagement/index");
					// });
				} else {
					return;
				}
			});
		},
	},
}
</script>
<style lang="scss" scoped>
	.container {
		>>>.el-form {
			width: 100%;
			padding: 24px;
			background: #fff;
			box-sizing: border-box;
			&-item {
				margin-bottom: 0;
			}
			&-item:not(:last-child) {
				margin-bottom: 24px;
			}
			.el-input {
				width: 272px;
				&__inner {
					height: 32px;
					line-height: 32px;
					border-radius: 2px;
				}
			}
		}
		.btns {
			padding: 16px 24px 16px 116px;
			background: #FFF;
			.el-button {
				width: 65px;
				height: 32px;
				border-radius: 2px;
				background: #fff;
				color: #666;
				border: 1px solid #d9d9d9;
				padding: 0;
			}
			.submit {
				background: #1890ff;
				color: #fff;
				border: 0;
			}
		}
	}
</style>

