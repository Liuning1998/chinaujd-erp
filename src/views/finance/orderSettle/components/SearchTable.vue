<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                align="center"
                label="结算订单统计">
                <el-table-column
                    prop="settlementId"
                    width="120"
                    label="结算订单编号">
                </el-table-column>
                <el-table-column
                    width="170"
                    label="结算时间段">
                    <template slot-scope="scope">
                        {{ scope.row.startTime | dateFormat }}~{{ scope.row.endTime | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="收入金额">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.incomeAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="支出金额">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.expensesAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="结算金额">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.incomeExpenditure }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="结算收入分配">
                <el-table-column
                    width="140"
                    label="中国集邮有限公司">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.bossIncome }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="邮来邮网">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.ylyIncome }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="代理商（门店）">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.serviceIncome }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="鉴评师">
                    <template slot-scope="scope">
                        <span>¥ {{ scope.row.appraiserIncome }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="结算申请信息">
                <el-table-column
                    width="80"
                    label="审核状态">
                    <template slot-scope="scope">
                        {{ examineStatus[scope.row.examineStatus] ? examineStatus[scope.row.examineStatus].label : '' }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="200"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleScan(scope.row.settlementId)">查看</el-button>
                        <el-divider v-if="[0].includes(scope.row.examineStatus)" direction="vertical"></el-divider>
                        <el-button v-if="[0].includes(scope.row.examineStatus)" type="text" @click="handleExamine(scope.row.settlementId)">审核</el-button>
                        <!-- <el-divider v-if="[1].includes(scopw.row.examineStatus)" direction="vertical"></el-divider>
                        <el-button v-if="[1].includes(scopw.row.examineStatus)" type="text" @click="handleDownload(scope.row)">下载</el-button> -->
                        <el-divider v-if="[1].includes(scope.row.examineStatus)" direction="vertical"></el-divider>
                        <el-button v-if="[1].includes(scope.row.examineStatus)" type="text" @click="handlePayment(scope.row.settlementId)">支付</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-dialog
            title="结算审核"
            width="480px"
            :visible.sync="settlementDialogVisible"
            :before-close="handleCloseSettle">
            <div>
                <div class="radio">
                    <el-radio v-model="reviewForm.radio" label="pass">通过</el-radio>
                    <el-radio v-model="reviewForm.radio" label="reject">驳回</el-radio>
                </div>
                <div class="reject" v-if="reviewForm.radio === 'reject'">
                    <span>驳回原因：</span>
                    <el-input type="textarea" v-model="reviewForm.rejectData"></el-input>
                </div>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="handleCloseSettle">取 消</el-button>
                <el-button class="submit" @click="handleSubmitSettle">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="结算支付"
            :visible.sync="paymentDialogVisible"
            width="480px"
            :before-close="handleClosePay">
            <div class="settle-item">
                <span>结算方式：</span>
                <div class="settle-btns">
                    <span
                        v-for="(item, index) in settleType" :key="index"
                        :class="payForm.settlementPayType === item.value ? 'select-btns' : null"
                        @click="handleSelectSettleType(index)">
                        {{ item.label }}
                    </span>
                </div>
            </div>
            <div class="settle-item">
                <span>支付凭证：</span>
                <div class="upload">
                    <el-upload
                        :action="payOrderUploadUrl"
                        multiple
                        :data="imageUploadForm"
                        :headers="headersData"
                        accept=".jpg,.png,.gif"
                        list-type="picture-card"
                        :on-success="onSuccess"
                        :on-remove="onRemove"
                        :file-list="payForm.payProve">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="handleClosePay">取 消</el-button>
                <el-button class="submit" @click="handleSubmitPay">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_SETTLEMENT_SUCCESS,
    POST_FINANCE_SLIP_SETTLEMENT_REJECT,
    POST_FINANCE_SLIP_PAY,
    payOrderUploadUrl,
    GET_TOKEN,
} from '@/api/request';

export default {
    data() {
        return {
            payOrderUploadUrl: payOrderUploadUrl,
            headersData: {
                'Authorization': sessionStorage.getItem('token'),
            },
            imageUploadForm: {
                ossToken: null,
                ossAccessKeyId: null,
                ossAccessKeySecret: null,
                type: 'PHILATELIC_PROVE'
            },
            settlementDialogVisible: false,
            paymentDialogVisible: false,
            reviewForm: {
                radio: null,
                rejectData: null,
                settlementId: null
            },
            payForm: {
                payProve: [],
                settlementId: null,
                settlementPayType: null,
            },
            examineStatus: [
                {label: '待审核', value: 0},
                {label: '待结算', value: 1},
                {label: '已结算', value: 2},
                {label: '已拒绝', value: 3},
                {label: '已关闭', value: 4},
            ],
            settleType: [
                {label: '线上支付', value: 1},
                {label: '线下支付', value: 2}
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
    methods: {
        /**
         * 审核
         * @function handleExamine
         * @params {Number} settlementId 结算订单编号
         */
        handleExamine(settlementId) {
            this.reviewForm.settlementId = settlementId;
            this.settlementDialogVisible = true;
        },
        /**
         * 查看
         * @function handleScan
         * @params {Number} settlementId 结算订单编号
         */
        handleScan(settlementId) {
            this.$router.push({
                path: '/finance/settle/detail',
                query: {
                    settlementId
                }
            });
        },
        /**
         * 支付
         * @function handlePayment
         * @params {Number} settlementId 结算订单编号
         */
        handlePayment(settlementId) {
            let params = {
                systemType: 'PHILATELIC'
            }
            GET_TOKEN(params).then(res => {
                Object.assign(this.imageUploadForm, res);
                this.payForm.settlementId = settlementId;
                this.paymentDialogVisible = true;
            });
        },
        /**
         * 关闭结算审核弹窗
         * @function handleCloseSettle
         */
        handleCloseSettle() {
            this.settlementDialogVisible = false;
            let obj = {
                radio: null,
                rejectData: null,
                settlementId: null
            };
            Object.assign(this.reviewForm, obj);
        },
        /**
         * 审核结算
         * @function handleSubmitSettle
         */
        handleSubmitSettle() {
            if (!this.reviewForm.radio) {
                this.$message.warning('请选择审核意见');
                return;
            }
            if (this.reviewForm.radio === 'reject' && !this.reviewForm.rejectData) {
                this.$message.warning('请输入拒绝原因');
                return;
            }
            let params = {
                settlementId: this.reviewForm.settlementId
            }
            this.reviewForm.radio === 'reject' && (params.rejectData = this.reviewForm.rejectData);
            let post_interface =
                this.reviewForm.radio === 'pass' ?
                POST_FINANCE_SLIP_SETTLEMENT_SUCCESS :
                POST_FINANCE_SLIP_SETTLEMENT_REJECT;

            post_interface(params).then(() => {
                this.$message.success('审核完成');
                this.settlementDialogVisible = false;
                let obj = {
                    radio: null,
                    rejectData: null,
                    settlementId: null
                };
                Object.assign(this.reviewForm, obj);
                this.$emit('getData');
            });
        },
        /**
         * 选择结算方式
         * @function handleSelectSettleType
         * @params {Number} index
         */
        handleSelectSettleType(index) {
            this.payForm.settlementPayType = this.settleType[index].value;
        },
        /**
         * 关闭结算支付弹窗
         * @function handleClosePay
         */
        handleClosePay() {
            this.paymentDialogVisible = false;
            let obj = {
                payProve: [],
                settlementId: null,
                settlementPayType: null
            };
            Object.assign(this.payForm, obj);
        },
        /**
         * 审核支付
         * @function handleSubmitPay
         */
        handleSubmitPay() {
            if (!this.payForm.settlementPayType) {
                this.$message.warning('请选择结算方式');
                return;
            }
            this.payForm.payProve = this.payForm.payProve.map(item => item.response.data.path.split('?')[0]).join(',');
            let params = this.payForm;
            POST_FINANCE_SLIP_PAY(params).then(() => {
                this.$message.success('支付完成');
                this.paymentDialogVisible = false;
                let obj = {
                    payProve: [],
                    settlementId: null,
                    settlementPayType: null
                };
                Object.assign(this.payForm, obj);
            });
        },
        /**
         * 上传凭证
         * @function onSuccess
         */
        onSuccess(response, file, fileList) {
            this.payForm.payProve = fileList.map(item => item);
        },
        /**
         * 删除凭证
         * @function onRemove
         */
        onRemove(file, fileList) {
            this.payForm.payProve = fileList.map(item => item);
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        >>>.el-table {
            padding: 24px;
            border-radius: 2px;
            background: #fff;
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
        >>>.el-table::before,
        >>>.el-table::after {
            background: transparent;
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
                .settle-item {
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    >span {
                        width: 70px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333;
                    }
                    .settle-btns {
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
                        .el-upload-list__item {
                            width: 88px;
                            height: 88px;
                        }
                    }
                }
                .reject {
                    margin-top: 24px;
                    display: flex;
                    span {
                        width:100px;
                    }
                    .el-textarea__inner {
                        width: 328px;
                        height: 80px;
                    }
                }
            }
            .el-dialog__footer {
                padding: 24px;
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