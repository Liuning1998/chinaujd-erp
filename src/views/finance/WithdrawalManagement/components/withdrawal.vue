<template>
    <div class="container">
        <div class="account">
            <span>账户可用余额（元）</span>
            <p class="balance">¥{{ num | numFormat }}</p>
        </div>
        <div class="withdrawal">
            <el-form ref="form" :model="withdrawalForm" label-width="84px">
                <el-form-item label="提现金额：">
                    <el-input
                        v-model.trim="withdrawalForm.balance" type="number"
                        placeholder="请输入提现金额"
                        @keydown.native="channelInputLimit"
                        @input="handleInput">
                    </el-input>
                    <el-button @click="handleWithdrawalAll">全部提现</el-button>
                </el-form-item>
                <el-form-item label="到账银行卡：">
                    <el-select
                        v-model="withdrawalForm.bankcard" clearable placeholder="请选择银行卡"
                        @change="handleChangeBankCard">
                        <el-option
                            v-if="!bankCardOptions.length"
                            label="添加银行卡"
                            value="">
                        </el-option>
                        <el-option
                            v-for="item in bankCardOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提现手续费：">
                    <span>¥0.00</span>
                </el-form-item>
                <el-form-item label="个税代缴：">
                    <span>¥0.00</span>
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
            @handleSubmit="handleSubmit"
            @handleClose="handleClose">
        </add-bank-card>
    </div>
</template>

<script>
import addBankCard from '@/views/finance/withdrawalManagement/components/addBankCard';
export default {
    name: '',
    components: {
        addBankCard
    },
    data() {
        return {
            num: '2000000.15',
            withdrawalForm: {
                balance: null,
                bankcard: null
            },
            tipList: [
                {content: '平台提现手续费为2%'},
                {content: '鉴定师提现，由中国集邮有限公司代缴个人所得税'}
            ],
            bankCardOptions: [],
            dialogVisible: false
        }
    },
    created() {},
    filters: {
        numFormat: function (value) {
            if (!value) return '';
            let result = [];
            // [整数, 小数]
            let [integers = '', decimal = ''] = String(value).split('.');
            let reverseInt = integers.split('').reverse();
            for (let i in reverseInt) {
                result.push(reverseInt[i]);
                if ((i + 1)%3 === 0 && Number(i) !== (reverseInt.length - 1)) {
                    result.push(',');
                }
            }
            return decimal ? result.reverse().join('') + '.' + decimal : result.reverse().join('');
        }
    },
    methods: {
        /**
         * 全部提现
         * @Function handleWithdrawal
         */
        handleWithdrawalAll() {
            this.withdrawalForm.balance = this.num;
        },
        /**
         * 提现
         * @Function handleWithdrawal
         */
        handleWithdrawal() {
            if (!this.withdrawalForm.balance) {
                this.$message.warning('请输入提现金额');
                return;
            }
            if (!this.withdrawalForm.bankcard) {
                this.$message.warning('请绑定到账银行卡');
                return;
            }
        },
        /**
         * 提现金额禁止输入e-+
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
         * @Function handleInput
         */
        handleInput(val) {
            // [整数, 小数]
            let [integers = '', decimal = ''] = String(val).split('.');
            if (decimal && decimal.length > 2) {
                this.$message.warning('小数点限制两位');
                this.withdrawalForm.balance = Number(val).toFixed(2);
            }
            if (Number(val) <= 0) {
                this.withdrawalForm.balance = null;
                this.$message.warning('请输入正确金额');
            }
            if (Number(val) > this.num) {
                this.$message.warning('余额不足');
                this.withdrawalForm.balance = null;
            }
        },
        /**
         * 选择银行卡
         * @Function handleChangeBankCard
         */
        handleChangeBankCard(value) {
            if (!value) {
                // TODO: 显示添加银行卡弹窗
                this.dialogVisible = true;
            }
        },
        /**
         * 添加银行卡弹窗的确认
         * @Function handleSubmit
         * @params {Boolean} val true || false
         */
        handleSubmit(val) {
            this.dialogVisible = val;
        },
        /**
         * 添加银行卡弹窗的取消
         * @Function handleClose
         * @params {Boolean} val true || false
         */
        handleClose(val) {
            this.dialogVisible = val;
            this.withdrawalForm.bankcard = null;
        }
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