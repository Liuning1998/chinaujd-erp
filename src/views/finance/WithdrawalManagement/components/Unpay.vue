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
            <el-table-column prop="date" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="handlePay(scope.row)">支付</el-button>
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
            dialogVisible: false,
            detailDialogVisible: false,
            payType: [
                {label: '线上支付', value: 1},
                {label: '线下支付', value: 2}
            ],
            payForm: {
                pay_type: null,
                fileList: []
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取提现审核数据
         * @Function getData
         */
        getData() {
            let data = [
                {
                    prop1: '443234444444345',
                    prop2: '鉴评师',
                    prop3: 12345678901,
                    prop4: 1000000.00,
                    prop5: 1234567890987654321,
                    prop6: '2020.2.24'
                },
                {
                    prop1: '443234444444345',
                    prop2: '鉴评师',
                    prop3: 12345678901,
                    prop4: 1000000.00,
                    prop5: 1234567890987654321,
                    prop6: '2020.2.24'
                },
            ];
            this.tableData = data;
        },
        /**
         * 查看
         * @Function handleScan
         * @params {Object} data
         */
        handleScan(data) {
            this.detailDialogVisible = true;
        },
        /**
         * 审核
         * @Function handlePay
         * @params {Object} data
         */
        handlePay(data) {
            this.dialogVisible = true;
        },
        /**
         * 更改每页条数
         * @Function handleSizeChange
         * @params {Number} pageSize
         */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getData();
        },
        /**
         * 更改当前页
         * @Function handleCurrentChange
         * @params {Number} currentPage
         */
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
        /**
         * 取消提现支付
         * @Function handleClose
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
         * @Function handleSubmit
         */
        handleSubmit() {
            if (!this.payForm.pay_type) {
                this.$message.warning('请选择结算方式');
                return;
            }
            let obj = {
                pay_type: null,
                fileList: []
            };
            this.$message.success('已完成结算');
            Object.assign(this.payForm, obj);
            this.dialogVisible = false;
            this.getData();
        },
        /**
         * 选择结算方式
         * @Function handleSelectPayType
         * @params {Number} index
         */
        handleSelectPayType(index) {
            this.payForm.pay_type = this.payType[index].value;
        },
        /**
         * 关闭查看提现详情弹窗
         * @Function handleCloseDialog
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