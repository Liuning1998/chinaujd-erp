<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="title">
            <span>对账单信息</span>
            <!-- <el-button @click="handleExport">导出对账数据</el-button> -->
        </div>
        <div class="order-info">
            <div class="order-info-item">
                <span class="label">对账订单编号：</span>
                <span class="value">{{ orderInfo.id }}</span>
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
                <span class="label">对账状态：</span>
                <span class="value">{{ orderInfo.status }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">对账时间段：</span>
                <span class="value">{{ orderInfo.startTime }}~{{ orderInfo.endTime }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">创建时间：</span>
                <span class="value">{{ orderInfo.gmtCreate }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">收入金额：</span>
                <span class="value">￥{{ orderInfo.incomeAmount || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">支出金额：</span>
                <span class="value">￥{{ orderInfo.expensesAmount || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">异常未处理金额：</span>
                <span class="value">￥{{ orderInfo.exceptionUnprocessedAmount || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">异常挂起金额：</span>
                <span class="value">￥{{ orderInfo.exceptionHangAmount || '0.00' }}</span>
            </div>
            <div class="order-info-item">
                <span class="label">创建人：</span>
                <span class="value">{{ orderInfo.createUser }}</span>
            </div>
        </div>
        <div class="order-detail">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="订单明细" name="order">
                    <order-detail :table-data="orderInfo.rconciliationOrderAssociateList"></order-detail>
                </el-tab-pane>
                <el-tab-pane label="对账明细" name="record">
                    <record-detail :table-data="orderInfo.rconciliationDetailList"></record-detail>
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
import Breadcrumb from '@/components/Breadcrumb';
import OrderDetail from '@/views/finance/orderRecord/components/OrderDetail';
import RecordDetail from '@/views/finance/orderRecord/components/RecordDetail';

import {
    POST_FINANCE_SLIP_RECONCATION_INFO,
    POST_FINANCE_SLIP_INFO,
    POST_EXPORT_FINANCE_SLIP_EXPORT,
} from '@/api/request';

export default {
    components: {
        Breadcrumb,
        OrderDetail,
        RecordDetail,
    },
    data() {
        return {
            activeName: 'order',
            currentPage: 0,
            pageSize: 15,
            total: 0,
            orderInfo: {
                rconciliationOrderAssociateList: [],
                rconciliationDetailList: [],
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取对账单详情
         * @function getData
         * @params {Number} id
         */
        getData() {
            let params = {
                id: this.$route.query.id,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            };
            let post_interface = this.activeName === 'order' ? POST_FINANCE_SLIP_RECONCATION_INFO : POST_FINANCE_SLIP_INFO;
            post_interface(params).then(res => {
                res.data.orderType = JSON.parse(res.data.orderType).desc;
                res.data.orderStatus = JSON.parse(res.data.orderStatus).desc;
                res.data.status = JSON.parse(res.data.status).desc;
                Object.assign(this.orderInfo, res.data);
                this.total = res.data.total;
            });
        },
        /**
         * 导出对账数据
         * @function handleExport
         */
        handleExport() {
            let params = {
                id: this.$route.query.id
            };
            POST_EXPORT_FINANCE_SLIP_EXPORT(params).then(res => {
                const blob = new Blob([res], {
                    type: 'application/vnd.ms-excel;charset=utf-8'
                });
                let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`
                const file_name = `对账单${curDate}.xls`;
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, file_name);
                } else {
                    const aLink = document.createElement('a');
                    aLink.href = URL.createObjectURL(blob);
                    aLink.setAttribute('download', file_name);
                    aLink.click();
                    window.URL.revokeObjectURL(blob);
                }
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
            height: 184px;
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
                    width: 126px;
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