<template>
    <div class="container">
        <el-dialog
            title="添加银行卡"
            :visible.sync="dialogVisible"
            width="480px"
            :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="姓名：" prop="prop1">
                    <el-input v-model="form.prop1" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码：" prop="prop2">
                    <el-input v-model="form.prop2" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="银行名称：" prop="prop3">
                    <el-input v-model="form.prop3" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号：" prop="prop4">
                    <el-input v-model="form.prop4" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="银行卡预留手机号：" prop="prop5">
                    <el-input v-model="form.prop5" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="开户行：" prop="prop6">
                    <el-input v-model="form.prop6" placeholder="请输入姓名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button class="cancel" @click="handleClose">取 消</el-button>
                <el-button class="submit" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="银行卡信息"
            :visible.sync="bankCardDisalogVisible"
            width="480px"
            :before-close="handleCloseBankInfo">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="银行卡号：" prop="prop4" style="margin-bottom: 16px;">
                    <span>{{ form.prop4 }}</span>
                </el-form-item>
                <el-form-item label="开户行：" prop="prop6">
                    <span>{{ form.prop6 }}</span>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button class="cancel" @click="handleCloseBankInfo">取 消</el-button>
                <el-button class="submit" @click="handleSubmitBankInfo">确 定</el-button>
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
                prop1: '',
                prop2: '',
                prop3: '',
                prop4: '',
                prop5: '',
                prop6: '',
            },
            rules: {
                prop1: [{required: true, message: '请输入姓名', trigger: ['change', 'blur']}],
                prop2: [{required: true, message: '请输入身份证号码', trigger: ['change', 'blur']}],
                prop3: [{required: true, message: '请输入银行名称', trigger: ['change', 'blur']}],
                prop4: [{required: true, message: '请输入银行卡号', trigger: ['change', 'blur']}],
                prop5: [{required: true, message: '请输入银行卡预留手机号', trigger: ['change', 'blur']}],
                prop6: [{required: true, message: '请输入开户行', trigger: ['change', 'blur']}],
            },
            bankCardDisalogVisible: false,
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
         * @function handleClose
         */
        handleClose() {
            let form = {
                prop1: '',
                prop2: '',
                prop3: '',
                prop4: '',
                prop5: '',
                prop6: '',
            };
            Object.assign(this.form, form);
            this.$emit('handleClose', false);
        },
        /**
         * 提交银行卡
         * @function handleSubmit
         */
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
				if (valid) {
                    this.bankCardDisalogVisible = true;
				} else {
					return;
				}
			});
        },
        /**
         * 关闭银行卡信息确认弹窗
         * @function handleCloseBankInfo
         */
        handleCloseBankInfo() {
            this.bankCardDisalogVisible = false;
        },
        /**
         * 确认银行卡信息
         */
        handleSubmitBankInfo() {
            this.bankCardDisalogVisible = false;
            this.$emit('handleSubmit', false);
        }
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
                padding: 8px 0 0;
                .el-form {
                    .el-form-item {
                        width: 100%;
                        height: 32px;
                        margin-bottom: 24px;
                        display: inline-block;
                        .el-form-item__label {
                            line-height: 32px;
                            padding: 0;
                        }
                        .el-input {
                            width: 306px;
                            &__inner {
                                height: 32px;
                                border-radius: 2px;
                            }
                        }
                        &__content {
                            height: 32px;
                            line-height: 32px;
                        }
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