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
                    width="100"
                    label="结算时间段">
                    <template slot-scope="scope">
                        {{ scope.row.startTime }}~{{ scope.row.endTime }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="收入金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.incomeAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="支出金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.expensesAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="结算金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.incomeExpenditure }}</span>
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
                        <span>¥{{ scope.row.bossIncome }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="邮来邮网">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.ylyIncome }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="代理商（门店）">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.serviceIncome }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="鉴评师">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.appraiserIncome }}</span>
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
                        <el-divider v-if="[0].includes(scopw.row.examineStatus)" direction="vertical"></el-divider>
                        <el-button v-if="[0].includes(scopw.row.examineStatus)" type="text" @click="handleExamine(scope.row.settlementId)">审核</el-button>
                        <!-- <el-divider v-if="[1].includes(scopw.row.examineStatus)" direction="vertical"></el-divider>
                        <el-button v-if="[1].includes(scopw.row.examineStatus)" type="text" @click="handleDownload(scope.row)">下载</el-button> -->
                        <el-divider v-if="[1].includes(scopw.row.examineStatus)" direction="vertical"></el-divider>
                        <el-button v-if="[1].includes(scopw.row.examineStatus)" type="text" @click="handlePayment(scope.row)">支付</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-dialog
            title="结算审核"
            width="480px"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <div>
                <div class="radio">
                    <el-radio v-model="reviewForm.radio" :label="1">通过</el-radio>
                    <el-radio v-model="reviewForm.radio" :label="2">驳回</el-radio>
                </div>
                <div class="reject" v-if="reviewForm.radio === 2">
                    <span>驳回原因：</span>
                    <el-input type="textarea" v-model="reviewForm.rejectData"></el-input>
                </div>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="handleClose">取 消</el-button>
                <el-button class="submit" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_SETTLEMENT_SUCCESS,
    POST_FINANCE_SLIP_SETTLEMENT_REJECT,
} from '@/api/request';

export default {
    data() {
        return {
            dialogVisible: false,
            reviewForm: {
                radio: null,
                rejectData: '',
                settlementId: ''
            },
            examineStatus: [
                {label: '待审核', value: 0},
                {label: '待结算', value: 1},
                {label: '已结算', value: 2},
                {label: '已拒绝', value: 3},
                {label: '已关闭', value: 4},
            ]
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
         * @params {Object} data
         */
        handleExamine(id) {
            this.reviewForm.settlementId = id;
            this.dialogVisible = true;
        },
        /**
         * 查看
         * @function handleScan
         * @params {Object} data
         */
        handleScan(id) {
            this.$router.push({
                path: '/finance/settle/detail',
                query: {
                    settlementId: id
                }
            });
        },
        /**
         * 关闭结算审核弹窗
         * @function handleClose
         */
        handleClose() {
            this.dialogVisible = false;
            let obj = {
                radio: null,
                rejectData: '',
                settlementId: ''
            };
            Object.assign(this.reviewForm, obj);
        },
        /**
         * 审核结算
         * @function handleSubmit
         */
        handleSubmit() {
            if (!this.reviewForm.radio) {
                this.$message.warning('请选择审核意见');
                return;
            }
            if (this.reviewForm.radio === 2 && !this.reviewForm.rejectData) {
                this.$message.warning('请输入拒绝原因');
                return;
            }
            let params = {
                settlementId: this.reviewForm.settlementId
            }
            this.reviewForm.radio === 2 && (params.rejectData = this.reviewForm.rejectData);
            let post_interface = this.reviewForm.radio === 1 ? POST_FINANCE_SLIP_SETTLEMENT_SUCCESS : POST_FINANCE_SLIP_SETTLEMENT_REJECT;
            post_interface(params).then(() => {
                this.$message.success('审核完成');
                this.dialogVisible = false;
                let obj = {
                    radio: null,
                    rejectData: '',
                    settlementId: ''
                };
                Object.assign(this.reviewForm, obj);
                this.$emit('getData');
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        >>>.el-table {
            padding: 24px 24px 0 24px;
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