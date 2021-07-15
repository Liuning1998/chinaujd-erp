<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="title">
            <span>对账单信息</span>
            <el-button type="primary">导出对账数据</el-button>
        </div>
        <div class="order_info">
            <div class="left">
                <span>订单编号 1111</span>
                <span>订单编号 1111</span>
                <span>订单编号 1111</span>
                <span>订单编号 1111</span>
                <span>订单编号 1111</span>
                <span>订单编号 1111</span>
            </div>
            <div class="right">
                <span>订单类型 22222</span>
                <span>订单类型 22222</span>
                <span>订单类型 22222</span>
                <span>订单类型 22222</span>
                <span>订单类型 22222</span>
            </div>
        </div>
        <div class="order_detail">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单明细" name="order">
                    <order-detail></order-detail>
                </el-tab-pane>
                <el-tab-pane label="对账明细" name="record">
                    <record-detail></record-detail>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import OrderDetail from '@/views/finance/orderRecord/components/OrderDetail';
import RecordDetail from '@/views/finance/orderRecord/components/RecordDetail';

export default {
    components: {
        Breadcrumb,
        OrderDetail,
        RecordDetail,
    },
    data() {
        return {
            activeName: 'order',
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>

</style>