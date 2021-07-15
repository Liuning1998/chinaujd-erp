<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="search">
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
                <span>订单状态：</span>
                <el-select v-model="form.orderStatus" placeholder="">
                    <el-option label="已提交" :value="0"></el-option>
                    <el-option
                        v-for="item in orderStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>对账类型：</span>
                <el-select v-model="form.recordType" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in recordType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>订单状态：</span>
                <el-select v-model="form.recordStatus" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in recordStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>对账时间段：</span>
                <el-date-picker
                    v-model="form.time"
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
            <el-button type="primary" @click="handleAddOrder">新增对账单</el-button>
            <el-button type="primary" @click="handleAllSettle">申请结算</el-button>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="prop1"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    prop="prop2"
                    label="账单时间段">
                </el-table-column>
                <el-table-column
                    prop="prop3"
                    label="收入金额">
                </el-table-column>
                <el-table-column
                    prop="prop4"
                    label="支出金额">
                </el-table-column>
                <el-table-column
                    prop="prop5"
                    label="收支净额">
                </el-table-column>
                <el-table-column
                    prop="prop6"
                    label="订单类型">
                </el-table-column>
                <el-table-column
                    prop="prop7"
                    label="订单状态">
                </el-table-column>
                <el-table-column
                    prop="prop8"
                    label="对账状态">
                </el-table-column>
                <el-table-column
                    prop="prop9"
                    label="对账类型">
                </el-table-column>
                <el-table-column
                    prop="prop10"
                    label="异常未处理金额">
                </el-table-column>
                <el-table-column
                    prop="prop11"
                    label="异常挂起金额">
                </el-table-column>
                <el-table-column
                    prop="prop12"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handleRefund(scope.row)">对账</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handleSettle(scope.row)">结算</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination" v-if="total > pageSize">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
            title="新增对账单"
            :visible.sync="addOrderDialogVisible"
            :before-close="addOrderDialogBeforeClose">
            <div>
                <span>对账时间段：</span>
                <el-date-picker
                    v-model="addOrderForm.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div>
                <span>对账方式：</span>
                <div v-for="(item, index) in orderCycle" :key="index">
                    <span @click="handleSelectOrderCycle(index)">{{ item.label }}</span>
                </div>
            </div>
            <div slot="footer">
                <el-button @click="handleAddOrderSubmit">生成对账单</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="订单结算申请"
            center
            :visible.sync="settleDialogVisible"
            :before-close="settleDialogBeforeClose">
            <div>
                <el-table
                    :data="settleTableData"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="prop1"
                        label="订单编号">
                    </el-table-column>
                     <el-table-column
                        align="center"
                        prop="prop2"
                        label="账单时间段">
                    </el-table-column>
                     <el-table-column
                        align="center"
                        prop="prop3"
                        label="收入金额">
                    </el-table-column>
                     <el-table-column
                        align="center"
                        prop="prop4"
                        label="支出金额">
                    </el-table-column>
                     <el-table-column
                        align="center"
                        prop="prop5"
                        label="收支净额">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="handleSettleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';

export default {
    components: {
        Breadcrumb
    },
    data() {
        return {
            form: {
                orderType: 0,
                orderStatus: 0,
                recordType: 0,
                recordStatus: 0,
                time: [],
            },
            addOrderForm: {
                orderCycle: null,
                time: [],
            },
            orderType: [],
            orderStatus: [],
            recordType: [],
            recordStatus: [],
            tableData: [
                {
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: 6,
                    prop7: 7,
                    prop8: 8,
                    prop9: 9,
                    prop10: 10,
                    prop11: 11,
                }
            ],
            settleTableData: [
                {
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                },
                {
                    prop1: 11,
                    prop2: 22,
                    prop3: 33,
                    prop4: 44,
                    prop5: 55,
                },
            ],
            total: 0,
            currentPage: 0,
            pageSize: 10,
            addOrderDialogVisible: false,
            settleDialogVisible: false,
            orderCycle: [
                {label: '周', value: 1},
                {label: '月', value: 2},
                {label: '年', value: 3},
                {label: '自定义', value: 4},
            ],
        }
    },
    created() {
        this.getData();
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
         * 新增对账单
         * @Function handleAddOrder
         */
        handleAddOrder() {
            this.addOrderDialogVisible = true;
        },
        /**
         * 申请结算
         * @Function handleAllSettle
         */
        handleAllSettle() {
            this.settleDialogVisible = true;
        },
        /**
         * 查看订单
         * @Function handleScan
         * @parsms {Object} data 订单详情
         */
        handleScan(data) {
            this.$router.push('/finance/record/detail');
        },
        /**
         * 订单退款
         * @Function handleRefund
         * @params {Object} data 订单详情
         */
        handleRefund(data) {

        },
        /**
         * 删除订单
         * @Function handleDelete
         * @params {Object} data 订单详情
         */
        handleDelete(data) {},
        /**
         * 订单结算
         * @Function handleSettle
         * @params {Object} data 订单详情
         */
        handleSettle(data) {
            this.settleDialogVisible = true;
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
        /**
         * 关闭新增对账单弹窗
         * @Function addOrderDialogBeforeClose
         */
        addOrderDialogBeforeClose() {
            this.addOrderDialogVisible = false;
        },
        /**
         * 生成对账单
         * @Function handleAddOrderSubmit
         */
        handleAddOrderSubmit() {
            this.addOrderDialogVisible = false;
        },
        /**
         * 关闭订单结算申请弹窗
         * @Function settleDialogBeforeClose
         */
        settleDialogBeforeClose() {
            this.settleDialogVisible = false;
        },
        /**
         * 申请结算
         * @Function handleSettleSubmit
         */
        handleSettleSubmit() {
            this.settleDialogVisible = false;
        },
        /**
         * 选择申请结算的订单
         * @Function handleSelectionChange
         * @params {Array} val
         */
        handleSelectionChange(val) {
            console.log(val);
        },
        /**
         * 选择对账方式 周/月/年/自定义
         * @Function handleSelectOrderCycle
         * @params {Number} index 下标
         */
        handleSelectOrderCycle(index) {
            this.addOrderForm.orderCycle = this.orderCycle[index].value;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>