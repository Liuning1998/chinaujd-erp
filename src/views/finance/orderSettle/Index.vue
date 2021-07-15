<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="search">
            <div class="search-item">
                <span>订单编号：</span>
                <el-input v-model="form.orderNumber"></el-input>
            </div>
            <div class="search-item">
                <span>订单类型：</span>
                <el-select v-model="form.orderType" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in orderType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>服务类型：</span>
                <el-select v-model="form.serviceType" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in serviceType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>申请时间：</span>
                <el-date-picker
                    v-model="form.applyTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div class="search-item">
                <span>申请时间：</span>
                <el-date-picker
                    v-model="form.examineTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
        </div>
         <div class="btns">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleExport">导出</el-button>
        </div>
        <div class="order_detail">
            <el-tabs v-model="activeName">
                <el-tab-pane label="待审核" name="unreview">
                    <unreview></unreview>
                </el-tab-pane>
                <el-tab-pane label="待结算" name="unsettle">
                    <unsettle></unsettle>
                </el-tab-pane>
                <el-tab-pane label="审核历史" name="reviewed">
                    <reviewed></reviewed>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import Unreview from '@/views/finance/orderSettle/components/Unreview';
import Unsettle from '@/views/finance/orderSettle/components/Unsettle';
import Reviewed from '@/views/finance/orderSettle/components/Reviewed';

export default {
    components: {
        Breadcrumb,
        Unreview,
        Unsettle,
        Reviewed
    },
    data() {
        return {
            form: {
                orderNumber: '',
                orderType: 0,
                serviceType: 0,
                applyTime: [],
                examineTime: []
            },
            orderType: [
                {label: '普通订单', value: 1},
                {label: '售后订单', value: 2},
                {label: '结算订单', value: 3},
                {label: '对账订单', value: 4},
            ],
            serviceType: [
                {label: '采集+鉴别', value: 1},
                {label: '采集+评级', value: 2},
                {label: '采集+鉴别+封装', value: 3},
                {label: '采集+评级+封装', value: 4},
                {label: '核验', value: 5},
            ],
            activeName: 'unreview',
        }
    },
    methods: {
        /**
         * 获取订单列表
         * @Function getData
         * @Params {Object} params 查询条件
         */
        getData() {

        },
        /**
         * 查询
         * @Function handleSearch
         */
        handleSearch() {
            this.getData();
        },
        /**
         * 重置
         * @Function handleReset
         */
        handleReset() {
            let form = {
                orderNumber: '',
                orderType: 0,
                serviceType: 0,
                applyTime: [],
                examineTime: []
            };
            Object.assign(this.form, form);
        },
        /**
         * 导出
         * @Function handleExport
         * @params {} res 接口返回
         */
        handleExport() {
            const blob = new Blob([res], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`
            const file_name = `订单明细${curDate}.xls`;
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, file_name);
            } else {
                const aLink = document.createElement('a');
                aLink.href = URL.createObjectURL(blob);
                aLink.setAttribute('download', file_name);
                aLink.click();
                window.URL.revokeObjectURL(blob);
            }
        },
    }
}
</script>

<style lang="scss" scoped>

</style>