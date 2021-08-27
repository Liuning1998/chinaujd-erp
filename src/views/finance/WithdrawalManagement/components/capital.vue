<template>
    <div class="container">
        <div class="capital-type">
            <span>资金类型：</span>
            <el-select v-model="flagType" placeholder="" @change="handleChange">
                <el-option label="全部" :value="2"></el-option>
                <el-option
                    v-for="item in flagTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="capital-info">
            <div class="capital-info-item" v-for="(item, index) in tableData" :key="item.historyId">
                <img v-if="item.flag === 1" src="~@/assets/images/finance/icon_appraisal_income.png" alt="鉴定收益">
                <img v-else src="~@/assets/images/finance/icon_cash_out.png" alt="提现">
                <div class="detail">
                    <span class="top">{{ item.flag === 1 ? '鉴定收益' : '提现' }}</span>
                    <div class="bottom">
                        <span class="right">{{ item.showTime }}</span>
                    </div>
                </div>
                <div class="profit">
                    <span class="top">{{ item.trxAmount }}</span>
                    <span class="bottom">{{ item.showStatus }}<i class="received"></i></span>
                </div>
                <div class="more" v-if="item.flag === 0">
                    <el-button type="text" @click="showMore(index)">查看详情<i :class="item.showMoreIcon"></i></el-button>
                </div>
                <div class="more-info" v-if="item.flag === 0" :class="item.showMoreIcon === 'up' ? 'show' : 'hidden'">
                    <el-row>
                        <el-col :span="8">
                            <span class="label">提现金额：</span>
                            <span>¥ {{ item.form.cashoutAmount }}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">服务费：</span>
                            <span>¥ {{ item.form.procedureAmount }}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">应交税：</span>
                            <span>¥ {{ item.form.personalTax }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <span class="label">提现状态：</span>
                            <span>{{ item.status }}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">申请时间：</span>
                            <span>{{ item.form.gmtCreate }}</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">到账时间：</span>
                            <span>{{ item.form.auditTime }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <span class="label">到账账户：</span>
                            <span>{{ item.form.bankName }}</span>
                            <span v-if="item.form.cardNumber">（{{ (item.form.cardNumber).substring(item.form.cardNumber.length - 4) }}）</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
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
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_QUERY_ACCOUNT_HISTORY,
    POST_FINANCE_SLIP_CASHOUT_INFO,
} from '@/api/request';

export default {
    name: '',
    data() {
        return {
            tableData: [],
            flagType: 2,
            flagTypeOptions: [
                {label: '收入', value: 1},
                {label: '支出', value: 0},
            ],
            total: 0,
            currentPage: 1,
            pageSize: 15,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取资金明细
         * @function getData
         */
        getData() {
            let params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                flagType: this.flagType
            };
            POST_FINANCE_SLIP_QUERY_ACCOUNT_HISTORY(params).then(res => {
                res.historyList.forEach(item => {
                    item.showMoreIcon = '';
                    item.flag = JSON.parse(item.flag).value;
                    if (!item.flag) {
                        item.showMoreIcon = 'down';
                        item.form = {};
                    }
                })
                this.tableData = res.historyList;
                this.total = Number(res.total);
            });
        },
        /**
         * 查看提现详情
         * @function showMore
         * @params {Number} index
         */
        showMore(index) {
            if (this.tableData[index].showMoreIcon === 'down') {
                this.tableData[index].showMoreIcon = 'up';
            } else {
                this.tableData[index].showMoreIcon = 'down';
            }
            let params = {
                cashoutRecId: this.tableData[index].historyId
            }
            this.tableData[index].showMoreIcon === 'up' && POST_FINANCE_SLIP_CASHOUT_INFO(params).then(res => {
                Object.assign(this.tableData[index].form, res.data);
            })
        },
        /**
         * 更改每页条数
         * @function handleSizeChange
         * @params {Number} pageSize
         */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getData();
        },
        /**
         * 更改当前页
         * @function handleCurrentChange
         * @params {Number} currentPage
         */
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
        /**
         * 更改资金类型
         * @function handleChange
         */
        handleChange(val) {
            this.flagType = val;
            this.getData();
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        .capital-type {
            padding: 24px;
            margin-top: 16px;
            background: #FFF;
            >>>.el-select {
                width: 272px;
                .el-input__inner {
                    height: 32px;
                    border: 1px solid #D9D9D9;
                    border-radius: 2px;
                }
                .el-select__caret {
                    line-height: 32px;
                }
            }
        }
        .capital-info {
            padding: 0 24px;
            margin-top: 16px;
            background: #FFF;
            &-item {
                padding: 16px 0;
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                img {
                    width: 48px;
                    height: 48px;
                }
                .detail {
                    margin-left: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .top {
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #333;
                    }
                    .bottom {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #999;
                        .right {
                            margin-left: 8px;
                        }
                    }
                }
                .profit {
                    margin-left: 324px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .top {
                        font-family: PingFangSC-Medium;
                        font-size: 16px;
                        color: #333;
                    }
                    .bottom {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #999;
                        display: flex;
                        align-items: center;
                        i {
                            width: 14px;
                            height: 14px;
                            margin-left: 12px;
                            display: inline-block;
                        }
                        .received {
                            background: url('~@/assets/images/finance/icon_received.png') no-repeat center center;
                        }
                        .account {
                            background: url('~@/assets/images/finance/icon_in_account.png') no-repeat center center;
                        }
                    }
                    .success {
                        color: #1890FF;
                    }
                }
                .more {
                    margin-left: 324px;
                    >>>.el-button {
                        i {
                            width: 12px;
                            height: 12px;
                            margin-left: 8px;
                            display: inline-block;
                        }
                        .down {
                            background: url('~@/assets/images/finance/icon_blue_arrow_down.png') no-repeat center center;
                        }
                        .up {
                            background: url('~@/assets/images/finance/icon_blue_arrow_up.png') no-repeat center center;
                        }
                    }
                }
                .more-info {
                    width: 100%;
                    margin: 24px 0 8px;
                    padding: 16px 24px 0 24px;
                    background: #FAFAFA;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    >>>.el-row {
                        margin-bottom: 16px;
                        .label {
                            width: 70px;
                            display: inline-block;
                            text-align: end;
                        }
                    }
                }
                .show {
                    display: block;
                }
                .hidden {
                    display: none;
                }
            }
            &-item:not(:last-child) {
                border-bottom: 1px solid #E9E9E9;
            }
        }
        .pagination {
            width: 100%;
            height: 64px;
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