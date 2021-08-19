<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="search">
			<span class="label">角色名称：</span>
			<el-input v-model="keyword" placeholder="请输入"></el-input>
			<div class="btns">
				<el-button @click="handleSearch">查询</el-button>
				<el-button @click="handleAdd">新增</el-button>
			</div>
		</div>
		<el-table
			class="table"
			:data="tableData">
			<el-table-column
				prop="roleName"
				label="角色名称">
			</el-table-column>
			<el-table-column
				prop="gmtModified"
				label="创建时间">
			</el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.row.roleId)">编辑</el-button>
					<el-divider direction="vertical"></el-divider>
					<el-button type="text" @click="handleDelete(scope.row.roleId)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
    	<div class="pagination" v-if="total > pageSize">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next, sizes, jumper"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import {
	POST_USERCENTER_QUERY_ROLE_PAGE,
	GET_USERCENTER_DELETE_ROLE
} from '@/api/request';
import Breadcrumb from '@/components/Breadcrumb';
export default {
	name: '',
	components: {
		Breadcrumb
	},
	data() {
		return {
			keyword: null,
			tableData: [],
			total: 0,
			currentPage: 0,
			pageSize: 15,
		}
	},
	// 模板渲染前钩子函数
	created() {
		this.getData();
	},
	methods: {
		/**
		 * 获取角色列表
		 * @function getData
		 */
		getData() {
			let params = {
				regSys: sessionStorage.getItem('regSys'),
				roleName: this.keyword,
				currentPage: this.currentPage,
				pageSize: this.pageSize
			};
			POST_USERCENTER_QUERY_ROLE_PAGE(params).then(res => {
				this.tableData = res.data.rows;
				this.total = Number(res.data.total);
			});
		},
		/**
		 * 查询
		 * @function handleSearch
		 */
		handleSearch() {
			this.getData();
		},
		/**
		 * 新增角色
		 * @function handleAdd
		 */
		handleAdd() {
			this.$router.push('/management/rolemanagement/add');
		},
		/**
		 * 编辑角色
		 * @function handleEdit
		 * @params {String} roleId 角色id
		 */
		handleEdit(roleId) {
			this.$router.push({
				path: '/management/rolemanagement/edit',
				query: {
					roleId
				}
			});
		},
		/**
		 * 删除角色
		 * @function handleDelete
		 * @params {String} roleId 角色id
		 */
		handleDelete(roleId) {
			this.$confirm('你确认要删除该角色吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				let params = {
					roleId
				};
				GET_USERCENTER_DELETE_ROLE(params).then(res => {
					this.$message.success('删除成功');
					this.getData();
				});
			}).catch(() => {});
		},
		/**
		 * 更改每页条数
		 * @function handleSizeChange
		 * @params {Number} pageSize
		 */
		handleSizeChange(pageSize) {
			this.pageSize = pageSize;
			this.getData();
		},
		/**
		 * 更改当前页
		 * @function handleCurrentChange
		 * @params {Number} currentPage
		 */
		handleCurrentChange(currentPage) {
			this.currentPage = currentPage;
			this.getData();
		},
	},
}
</script>
<style lang="scss" scoped>
	.container {
		.search {
			width: 100%;
			padding: 20px 24px;
			background: #FFF;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: rgba(0, 0, 0, 0.85);
			display: flex;
			align-items: center;
			>>>.el-input {
				width: 240px;
				.el-input__inner {
					height: 32px;
					line-height: 32px;
					border-radius: 2px;
				}
			}
			.btns {
				margin-left: 20px;
				>>>.el-button {
				width: 65px;
				height: 32px;
				background: #1890FF;
				border-radius: 2px;
				color: #FFF;
				font-size: 14px;
				padding: 0;
				margin: 0 8px 0 0;
				border: 0;
				}
			}
		}
		>>>.el-table::before {
			height: 0;
		}
		>>>.el-table {
			padding: 16px 24px;
			margin-top: 16px;
			thead {
				tr>th {
					height: 54px;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: rgba(0,0,0,0.85);
					background: #FAFAFA;
					border-radius: 4px 4px 0 0;
				}
			}
			tbody {
				tr>td {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #666;
					height: 54px;
					padding: 0;
					.el-button--text {
						color:#1890FF;
					}
					.el-divider--vertical {
						margin: 0 4px;
						background: #E9E9E9;
					}
				}
			}
		}
		.pagination {
			width: 100%;
			padding: 0 24px 16px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background: #fff;
			box-sizing: border-box;
			>>>.el-pagination {
				.btn-next,
				.btn-prev,
				.el-pager li {
					background: #FFF;
					border: 1px solid #D9D9D9;
					border-radius: 2px;
				}
				.el-pager li {
					font-family: HelveticaNeue;
					font-size: 14px;
					font-weight: 100;
					color: rgba(0,0,0,0.65);
				}
				.el-pager li:not(.disabled).active {
					background-color: #409EFF;
					color: #FFF;
				}
				.el-pagination__jump {
					margin: 0;
				}
			}
		}
  	}
</style>

