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
				roleName: "",
				roleDescription: "",
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
		 */
		getData() {
			// let params = {
			// 	regSys: "APPRAISAL_BOSS"
			// };
			// POST_USERCENTER_QUERY_ALL_AUTHORITIES(params).then(res => {
			// 	this.dataQList = res.data;
			// });
			let data = [
			{
			authorityId: 1,
			authorityName: "一级 1",
			children: [
				{
				authorityId: 4,
				authorityName: "二级 4",
				children: [
					{
					authorityId: 9,
					authorityName: "三级 9",
					},
					{
					authorityId: 10,
					authorityName: "三级 10",
					},
				],
				},
			],
			},
			{
			authorityId: 2,
			authorityName: "一级 2",
			children: [
				{
				authorityId: 5,
				authorityName: "二级 5",
				},
				{
				authorityId: 6,
				authorityName: "二级 6",
				},
			],
			},
			{
			authorityId: 3,
			authorityName: "一级 3",
			children: [
				{
				authorityId: 7,
				authorityName: "二级 7",
				},
				{
				authorityId: 8,
				authorityName: "二级 8",
				},
			],
			},
			];
			this.dataQList = data;
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
		 * @Function handleReturn
		 */
		handleReturn() {
			this.$router.push("/management/rolemanagement/index");
		},
		/**
		 * 保存
		 * @Function handleSave
		 */
		handleSave() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					let params = {
						regSys: 'APPRAISAL_BOSS',
						roleList: this.form.authList,
						roleName: this.form.roleName,
						description: this.form.roleDescription
					};
					// POST_USERCENTER_ADD_ROLE(params).then(res => {
					// 	this.$message.success('新增成功');
					// 	this.$router.push("/management/rolemanagement/index");
					// });
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
