<template>
    <div class="container">
        <el-dialog
            title="添加银行卡"
            :visible.sync="dialogVisible"
            width="480px"
            :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="姓名：" prop="cardholderName">
                    <el-input v-model="form.cardholderName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码：" prop="idCard">
                    <el-input v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
                <el-form-item label="银行名称：" prop="bankName">
                    <el-input v-model="form.bankName" placeholder="请输入银行名称"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号：" prop="cardNumber">
                    <el-input v-model="form.cardNumber" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
                <el-form-item label="银行卡预留手机号：" prop="cardMobile">
                    <el-input v-model="form.cardMobile" placeholder="请输入银行卡预留手机号"></el-input>
                </el-form-item>
                <el-form-item label="开户行：" prop="openingBank">
                    <el-cascader
                        v-model="form.openingBank"
                        :options="options"
                        @expand-change="handleChange">
                    </el-cascader>
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
                <el-form-item label="银行卡号：" style="margin-bottom: 16px;">
                    <span>{{ form.cardNumber }}</span>
                </el-form-item>
                <el-form-item label="开户行：">
                    <span>{{ form.openingBank.length === 3 ? form.openingBank[2] : '' }}</span>
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
import {
    POST_BASE_QUERY_PROVINCE_CITY_LIST,
    POST_FINANCE_SLIP_OPENBANK_LIST,
    POST_FINANCE_SLIP_ADD_BANKCARD,
} from '@/api/request';

export default {
    name: '',
    data() {
        return {
            form: {
                cardholderName: '',
                idCard: '',
                bankName: '',
                cardNumber: '',
                cardMobile: '',
                openingBank: '',
            },
            rules: {
                cardholderName: [{required: true, message: '请输入姓名', trigger: ['change', 'blur']}],
                idCard: [{required: true, message: '请输入身份证号码', trigger: ['change', 'blur']}],
                bankName: [{required: true, message: '请输入银行名称', trigger: ['change', 'blur']}],
                cardNumber: [{required: true, message: '请输入银行卡号', trigger: ['change', 'blur']}],
                cardMobile: [{required: true, message: '请输入银行卡预留手机号', trigger: ['change', 'blur']}],
                openingBank: [{required: true, message: '请输入开户行', trigger: ['change', 'blur']}],
            },
            bankCardDisalogVisible: false,
            options: [],
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            default: ''
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 查询省市集合
         * @function getData
         */
        getData() {
            POST_BASE_QUERY_PROVINCE_CITY_LIST().then(res => {
                res.data.forEach(item => {
                    item.cityList.forEach(city => {
                        city.value = city.cityName;
                        city.label = city.cityName;
                        city.children = [];
                    });
                    item.children = item.cityList;
                    item.value = item.provinceName;
                    item.label = item.provinceName;
                });
                this.options = res.data;
            });
        },
        /**
         * 关闭弹窗
         * @function handleClose
         */
        handleClose() {
            let form = {
                cardholderName: '',
                idCard: '',
                bankName: '',
                cardNumber: '',
                cardMobile: '',
                openingBank: '',
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
                    console.log(this.form.openingBank);
                    this.bankCardDisalogVisible = true;
				} else {
					return;
				}
			});
        },
        /**
         * 选择开户行
         */
        handleChange(val) {
            let [provinceName = '', cityName = ''] = val;
            let {bankName = ''} = this.form;
            let params = {
                provinceName,
                cityName,
                bankName
            };
            POST_FINANCE_SLIP_OPENBANK_LIST(params).then(res => {
                res.data.forEach(item => {
                    item.value = item.openingBank;
                    item.label = item.openingBank;
                });
                this.options.forEach(item => {
                    if (item.value === provinceName) {
                        item.children.forEach(city => {
                            if(city.value === cityName) {
                                city.children = res.data;
                            }
                        });
                    }
                });
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
            let [provinceName = '', cityName = '', openingBank = ''] = this.form.openingBank;
            let params = {
                bankName: this.form.bankName,
                cardMobile: this.form.cardMobile,
                cardNumber: this.form.cardNumber,
                cardholderName: this.form.cardholderName,
                cityName,
                idCard: this.form.idCard,
                openingBank,
                projectCategory: 'NUMBER_TRADE',
                provinceName,
                type: 1,
                userId: this.userId
            };
            POST_FINANCE_SLIP_ADD_BANKCARD(params).then(() => {
                this.$message.success('添加成功');
                this.$emit('handleSubmit', false);
            });
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