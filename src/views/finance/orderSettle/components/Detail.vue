<template>
    <div class="container">
        <breadcrumb></breadcrumb>
        <div class="title">
            <span>对账单信息</span>
            <!-- <el-button type="primary" @click="handleExport">导出对账数据</el-button> -->
        </div>
        <div class="order-info">
            <div class="order-info-item">
                <span class="label">结算订单编号：</span>
                <span class="value">{{ orderInfo.settlementId }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">订单类型：</span>
                <span class="value">{{ orderInfo.orderType }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">订单状态：</span>
                <span class="value">{{ orderInfo.orderStatus }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">审核状态：</span>
                <span class="value">{{ orderInfo.examineStatus }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算时间段：</span>
                <span class="value">{{ orderInfo.startTime | dateFormat2 }}~{{ orderInfo.endTime | dateFormat2 }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">创建时间：</span>
                <span class="value">{{ orderInfo.gmtCreate | dateFormat2 }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">收入金额：</span>
                <span class="value">¥ {{ orderInfo.incomeAmount || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">支出金额：</span>
                <span class="value">¥ {{ orderInfo.expensesAmount || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算金额：</span>
                <span class="value">¥ {{ orderInfo.incomeExpenditure || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">创建人：</span>
                <span class="value">{{ orderInfo.applyUserName }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">审核人：</span>
                <span class="value">{{ orderInfo.examineUserName }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">审核时间：</span>
                <span class="value">{{ orderInfo.examineDatetime | dateFormat2 }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算人：</span>
                <span class="value">{{ orderInfo.settlementUserName }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算时间：</span>
                <span class="value">{{ orderInfo.settlementDatetime | dateFormat2 }}</span>
            </div>
        </div>
        <div class="order-detail">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="订单明细" name="order">
                    <order-detail :table-data="orderInfo.rows"></order-detail>
                </el-tab-pane>
                <el-tab-pane label="利润分配" name="profit">
                    <settle-detail :table-data="orderInfo.rows"></settle-detail>
                </el-tab-pane>
            </el-tabs>
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
    POST_FINANCE_SLIP_SETTLEMENT_VIEW,
    POST_FINANCE_SLIP_ORDER_VIEW,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
import OrderDetail from '@/views/finance/orderSettle/components/OrderDetail';
import SettleDetail from '@/views/finance/orderSettle/components/SettleDetail';

export default {
    components: {
        Breadcrumb,
        OrderDetail,
        SettleDetail,
    },
    data() {
        return {
            activeName: 'order',
            total: 0,
            currentPage: 1,
            pageSize: 15,
            orderInfo: {
                rows: []
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * @function getData
         */
        getData() {
            this.activeName === 'order' && this.getOrderData();
            this.activeName === 'profit' && this.getProfitData();
        },
        /**
         * 获取对账单详情
         * @function getData
         */
        getOrderData() {
            let params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                settlementId: this.$route.query.settlementId
            };
            POST_FINANCE_SLIP_ORDER_VIEW(params).then(res => {
                res.examineStatus = JSON.parse(res.examineStatus).desc;
                Object.assign(this.orderInfo, res);
                this.total = Number(res.total);
            })
        },
        /**
         * 获取对账单详情
         * @function getData
         */
        getProfitData() {
            let params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                settlementId: this.$route.query.settlementId
            };
            POST_FINANCE_SLIP_SETTLEMENT_VIEW(params).then(res => {
                res.examineStatus = JSON.parse(res.examineStatus).desc;
                Object.assign(this.orderInfo, res);
                this.total = Number(res.total);
            })
        },
        /**
         * 导出对账数据
         * @function handleExport
         */
        handleExport() {},
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
         * 切换标签
         * @function handleClick
         * @params {} tab
         */
        handleClick(tab) {
            this.activeName = tab.name;
            this.getData();
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        .title {
            width: 100%;
            height: 55px;
            line-height: 55px;
            padding: 0 24px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333;
            border-bottom: 1px solid #E9E9E9;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            >>>.el-button {
                width: 116px;
                height: 32px;
                line-height: 32px;
                background: #1890FF;
                border-radius: 2px;
                color: #fff;
                padding: 0;
                border: 0;
            }
        }
        .order-info {
            width: 100%;
            height: 222px;
            padding: 24px;
            background: #fff;
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            &-item {
                width: 33.33%;
                height: 22px;
                line-height: 22px;
                margin-bottom: 16px;
                .label {
                    width: 98px;
                    display: inline-block;
                    text-align: end;
                }
            }
        }
        .order-detail {
            margin-top: 16px;
            background: #fff;
            border-radius: 2px;
            >>>.el-tabs {
                .el-tabs__header {
                    margin: 0;
                }
                .el-tabs__nav-wrap {
                    padding: 10px 24px 0;
                    .el-tabs__item {
                        font-size: 16px;
                    }
                    .el-tabs__item:first-child{
                        padding: 0 44px 0 0;
                    }
                    .el-tabs__item:last-child {
                        padding: 0 0 0 44px;
                    }
                }
                .el-tabs__nav-wrap::after {
                    height: 1px;
                }
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