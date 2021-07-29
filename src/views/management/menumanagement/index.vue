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
		getMenu(){},
		/**
		 * 编辑菜单
		 * @function handleEdit
		 * @params {Object} 菜单项
		 */
		handleEdit(row){
			this.$router.push({
				path: '/management/menumanagement/edit',
			//   query: {
			//     menuId: row.menuId,
			//   }
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
