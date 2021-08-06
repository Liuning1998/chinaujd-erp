<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div class="search">
			<div class="search-item">
				<span>账号名称：</span>
				<el-input v-model="form.name" placeholder="请输入"></el-input>
			</div>
			<div class="search-item">
				<span>手机号：</span>
				<el-input v-model="form.mobile" placeholder="请输入"></el-input>
			</div>
			<div class="search-item">
				<span>状态：</span>
				<el-select v-model="form.status" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="(item,index) in accountStatus" :key="index"
						:label="item.label"
						:value="item.value"></el-option>
				</el-select>
			</div>
			<div class="btns">
				<el-button @click="handleSearch">查 询</el-button>
				<el-button @click="handleAdd">新 增</el-button>
			</div>
		</div>
		<div class="table">
			<el-table
				:data="tableData">
				<el-table-column
					prop="name"
					label="账号名称">
				</el-table-column>
				<el-table-column
					prop="mobile"
					label="手机号">
				</el-table-column>
				<el-table-column
					prop="roleName"
					label="角色">
				</el-table-column>
				<el-table-column
					label="状态">
					<template slot-scope="scope">
						<span>{{ JSON.parse(scope.row.status).desc }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="gmtCreate"
					label="创建时间">
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row.adminId)">编辑</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-button v-if="scope.row.status === 1" type="text" @click="handleDisable(scope.row.adminId)">禁用</el-button>
						<el-button v-if="scope.row.status === 0" type="text" @click="handleRecover(scope.row.adminId)">恢复</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
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
	POST_USERCENTER_BASE_ADMIN_LIST,
	POST_USERCENTER_BASE_ADMIN_DEAL_DISABLE,
	POST_USERCENTER_BASE_ADMIN_DEAL_ENABLE,
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
				name: '',
				mobile: '',
				status: '',
			},
			accountStatus: [
				{label: '禁用', value: 0},
				{label: '正常', value: 1},
			],
			tableData: [],
			total: 0,
            currentPage: 0,
            pageSize: 15,
		}
	},
    created() {
		this.getData();
	},
	methods: {
		/**
		 * 获取账号数据
		 * @function getData
		 */
		getData() {
			let params = {
				currentPage: this.currentPage,
				pageSize: this.pageSize,
				name: this.form.name,
				mobile: this.form.mobile,
				status: this.form.status
			};
			POST_USERCENTER_BASE_ADMIN_LIST(params).then(res => {
				res.data.rows.forEach(item => {
					item.status = JSON.parse(item.status).value;
				});
				this.tableData = res.data.rows;
				this.total = res.data.total;
			});
		},
		/**
		 * 查新
		 * @function handleSearch
		 */
		handleSearch() {
			this.getData();
		},
		/**
		 * 新增账号
		 * @function handleAdd
		 */
		handleAdd() {
			this.$router.push('/management/accountmanagement/add');
		},
		/**
		 * 编辑
		 * @function handleEdit
		 */
		handleEdit(id) {
			this.$router.push({
				path: '/management/accountmanagement/edit',
				query: {
					adminId: id
				}
			});
		},
		/**
		 * 禁用
		 * @function handleDisable
		 */
		handleDisable(id) {
			this.$confirm('你确认要禁用该用户吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				let params = {
					adminId: id,
					status: 0
				};
				POST_USERCENTER_BASE_ADMIN_DEAL_DISABLE(params).then(() => {
					this.$message.success('禁用成功');
					this.getData();
				});
			}).catch(() => {});
		},
		/**
		 * 恢复
		 * @function handleRecover
		 */
		handleRecover(id) {
			this.$confirm('你确认要恢复该用户吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				let params = {
					adminId: id,
					status: 1
				};
				POST_USERCENTER_BASE_ADMIN_DEAL_ENABLE(params).then(() => {
					this.$message.success('恢复成功');
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
	}
}
</script>

<style lang="scss" scoped>
	.container {
		.search {
			padding: 20px 24px;
			background: #FFF;
			border-radius: 2px;
			&-item {
				width: 33%;
				display: inline-flex;
				align-items: center;
				span {
					width: 70px;
					display: inline-block;
				}
				>>>.el-input {
					width: 240px;
					&__inner {
						height: 32px;
						line-height: 32px;
						border-radius: 2px;
					}
				}
				>>>.el-select__caret {
					line-height: 32px;
				}
			}
			.btns {
				margin-top: 16px;
				padding-left: 70px;
				>>>.el-button {
					width: 65px;
					height: 32px;
					background: #1890FF;
					border-radius: 2px;
					color: #FFF;
					border: 0;
					padding: 0;
				}
			}
		}
		.table {
            margin-top: 16px;
            padding: 16px 24px;
            border-radius: 2px;
            background: #fff;
            >>>.el-table {
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
        }
		.pagination {
            width: 100%;
            padding: 0 16px 16px 16px;
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