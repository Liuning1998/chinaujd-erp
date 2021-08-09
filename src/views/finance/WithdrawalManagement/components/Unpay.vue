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
                    <span>{{ scope.row.bankName }}（{{ scope.row.cardNumber ? (scope.row.cardNumber).substring(scope.row.cardNumber.length - 4) : '' }}）</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="申请日期">
            </el-table-column>
            <el-table-column prop="date" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row.cashoutRecId)">查看</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="handlePay(scope.row.cashoutRecId)">支付</el-button>
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
        <el-dialog
            title="提现支付"
            width="480px"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <div class="pay-item">
                <span>结算方式：</span>
                <div class="pay-btns">
                    <span
                        v-for="(item, index) in payType" :key="index"
                        :class="payForm.pay_type === item.value ? 'select-btns' : null"
                        @click="handleSelectPayType(index)">
                        {{ item.label }}
                    </span>
                </div>
            </div>
            <div class="pay-item">
                <span>支付凭证：</span>
                <div class="upload">
                    <el-upload
                        action="#"
                        multiple
                        accept=".jpg,.png,.gif"
                        list-type="picture-card"
                        :file-list="payForm.fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="handleClose">取 消</el-button>
                <el-button class="submit" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
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
            cashoutRecId: '',
            dialogVisible: false,
            detailDialogVisible: false,
            payType: [
                {label: '线上支付', value: 0},
                {label: '线下支付', value: 1}
            ],
            payForm: {
                pay_type: null,
                fileList: []
            }
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
         * 提现结算
         * @function handlePay
         * @params {Object} data
         */
        handlePay(data) {
            this.dialogVisible = true;
        },
        /**
         * 取消提现支付
         * @function handleClose
         */
        handleClose() {
            this.dialogVisible = false;
            let obj = {
                pay_type: null,
                fileList: []
            };
            Object.assign(this.payForm, obj);
        },
        /**
         * 提现支付
         * @function handleSubmit
         */
        handleSubmit() {
            if (!this.payForm.pay_type) {
                this.$message.warning('请选择结算方式');
                return;
            }
            let params = {
                cashoutRecId: this.cashoutRecId,
                setSettlementMode: this.payForm.pay_type,
                setSettlementProof: this.payForm.fileList
            }
            POST_FINANCE_SLIP_SETTLE_CASHOUT(params).then(() => {
                let obj = {
                    pay_type: null,
                    fileList: []
                };
                Object.assign(this.payForm, obj);
                this.dialogVisible = false;
                this.$emit('getData');
            });
        },
        /**
         * 选择结算方式
         * @function handleSelectPayType
         * @params {Number} index
         */
        handleSelectPayType(index) {
            this.payForm.pay_type = this.payType[index].value;
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
        >>>.el-dialog__wrapper {
            .el-dialog__header {
                padding: 16px 24px;
                .el-dialog__title {
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333333;
                }
            }
            .el-dialog__body {
                padding: 8px 24px 0;
                .pay-item {
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    >span {
                        width: 70px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333;
                    }
                    .pay-btns {
                        span {
                            width: 88px;
                            height: 22px;
                            line-height: 22px;
                            background: #F5F5F5;
                            border: 1px solid #D9D9D9;
                            border-radius: 2px;
                            margin-right: 24px;
                            display: inline-block;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                            text-align: center;
                            cursor: pointer;
                        }
                        .select-btns {
                            background: #FFFFFF;
                            border: 1px solid #1890FF;
                            color: #1890FF;
                        }
                    }
                    .upload {
                        .el-upload--picture-card {
                            width: 88px;
                            height: 88px;
                            line-height: 88px;
                            border-radius: 2px;
                            background: rgba(0,0,0,0.04);
                        }
                    }
                }
            }
            .el-dialog__footer {
                padding: 0 24px 24px 24px;
                .el-button {
                    width: 65px;
                    height: 32px;
                    line-height: 32px;
                    background: #1890FF;
                    border-radius: 2px;
                    color: #fff;
                    padding: 0;
                    border: 0;
                }
                .cancel {
                    background: #FFFFFF;
                    border: 1px solid #D9D9D9;
                    color: #666;
                }
            }
        }
    }
</style>