<template>
    <div class="container">
        <div class="capital-type">
            <span>资金类型：</span>
            <el-select v-model="capital_type" placeholder="">
                <el-option
                    v-for="item in capitalType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="capital-info">
            <div class="capital-info-item">
                <img src="~@/assets/images/finance/icon_appraisal_income.png" alt="鉴定收益">
                <div class="detail">
                    <span class="top">鉴定收益</span>
                    <div class="bottom">
                        <span class="left">5/5</span>
                        <span class="right">16:30</span>
                    </div>
                </div>
                <div class="profit">
                    <span class="top">+1000</span>
                    <span class="bottom">已到账<i class="received"></i></span>
                </div>
            </div>
            <div class="capital-info-item">
                <img src="~@/assets/images/finance/icon_cash_out.png" alt="提现">
                <div class="detail">
                    <span class="top">提现</span>
                    <div class="bottom">
                        <span class="left">5/5</span>
                        <span class="right">16:30</span>
                    </div>
                </div>
                <div class="profit">
                    <span class="top">+1000</span>
                    <span class="bottom">入账中<i class="account"></i></span>
                </div>
                <div class="more">
                    <el-button type="text" @click="showMore">查看详情<i class="down"></i></el-button>
                </div>
                <div class="more-info">
                    <el-row>
                        <el-col :span="8">
                            <span class="label">提现金额：</span>
                            <span>¥10，000，0</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">服务费：</span>
                            <span>¥10，000，0</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">应交税：</span>
                            <span>¥10，000，0</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <span class="label">提现状态：</span>
                            <span>已成功</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">申请时间：</span>
                            <span>¥10，000，0</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="label">到账时间：</span>
                            <span>¥10，000，0</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <span class="label">到账账户：</span>
                            <span>已成功</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="capital-info-item">
                <img src="~@/assets/images/finance/icon_appraisal_income.png" alt="鉴定收益">
                <div class="detail">
                    <span class="top">鉴定收益</span>
                    <div class="bottom">
                        <span class="left">5/5</span>
                        <span class="right">16:30</span>
                    </div>
                </div>
                <div class="profit">
                    <span class="top">+1000</span>
                    <span class="bottom">已到账</span>
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
export default {
    name: '',
    data() {
        return {
            capital_type: '',
            capitalType: [
                {label: '提现', value: 1},
                {label: '支付', value: 2},
            ],
            capitalInfoImage: {
                'appraisal': {
                    'image': require('../../../../assets/images/finance/icon_appraisal_income.png')
                },
                'cash': {
                    'image': require('../../../../assets/images/finance/icon_cash_out.png')
                }
            },
            total: 0,
            currentPage: 0,
            pageSize: 15,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取资金明细
         * @Function getData
         */
        getData() {},
        /**
         * 查看提现详情
         * @Function showMore
         * @params {Number} index
         */
        showMore(index) {
            // icon 更换class up
        },
        /**
         * 更改每页条数
         * @Function handleSizeChange
         * @params {Number} pageSize
         */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getData();
        },
        /**
         * 更改当前页
         * @Function handleCurrentChange
         * @params {Number} currentPage
         */
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
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