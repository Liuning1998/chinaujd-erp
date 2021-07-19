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
                <span>订单状态：</span>
                <el-select v-model="form.orderStatus" placeholder="">
                    <el-option
                        v-for="item in orderStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>支付状态：</span>
                <el-select v-model="form.paymentStatus" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in paymentStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>鉴评方式：</span>
                <el-select v-model="form.evaluateType" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in evaluateType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item">
                <span>创建时间：</span>
                <el-date-picker
                    v-model="form.createTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div class="search-item">
                <span>支付时间：</span>
                <el-date-picker
                    v-model="form.paymentTime"
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
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="prop"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="prop1"
                    label="用户手机号">
                </el-table-column>
                <el-table-column
                    prop="prop2"
                    label="服务类型">
                </el-table-column>
                <el-table-column
                    prop="prop3"
                    label="鉴评方式">
                </el-table-column>
                <el-table-column
                    prop="prop4"
                    label="订单类型">
                </el-table-column>
                <el-table-column
                    prop="prop5"
                    label="订单状态">
                </el-table-column>
                <el-table-column
                    prop="prop6"
                    label="支付状态">
                </el-table-column>
                <el-table-column
                    prop="prop7"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handleRefund(scope.row)">退款</el-button>
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
                orderNumber: '',
                orderType: 0,
                serviceType: 0,
                orderStatus: 0,
                paymentStatus: 0,
                evaluateType: 0,
                createTime: [],
                paymentTime: []
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
            orderStatus: [
                {label: '已提交', value: 0},
                {label: '待审核', value: 1},
                {label: '待鉴评', value: 2},
                {label: '已驳回', value: 3},
                {label: '封装中', value: 4},
                {label: '已关闭', value: 5},
                {label: '已完成', value: 6},
                {label: '待核验', value: 7},
                {label: '已核验', value: 8},
            ],
            paymentStatus: [
                {label: '未支付', value: 1},
                {label: '已支付', value: 2},
            ],
            evaluateType: [
                {label: '远程鉴评', value: 1},
                {label: '批量鉴评', value: 2},
            ],
            total: 0,
            currentPage: 0,
            pageSize: 10,
            tableData: [
                {
                    prop: 0,
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: 6,
                    prop7: 7,
                },
                {
                    prop: 0,
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: 6,
                    prop7: 7,
                },
                {
                    prop: 0,
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: 6,
                    prop7: 7,
                },
                {
                    prop: 0,
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: 6,
                    prop7: 7,
                },
                {
                    prop: 0,
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: 6,
                    prop7: 7,
                },
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
         * 重置
         * @Function handleReset
         */
        handleReset() {
            let form = {
                orderNumber: '',
                orderType: 0,
                serviceType: 0,
                orderStatus: 0,
                paymentStatus: 0,
                evaluateType: 0,
                createTime: [],
                paymentTime: []
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
        /**
         * 查看订单
         * @Function handleScan
         * @parsms {Object} data 订单详情
         */
        handleScan(data) {

        },
        /**
         * 订单退款
         * @Function handleRefund
         * @params {Object} data 订单详情
         */
        handleRefund(data) {
            this.$confirm('确定申请退款么？', '请选择', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                console.log('退款');
            }).catch(() => {});
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

</style>