<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                label="序号"
                type="index">
            </el-table-column>
            <el-table-column
                prop="cashoutRecId"
                width="160"
                label="订单号">
            </el-table-column>
            <el-table-column
                prop="userType"
                width="80"
                label="用户类型">
            </el-table-column>
            <el-table-column
                prop="mobile"
                width="140"
                label="申请人">
            </el-table-column>
            <el-table-column
                prop="cashoutAmount"
                label="提现金额">
            </el-table-column>
            <el-table-column
                width="200"
                label="提现账户">
                <template slot-scope="scope">
                    <span>{{ scope.row.bankName }}（{{ scope.row.cardNumber ? (scope.row.cardNumber).substring(scope.row.cardNumber.length - 4) : ''}}）</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="申请日期">
            </el-table-column>
            <el-table-column
                label="到账金额">
                <template slot-scope="scope">
                    <span>¥ {{ scope.row.realityAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="settlementTime"
                label="到账日期">
            </el-table-column>
            <el-table-column prop="date" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row.cashoutRecId)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <withdrawal-detail
            :cashout-rec-id="cashoutRecId"
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
            detailDialogVisible: false,
            cashoutRecId: null,
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
         * 查看
         * @function handleScan
         * @params {Object} data
         */
        handleScan(id) {
            this.cashoutRecId = id;
            this.detailDialogVisible = true;
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
    }
</style>