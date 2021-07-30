<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="table">
			<el-table :data="tableData" style="width: 800px;margin-bottom: 20px;" row-key="menuId" border default-expand-all :tree-props="{children: 'children',hasChildren: 'hasChildren'}">
				<el-table-column prop="menuName" label="名称" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import {
	POST_USERCENTER_QUERY_ALL_MENU,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';

export default {
    name: '',
	components: {
		Breadcrumb
	},
    data() {
		return {
			tableData:[],
		}
    },
    // 模板渲染前钩子函数
    created() {
    	this.getMenu();
    },
    methods: {
		/**
		 * 获取所有菜单
		 * @function getMenu
		 */
		getMenu(){
			// let params = {
			// 	regSys: "APPRAISAL_BOSS"
			// };
			// POST_USERCENTER_QUERY_ALL_MENU(params).then(res => {
			// 	this.tableData = res.data;
			// });
			this.tableData = [
				{
					"menuId": 1,
					"menuName": "鉴评师管理",
					"garden": 0,
					"parent": null,
					"url": "expertManager",
					"children": [
					{
						"menuId": 2,
						"menuName": "鉴评师管理",
						"garden": 1,
						"parent": 1,
						"url": "expert/list"
					},
					{
						"menuId": 27,
						"menuName": "试题库管理",
						"garden": 1,
						"parent": 1,
						"url": "expert/testbank/list"
					},
					{
						"menuId": 34,
						"menuName": "考试招募",
						"garden": 1,
						"parent": 1,
						"url": "expert/test/list"
					}
					]
				},
				{
					"menuId": 10,
					"menuName": "鉴单管理",
					"garden": 0,
					"parent": null,
					"url": "appraisalManager",
					"children": [
					{
						"menuId": 11,
						"menuName": "鉴单审核",
						"garden": 1,
						"parent": 10,
						"url": "appraisal/examine"
					},
					{
						"menuId": 14,
						"menuName": "鉴单鉴评",
						"garden": 1,
						"parent": 10,
						"url": "appraisal/check/list"
					},
					{
						"menuId": 16,
						"menuName": "邮票价格",
						"garden": 1,
						"parent": 10,
						"url": "appraisal/stamprice/list"
					},
					{
						"menuId": 21,
						"menuName": "对比图库",
						"garden": 1,
						"parent": 10,
						"url": "appraisal/comparison/list"
					},
					{
						"menuId": 23,
						"menuName": "鉴评费率",
						"garden": 1,
						"parent": 10,
						"url": "appraisal/rate/list"
					}
					]
				},
				{
					"menuId": 47,
					"menuName": "资金管理",
					"garden": 0,
					"parent": null,
					"url": "settlementManager",
					"children": [
					{
						"menuId": 48,
						"menuName": "资金管理",
						"garden": 1,
						"parent": 47,
						"url": "settlement/capital"
					},
					{
						"menuId": 52,
						"menuName": "提现管理",
						"garden": 1,
						"parent": 47,
						"url": "settlement/cash"
					}
					]
				},
				{
					"menuId": 57,
					"menuName": "内容管理",
					"garden": 0,
					"parent": null,
					"url": "contentManager",
					"children": [
					{
						"menuId": 58,
						"menuName": "内容列表",
						"garden": 1,
						"parent": 57,
						"url": "content/list"
					}
					]
				},
				{
					"menuId": 63,
					"menuName": "系统管理",
					"garden": 0,
					"parent": null,
					"url": "systemManager",
					"children": [
					{
						"menuId": 64,
						"menuName": "管理员",
						"garden": 1,
						"parent": 63,
						"url": "system/admin"
					},
					{
						"menuId": 70,
						"menuName": "角色管理",
						"garden": 1,
						"parent": 63,
						"url": "system/rolemanagement"
					},
					{
						"menuId": 75,
						"menuName": "意见反馈",
						"garden": 1,
						"parent": 63,
						"url": "system/problem"
					},
					{
						"menuId": 77,
						"menuName": "菜单管理",
						"garden": 1,
						"parent": 63,
						"url": "system/menumanagement"
					},
					{
						"menuId": 80,
						"menuName": "版本管理",
						"garden": 1,
						"parent": 63,
						"url": "system/edition"
					}
					]
				}
				]
		},
		/**
		 * 编辑菜单
		 * @function handleEdit
		 * @params {Object} 菜单项
		 */
		handleEdit(row){
			this.$router.push({
				path: '/management/menumanagement/edit',
				query: {
					menuId: row.menuId,
				}
			});
		}
    },
}
</script>

<style scoped lang="scss">
	.container{
		.table {
			width: 100%;
			padding: 30px;
			background: #fff;
			border-radius: 2px;
		}
	}
</style>
