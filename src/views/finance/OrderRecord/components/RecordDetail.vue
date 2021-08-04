<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                align="center">
                <template slot="header" slot-scope="">
                    <div class="header">
                        <span>平台订单对账数据</span>
                    </div>
                </template>
                <el-table-column
                    prop="platformOrderNumber"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="platformOrderTransactionTime"
                    label="交易时间">
                </el-table-column>
                <el-table-column
                    label="交易金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.platformOrderTransactionAmount }}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column>
                <el-table-column
                    label="每单对账状态"
                    width="180">
                    <template slot-scope="scope">
                        <div v-if="Number(scope.row.status) === 1">
                            <i class="dot-success"></i>
                            <span>正常</span>
                        </div>
                        <div v-if="Number(scope.row.status) === 2">
                            <i class="dot-error"></i>
                            <span>异常未处理</span>
                            <el-button class="detail" type="text" @click="handleAbnormal(scope.row.orderNumber)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center">
                <template slot="header" slot-scope="">
                    <div class="header">
                        <span>三方账户对账数据</span>
                        <div class="btns">
                            <span class="download">
                                <el-button type="text" size="small"><i></i>模版下载</el-button>
                            </span>
                            <el-upload action="#" class="upload">
                                <el-button type="text" size="small"><i></i>上传对账数据</el-button>
                            </el-upload>
                        </div>
                    </div>
                </template>
                <el-table-column
                    label="交易金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.thirdPartTransactionAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="业务类型">
                    <template slot-scope="scope">
                        {{ scope.row.thirdPartPaymentType ? JSON.parse(scope.row.thirdPartPaymentType).desc : '' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="thirdPartTransacionTime"
                    label="交易时间">
                </el-table-column>
                <el-table-column
                    prop="thirdPartNumber"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="thirdPartTransactionSerialNumber"
                    label="交易流水号">
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-dialog
            title="异常详情"
            width="640px"
            class="abnormal-dialog"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <div>
                <div class="detail-order">
                    <span>订单编号：{{ orderNumber }}</span>
                </div>
                <div class="table">
                    <el-table
                        :data="abnormalTableData">
                        <el-table-column
                            prop="thirdPartNumber"
                            label="订单号">
                        </el-table-column>
                        <el-table-column
                            prop="thirdPartTransacionTime"
                            label="交易时间">
                        </el-table-column>
                        <el-table-column
                            prop="platformOrderPaymentType"
                            label="交易类型">
                        </el-table-column>
                        <el-table-column
                            label="交易金额">
                            <template slot-scope="scope">
                                ¥{{ scope.row.thirdPartTransactionAmount }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer">
                <el-button class="submit" @click="handleClose">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {

} from '@/api/request';

export default {
    data() {
        return {
            abnormalTableData: [],
            orderNumber: null,
            dialogVisible: false,
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
    methods: {
        /**
         * 处理异常弹窗
         * @function handleAbnormal
         */
        handleAbnormal(orderNumber) {
            this.orderNumber = orderNumber;
            this.dialogVisible = true;
            // TODO: 获取三方异常数据列表  platformOrderPaymentType 需JSON.parse处理
            // this.abnormalTableData = res.data.rows;
        },
        /**
         * 关闭异常处理弹窗
         * @function handleClose
         */
        handleClose() {
            this.dialogVisible = false;
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        background: #fff;
        box-sizing: border-box;
        padding: 16px 24px 0 24px;
        >>>.el-table {
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 14px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                .btns {
                    display: flex;
                    .el-button {
                        height: 24px;
                        line-height: 24px;
                        background: #FFF;
                        border: 1px solid #1890FF;
                        border-radius: 2px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #1890FF;
                        padding: 0;
                        font-weight: 100;
                        box-sizing: border-box;
                    }
                    .download .el-button{
                        width: 100px;
                        margin-right: 24px;
                    }
                    .upload .el-button {
                        width: 128px;
                    }
                    .download i {
                        width: 12px;
                        height: 12px;
                        display: inline-block;
                        margin-right: 6px;
                        background: url('~@/assets/images/finance/icon_download.png') no-repeat top center;
                    }
                    .upload i {
                        width: 12px;
                        height: 12px;
                        display: inline-block;
                        margin-right: 6px;
                        background: url('~@/assets/images/finance/icon_upload.png') no-repeat top center;
                    }
                }
            }
            .dot-success {
                width: 6px;
                height: 6px;
                background: #52C41A;
                margin: 0 8px 0 6px;
                display: inline-block;
                border-radius: 50%;
            }
            .dot-error {
                width: 6px;
                height: 6px;
                background: #F5222D;
                margin: 0 8px 0 6px;
                display: inline-block;
                border-radius: 50%;
            }
            .detail {
                margin-left: 16px;
            }
        }
        .abnormal-dialog {
            >>>.el-dialog {
                .el-dialog__header {
                    padding: 16px 24px;
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333333;
                }
                .el-dialog__body {
                    padding: 8px 24px 0;
                    .detail-order {
                        margin-top: 24px;
                        display: flex;
                        align-items: center;
                        span {
                            width: 70px;
                            height: 22px;
                            line-height: 22px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                        }
                        .el-input {
                            width: 328px;
                            padding: 0;
                            .el-input__inner {
                                height: 32px;
                                line-height: 32px;
                                border-radius: 2px;
                            }
                        }
                        .el-button {
                            width: 65px;
                            height: 32px;
                            line-height: 32px;
                            padding: 0;
                            background: #1890FF;
                            border-radius: 2px;
                            font-size: 14px;
                            color: #FFFFFF;
                            margin-left: 24px;
                        }
                    }
                    .table {
                        margin-top: 24px;
                        border-radius: 2px;
                        background: #fff;
                        thead {
                            tr>th {
                                height: 54px;
                                font-family: PingFangSC-Medium;
                                font-size: 14px;
                                color: #333;
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
                                .el-input__inner {
                                    height: 32px;
                                    line-height: 32px;
                                    border-radius: 2px;
                                }
                            }
                        }
                    }
                }
                .el-dialog__footer {
                    padding: 24px;
                    font-size: 0;
                    >div {
                        display: flex;
                        justify-content: flex-end;
                    }
                    .cancel {
                        width: 65px;
                        height:32px;
                        line-height: 32px;
                        border-radius: 2px;
                        padding: 0;
                        background: #fff;
                        border: 1px solid #D9D9D9;
                        color: #666;
                        font-size: 14px;
                        margin-right: 8px;
                    }
                    .submit {
                        width: 65px;
                        height:32px;
                        line-height: 32px;
                        border-radius: 2px;
                        padding: 0;
                        background: #1890FF;
                        border: 0;
                        color: #fff;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>