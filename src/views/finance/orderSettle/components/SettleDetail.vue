<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                label="系统角色">
                <template slot-scope="scope">
                    <span>{{ scope.row.userType ? JSON.parse(scope.row.userType).desc : '-' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="结算主体">
            </el-table-column>
            <el-table-column
                label="结算金额">
                <template slot-scope="scope">
                    <span>¥ {{ scope.row.userAmount || '0.00' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="备注">
                <template slot-scope="scope">
                    <span>{{ scope.row.remarks || '-' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row.userId)">查看</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="handleRemarks(scope.row.userId)">备注</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="备注"
            :visible.sync="remarksDialogVisible"
            width="480px"
            :before-close="handleCloseRemarks">
            <div>
                <el-form ref="form" :model="remarksForm" label-width="54px">
                    <el-form-item label="备注：">
                        <el-input type="textarea" rows="3" v-model="remarksForm.remarks"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="handleCloseRemarks">取 消</el-button>
                <el-button type="primary" @click="handleSubmitRemarks">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="结算明细"
            :visible.sync="settleDialogVisible"
            width="640px"
            :before-close="handleCloseSettle">
            <div>
                <el-table
                    height="270"
                    :data="settleTableData">
                    <el-table-column prop="oMId" label="订单编号"></el-table-column>
                    <el-table-column label="订单金额">
                        <template slot-scope="scope">
                            <span>¥ {{ scope.row.oMAmount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结算金额">
                        <template slot-scope="scope">
                            <span>¥ {{ scope.row.amount }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button @click="handleCloseSettle">知道了</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_REMARKS_SAVE,
    POST_FINANCE_SLIP_VIEWSETTLEMENT_VIEW,
} from '@/api/request';

export default {
    data() {
        return {
            remarksDialogVisible: false,
            settleDialogVisible: false,
            remarksForm: {
                remarks: null
            },
            settleTableData: [],
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
         * 查看利润分配明细
         * @function handleScan
         * @params {String} userId
         */
        handleScan(userId) {
            let params = {
                userIdid,
            }
            POST_FINANCE_SLIP_VIEWSETTLEMENT_VIEW(params).then(res => {
                this.settleTableData = res.data.viewVos;
            });
        },
        /**
         * 关闭修改备注弹窗
         * @function handleCloseRemarks
         */
        handleCloseRemarks() {
            this.remarksDialogVisible = false;
        },
        /**
         * 修改备注
         * @function handleSubmitRemarks
         */
        handleSubmitRemarks() {
            this.remarksDialogVisible = false;
        },
        /**
         * 修改备注
         * @function handleRemarks
         * @params {String} userId
         */
        handleRemarks(userId) {
            let params = {
                userId,
                remarks: this.remarksForm.remarks
            }
            POST_FINANCE_SLIP_REMARKS_SAVE(params).then(() => {
                this.$message.success('备注修改成功');
            });
        },
        /**
         * 关闭结算明细弹窗
         * @function handleCloseSettle
         */
        handleCloseSettle() {
            this.settleDialogVisible = false;
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