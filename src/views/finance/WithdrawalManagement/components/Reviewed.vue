<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                label="序号"
                type="index">
            </el-table-column>
            <el-table-column
                prop="prop1"
                width="160"
                label="订单号">
            </el-table-column>
            <el-table-column
                prop="prop2"
                width="80"
                label="用户类型">
            </el-table-column>
            <el-table-column
                prop="prop3"
                width="140"
                label="申请人">
            </el-table-column>
            <el-table-column
                prop="prop4"
                label="提现金额">
            </el-table-column>
            <el-table-column
                prop="prop5"
                width="200"
                label="提现账户">
            </el-table-column>
            <el-table-column
                prop="prop6"
                label="申请日期">
            </el-table-column>
            <el-table-column
                label="到账金额">
                <template slot-scope="scope">
                    <span>¥{{ scope.row.prop7 }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="prop8"
                label="到账日期">
            </el-table-column>
            <el-table-column prop="date" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
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
        <withdrawal-detail
            :dialog-visible="detailDialogVisible"
            @handleCloseDialog="handleCloseDialog">
        </withdrawal-detail>
    </div>
</template>

<script>
import WithdrawalDetail from '@/views/finance/withdrawalManagement/components/WithdrawalDetail';

export default {
    name: '',
    components: {
        WithdrawalDetail
    },
    data() {
        return {
            tableData: [],
            total: 0,
            currentPage: 0,
            pageSize: 15,
            detailDialogVisible: false,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取提现审核数据
         * @function getData
         */
        getData() {
            let data = [
                {
                    prop1: '443234444444345',
                    prop2: '鉴评师',
                    prop3: 12345678901,
                    prop4: 1000000.00,
                    prop5: 1234567890987654321,
                    prop6: '2020.2.24',
                    prop7: 1000,
                    prop8: '2020.02.02'
                },
                {
                    prop1: '443234444444345',
                    prop2: '鉴评师',
                    prop3: 12345678901,
                    prop4: 1000000.00,
                    prop5: 1234567890987654321,
                    prop6: '2020.2.24',
                    prop7: 1000,
                    prop8: '2020.02.02'
                },
            ];
            this.tableData = data;
        },
        /**
         * 查看
         * @function handleScan
         * @params {Object} data
         */
        handleScan(data) {
            this.detailDialogVisible = true;
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
        /**
         * 关闭查看提现详情弹窗
         * @function handleCloseDialog
         */
        handleCloseDialog(val) {
            this.detailDialogVisible = val;
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        margin: 0;
        >>>.el-table::before {
            height: 0;
        }
        >>>.el-table {
            margin-top: 8px;
            padding: 0 24px 16px;
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
            padding-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 24px;
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