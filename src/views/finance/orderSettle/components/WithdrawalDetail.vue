<template>
    <div class="container">
        <el-dialog
            title="提现详情"
            :visible.sync="dialogVisible"
            width="480px"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="提现金额：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="服务费：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="应缴税：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="提现状态：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="申请时间：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="到账时间：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="到账账户：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="订单编号：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="用户类型：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="提现用户：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
                <el-form-item label="注册手机：">
                    <span>{{ form.prop1 }}</span>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button class="cancel" @click="handleClose">取 消</el-button>
                <el-button class="submit" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            form: {
                prop1: 1,
            }
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    methods: {
        /**
         * 关闭弹窗
         * @Function handleClose
         */
        handleClose() {
            this.$emit('handleCloseDialog', false);
        },
        /**
         * 提交
         * @Function handleSubmit
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