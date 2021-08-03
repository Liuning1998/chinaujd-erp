<template>
    <div class="container">
        <breadcrumb></breadcrumb>
        <div class="title">
            <span>对账单信息</span>
            <el-button type="primary" @click="handleExport">导出对账数据</el-button>
        </div>
        <div class="order-info">
            <div class="order-info-item">
                <span class="label">结算订单编号：</span>
                <span class="value">DZ2021070814161234</span>
            </div>
            <div class="order-info-item">
                <span class="label">订单类型：</span>
                <span class="value">结算订单</span>
            </div>
            <div class="order-info-item">
                <span class="label">订单状态：</span>
                <span class="value">待结算</span>
            </div>
            <div class="order-info-item">
                <span class="label">审核状态：</span>
                <span class="value">待审核</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算时间段：</span>
                <span class="value">2021.06.01~2021.06.30</span>
            </div>
            <div class="order-info-item">
                <span class="label">创建时间：</span>
                <span class="value">2021.06.01</span>
            </div>
            <div class="order-info-item">
                <span class="label">收入金额：</span>
                <span class="value">¥10000</span>
            </div>
            <div class="order-info-item">
                <span class="label">支出金额：</span>
                <span class="value">¥10000</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算金额：</span>
                <span class="value">¥10000</span>
            </div>
            <div class="order-info-item">
                <span class="label">创建人：</span>
                <span class="value">张三</span>
            </div>
            <div class="order-info-item">
                <span class="label">审核人：</span>
                <span class="value">张三</span>
            </div>
            <div class="order-info-item">
                <span class="label">审核时间：</span>
                <span class="value">2021.06.01</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算人：</span>
                <span class="value">张三</span>
            </div>
            <div class="order-info-item">
                <span class="label">结算时间：</span>
                <span class="value">2021.06.01</span>
            </div>
        </div>
        <div class="order-detail">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单明细" name="order">
                    <order-detail></order-detail>
                </el-tab-pane>
                <el-tab-pane label="结算明细" name="settle">
                    <settle-detail></settle-detail>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
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
        }
    },
    methods: {
        /**
         * 导出对账数据
         * @function handleExport
         */
        handleExport() {},
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
    }
</style>