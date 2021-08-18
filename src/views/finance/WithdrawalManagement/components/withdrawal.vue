<template>
    <div class="container">
        <div class="account">
            <span>账户可用余额（元）</span>
            <p class="balance">¥ {{ withdrawalForm.balance | moneyFormat }}</p>
        </div>
        <div class="withdrawal">
            <el-form ref="form" :model="withdrawalForm" label-width="84px">
                <el-form-item label="提现金额：">
                    <el-input
                        v-model.trim="withdrawalForm.cashoutAmount" type="number"
                        placeholder="请输入提现金额"
                        @keydown.native="channelInputLimit"
                        @input="handleInput"
                        @blur="handleBlur">
                    </el-input>
                    <el-button @click="handleWithdrawalAll">全部提现</el-button>
                </el-form-item>
                <el-form-item label="到账银行卡：">
                    <div class="bankcard">
                        <span v-if="!withdrawalForm.cardBagId">请添加银行卡</span>
                        <span v-else>
                            <i class="el-icon-search"></i>
                            <span>{{ withdrawalForm.bankName }}</span>
                            <span>({{ (withdrawalForm.cardNumber).substring(withdrawalForm.cardNumber.length - 4) }})</span>
                        </span>
                    </div>
                    <el-button
                        v-if="!withdrawalForm.cardBagId"
                        class="add-bankcard-btn" type="primary" @click="handleChangeBankCard">
                        <i class="el-icon-plus"></i>添加银行卡
                    </el-button>
                    <el-button v-else type="primary" @click="handleUnbound">解绑</el-button>
                </el-form-item>
                <el-form-item label="提现手续费：">
                    <span>¥ {{ withdrawalForm.procedureAmount || '0.00' }}</span>
                </el-form-item>
                <el-form-item label="个税代缴：">
                    <span>¥ {{ withdrawalForm.personalTax || '0.00' }}</span>
                </el-form-item>
            </el-form>
            <el-button class="withdrawal-btn" @click="handleWithdrawal">提 现</el-button>
        </div>
        <div class="tip">
            <span class="title">温馨提示：</span>
            <div class="tip-list">
                <span v-for="(item, index) in tipList" :key="index">
                    {{ index + 1 }}、{{ item.content }}；
                </span>
            </div>
        </div>
        <add-bank-card
            :dialog-visible="dialogVisible"
            :user-id="withdrawalForm.userId"
            @handleSubmit="handleSubmit"
            @handleClose="handleClose">
        </add-bank-card>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_ACCOUNT_MESSAGE,
    POST_FINANCE_SLIP_CARRY_CASH,
    POST_FINANCE_SLIP_DELETE_BANKCARD,
} from '@/api/request';

import AddBankCard from '@/views/finance/withdrawalManagement/components/AddBankCard';
export default {
    name: '',
    components: {
        AddBankCard
    },
    data() {
        return {
            withdrawalForm: {
                balance: null,
                cashoutAmount: null,
                cardBagId: null,
                procedureAmount: null,
                personalTax: null,
                cardNumber: null,
                bankName: null,
            },
            tipList: [
                {content: '平台提现手续费为2%'},
                {content: '鉴定师提现，由中国集邮有限公司代缴个人所得税'}
            ],
            dialogVisible: false
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取账户信息
         * @function getData
         */
        getData() {
            POST_FINANCE_SLIP_ACCOUNT_MESSAGE().then(res => {
                Object.assign(this.withdrawalForm, res.data);
            });
        },
        /**
         * 全部提现
         * @function handleWithdrawal
         */
        handleWithdrawalAll() {
            let balance = Number(this.withdrawalForm.balance);
            if (!balance) {
                this.$message.warning('余额不足');
                return;
            }
            this.withdrawalForm.cashoutAmount = this.withdrawalForm.balance;
            this.handleBlur();
        },
        /**
         * 提现
         * @function handleWithdrawal
         */
        handleWithdrawal() {
            if (!this.withdrawalForm.cashoutAmount) {
                this.$message.warning('请输入提现金额');
                return;
            }
            if (!this.withdrawalForm.cardBagId) {
                this.$message.warning('请绑定到账银行卡');
                return;
            }
            let params = {
                cardBagId: this.withdrawalForm.cardBagId,
                cashoutAmount: this.withdrawalForm.cashoutAmount,
                personalTax: this.withdrawalForm.personalTax,
                procedureAmount: this.withdrawalForm.procedureAmount,
                projectCategory: 'NUMBER_TRADE'
            }
            POST_FINANCE_SLIP_CARRY_CASH(params).then(() => {
                this.getData();
            })
        },
        /**
         * 提现金额禁止输入e-+
         * @function channelInputLimit
         * @params {Object} e 输入内容
         */
        channelInputLimit (e) {
            let key = e.key;
            if (['e', '-', '+'].includes(key)) {
                e.returnValue = false;
                return false;
            }
            return true;
        },
        /**
         * 监听金额的输入
         * @function handleInput
         */
        handleInput(val) {
            // [整数, 小数]
            let [integers = '', decimal = ''] = String(val).split('.');
            if (decimal && decimal.length > 2) {
                this.$message.warning('小数点限制两位');
                this.withdrawalForm.cashoutAmount = Number(val).toFixed(2);
            }
            if (Number(val) <= 0) {
                this.withdrawalForm.cashoutAmount = null;
                this.$message.warning('请输入正确金额');
            }
            if (Number(val) > this.withdrawalForm.balance) {
                this.$message.warning('余额不足');
                this.withdrawalForm.cashoutAmount = null;
            }
        },
        /**
         * 失去焦点计算手续费、个税
         * 手续费 2%, 个税20%
         * @function handleBlur
         */
        handleBlur() {
            let {cashoutAmount = 0} = this.withdrawalForm;
            this.withdrawalForm.procedureAmount = (cashoutAmount * 0.02).toFixed(2);
            this.withdrawalForm.personalTax = (cashoutAmount * 0.2).toFixed(2);
        },
        /**
         * 选择银行卡
         * @function handleChangeBankCard
         */
        handleChangeBankCard() {
            this.dialogVisible = true;
        },
        /**
         * 添加银行卡弹窗的确认
         * @function handleSubmit
         * @params {Boolean} val true || false
         */
        handleSubmit(val) {
            this.dialogVisible = val;
            this.getData();
        },
        /**
         * 添加银行卡弹窗的取消
         * @function handleClose
         * @params {Boolean} val true || false
         */
        handleClose(val) {
            this.dialogVisible = val;
            this.withdrawalForm.cardBagId = null;
        },
        /**
         * 银行卡解除绑定
         * @function handleUnbound
         */
        handleUnbound() {
            this.$confirm('确认解除银行卡绑定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                let params = {
                    cardBagId: this.withdrawalForm.cardBagId,
                    projectCategory: 'NUMBER_TRADE'
                }
                POST_FINANCE_SLIP_DELETE_BANKCARD(params).then(() => {
                    this.getData();
                    this.$message.success('解绑成功');
                })
            }).catch(() => {});
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        font-family: PingFangSC-Regular;
        .account {
            width: 100%;
            height: 102px;
            background: #FFF;
            margin-top: 16px;
            padding: 24px;
            color: #666;
            box-sizing: border-box;
            span {
                margin-left: 16px;
            }
            .balance {
                font-size: 24px;
                color: #333;
                margin-top: 4px;
            }
        }
        .withdrawal {
            padding: 24px;
            margin-top: 16px;
            background: #FFF;
            >>>.el-form {
                &-item {
                    height: 32px;
                    margin-bottom: 24px;
                    &__label {
                        padding: 0;
                    }
                    &__content {
                        display: flex;
                        align-items: center;
                    }
                    .el-input {
                        width: 272px;
                        .el-input__inner {
                            height: 32px;
                            line-height: 32px;
                            border-radius: 2px;
                        }
                    }
                    .bankcard {
                        width: 272px;
                        height: 32px;
                        line-height: 32px;
                        color: #BFBFBF;
                        padding: 0 15px;
                        border: 1px solid #DCDFE6;
                        overflow: hidden;
                        box-sizing: border-box;
                    }
                    // 隐藏输入框的上下箭头
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                        -o-appearance: none !important;
                        -ms-appearance: none !important;
                        appearance: none !important;
                        margin: 0;
                    }
                    .el-button {
                        width: 88px;
                        height: 32px;
                        line-height: 32px;
                        border: 1px solid #1890FF;
                        border-radius: 2px;
                        color: #1890FF;
                        margin-left: 16px;
                        padding: 0;
                        background: #FFF;
                    }
                    .add-bankcard-btn {
                        width: 114px;
                    }
                }
            }
            &-btn {
                width: 65px;
                height: 32px;
                border-radius: 2px;
                background: #1890FF;
                color: #FFF;
                border: 0;
                padding: 0;
                margin-left: 84px;
            }
        }
        .tip {
            margin-top: 16px;
            padding: 0 24px 20px 24px;
            font-size: 14px;
            color: #666;
            &-list {
                margin-top: 16px;
                display: flex;
                flex-direction: column;
                span {
                    margin-bottom: 4px;
                }
            }
        }
    }
</style>