<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<el-form ref="form" :rules="rules" :model="form" label-width="80px">
			<el-form-item label="角色名称：" prop="roleName">
			<el-input
				v-model="form.roleName"
				maxlength="20"
				placeholder="请输入">
			</el-input>
			</el-form-item>
			<el-form-item label="描述：" prop="roleDescription">
				<el-input
					v-model="form.roleDescription"
					maxlength="50"
					placeholder="请输入">
				</el-input>
			</el-form-item>
			<el-form-item label="权限：" prop="authList">
				<el-tree
					ref="tree"
					:data="dataQList"
					show-checkbox
					node-key="authorityId"
					:default-checked-keys="form.authList"
					:props="defaultProps"
					@check-change="handleClickNode">
				</el-tree>
			</el-form-item>
			<el-form-item label="">
				<el-button class="cancel" @click="handleReturn">返回</el-button>
				<el-button class="save" @click="handleSave">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import {
	POST_USERCENTER_QUERY_ALL_AUTHORITIES,
	POST_USERCENTER_ADD_ROLE
} from '@/api/request';

import Breadcrumb from "@/components/Breadcrumb";
export default {
	name: "",
	components: {
		Breadcrumb,
	},
	data() {
		return {
			form: {
				roleName: null,
				roleDescription: null,
				authList: [],
			},
			defaultProps: {
				children: 'children',
				label: 'authorityName'
			},
			rules: {
				roleName: [{required: true, message: "请填写角色名称", trigger: ["change", "blur"]}],
				authList: [{required: true, message: '请选择权限'}],
			},
			dataQList: [],
		};
	},
	created() {
		this.getData();
	},
  	methods: {
		/**
		 * 获取权限列表
		 * @function getData
		 */
		getData() {
			let params = {
				regSys: '6',
				username: sessionStorage.getItem('name'),
			};
			POST_USERCENTER_QUERY_ALL_AUTHORITIES(params).then(res => {
				this.dataQList = res;
			});
		},
		/**
		 * 获取选中节点的id
		 * @function handleClickNode
		 */
		handleClickNode() {
			let arr = this.$refs.tree.getCheckedKeys();
			this.form.authList = arr;
		},
		/**
		 * 返回
		 * @function handleReturn
		 */
		handleReturn() {
			this.$router.push("/management/rolemanagement/index");
		},
		/**
		 * 保存
		 * @function handleSave
		 */
		handleSave() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					let params = {
						regSys: '6',
						roleList: this.form.authList,
						roleName: this.form.roleName,
						description: this.form.roleDescription,
					};
					POST_USERCENTER_ADD_ROLE(params).then(() => {
						this.$message.success('新增成功');
						this.handleReturn();
					});
				} else {
					return;
				}
			});
		},
  	},
};
</script>
<style lang="scss" scoped>
	.container {
  		>>>.el-form {
				width: 100%;
				padding: 24px;
				background: #fff;
				box-sizing: border-box;
			&-item:not(:last-child) {
				margin-bottom: 24px;
			}
			&-item:last-child {
				margin-bottom: 0;
			}
			&-item {
				&__label {
					padding: 0;
			}
			.el-input {
				width: 272px;
				&__inner {
					height: 32px;
					line-height: 32px;
					border-radius: 2px;
				}
			}
			.el-tree {
				width: 272px;
				border: 1px solid #d9d9d9;
				border-radius: 2px;
				color: #333;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				.el-tree-node__label,
				.el-tree-node__content {
					height: 32px;
					line-height: 32px;
				}
			}
			.el-button {
				width: 65px;
				height: 32px;
				border-radius: 2px;
				background: #fff;
				color: #666;
				border: 1px solid #d9d9d9;
				padding: 0;
			}
			.save {
				background: #1890ff;
				color: #fff;
				border: 0;
			}
    	}
  	}
}
</style>
