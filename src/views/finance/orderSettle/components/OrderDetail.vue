<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                prop="reconciliationId"
                width="180"
                label="对账订单编号">
            </el-table-column>
            <el-table-column
                width="180"
                label="账单时间段">
                <template slot-scope="scope">
                    {{ scope.row.startTime }}~{{ scope.row.endTime }}
                </template>
            </el-table-column>
            <el-table-column
                label="收入金额">
                <template slot-scope="scope">
                    <span>¥{{ scope.row.incomeAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="支出金额">
                <template slot-scope="scope">
                    <span>¥{{ scope.row.expensesAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="收支净额">
                <template slot-scope="scope">
                    <span>¥{{ scope.row.incomeExpenditure }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="orderType"
                label="订单类型">
            </el-table-column>
            <el-table-column
                prop="orderStatus"
                label="订单状态">
            </el-table-column>
            <el-table-column
                prop="reconciliationStatus"
                label="对账状态">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row.reconciliationId)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    created() {},
    methods: {
        /**
         * 查看订单
         * @function handleScan
         * @params {Object} data
         */
        handleScan(id) {
            this.$router.push({
                path: '/finance/record/detail',
                query: {
                    reconciliationId: id
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        padding: 24px 24px 0 24px;
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
</style>