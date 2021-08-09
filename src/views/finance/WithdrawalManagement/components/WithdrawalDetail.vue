<template>
    <div class="container">
        <el-dialog
            title="提现详情"
            :visible.sync="dialogVisible"
            width="480px"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="提现金额：">
                    <span>{{ form.cashoutAmount }}</span>
                </el-form-item>
                <el-form-item label="服务费：">
                    <span>{{ form.procedureAmount }}</span>
                </el-form-item>
                <el-form-item label="应缴税：">
                    <span>{{ form.personalTax }}</span>
                </el-form-item>
                <el-form-item label="提现状态：">
                    <span>{{ form.settlementStatus }}</span>
                </el-form-item>
                <el-form-item label="申请时间：">
                    <span>{{ form.gmtCreate }}</span>
                </el-form-item>
                <el-form-item label="到账时间：">
                    <span>{{ form.auditTime }}</span>
                </el-form-item>
                <el-form-item label="到账账户：">
                    <span>{{ form.bankName }}（{{ form.cardNumber ? (form.cardNumber).substring(form.cardNumber.length - 4) : ''}}）</span>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="订单编号：">
                    <span>{{ form.cashoutRecId }}</span>
                </el-form-item>
                <el-form-item label="用户类型：">
                    <span>{{ form.userType }}</span>
                </el-form-item>
                <el-form-item label="提现用户：">
                    <span>{{ form.mobile }}</span>
                </el-form-item>
                <el-form-item label="注册手机：">
                    <span>{{ form.mobile }}</span>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_CASHOUT_INFO,
} from '@/api/request';

export default {
    name: '',
    data() {
        return {
            form: {}
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        cashoutRecId: {
            type: String,
            default: ''
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取提现详情
         */
        getData() {
            let params = {
                cashoutRecId: this.cashoutRecId
            };
            POST_FINANCE_SLIP_CASHOUT_INFO(params).then(res => {
                Object.assign(this.form, res.data);
            });
        },
        /**
         * 关闭弹窗
         * @function handleClose
         */
        handleClose() {
            this.$emit('handleCloseDialog', false);
        },
        /**
         * 提交
         * @function handleSubmit
         */
        handleSubmit() {
            this.$emit('handleCloseDialog', false);
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
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
                .el-form {
                    .el-form-item {
                        width: 100%;
                        height: 22px;
                        margin-bottom: 16px;
                        display: inline-block;
                        .el-form-item__label,
                        .el-form-item__content {
                            line-height: 22px;
                        }
                    }
                    .el-divider--horizontal {
                        margin: 0 0 16px 0;
                    }
                }
            }
            .el-dialog__footer {
                padding: 8px 24px 24px;
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