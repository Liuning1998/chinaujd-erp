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
                width="170"
                label="账单时间段">
                <template slot-scope="scope">
                    {{ scope.row.startTime | dateFormat }}~{{ scope.row.endTime | dateFormat }}
                </template>
            </el-table-column>
            <el-table-column
                label="收入金额">
                <template slot-scope="scope">
                    <span>¥ {{ scope.row.incomeAmount || '0.00' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="支出金额">
                <template slot-scope="scope">
                    <span>¥ {{ scope.row.expensesAmount || '0.00' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="收支净额">
                <template slot-scope="scope">
                    <span>¥ {{ scope.row.incomeExpenditure || '0.00' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="订单类型">
                <template slot-scope="scope">
                    {{ orderType[scope.row.orderType] ? orderType[scope.row.orderType].label : '' }}
                </template>
            </el-table-column>
            <el-table-column
                label="订单状态">
                <template slot-scope="scope">
                    {{ orderStatus[scope.row.orderStatus] ? orderStatus[scope.row.orderStatus].label : '' }}
                </template>
            </el-table-column>
            <el-table-column
                label="对账状态">
                <template slot-scope="scope">
                    {{ status[scope.row.reconciliationStatus] ? status[scope.row.reconciliationStatus].label : '' }}
                </template>
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
        return {
            orderType: [
                {label: '售后订单', value: 1},
                {label: '结算订单', value: 2},
                {label: '提现订单', value: 3},
            ],
            orderStatus: [
                {label: '对账中', value: 1},
                {label: '待结算', value: 2},
                {label: '待审核', value: 3},
                {label: '待付款', value: 4},
                {label: '已结算', value: 5},
                {label: '已拒绝', value: 6},
                {label: '已关闭', value: 7},
                {label: '已提交', value: 8},
                {label: '处理中', value: 9},
                {label: '已到账', value: 10},
            ],
            status: [
                {label: '待对账', value: 0},
                {label: '未平账', value: 1},
                {label: '已平账', value: 2},
                {label: '已提交结算', value: 3},
            ],
        }
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
                    id,
                    activeName: 'order'
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