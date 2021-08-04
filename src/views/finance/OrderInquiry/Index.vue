<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="search">
            <div class="search-item text-align-left">
                <span>订单编号：</span>
                <el-input v-model="form.orderNumber" placeholder="请输入"></el-input>
            </div>
            <div class="search-item text-align-end">
                <span>订单类型：</span>
                <el-select v-model="form.orderMainType" @change="handleChangeOrderType">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in orderType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- <div class="search-item text-align-end">
                <span>服务类型：</span>
                <el-select v-model="form.serviceType">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in serviceType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div> -->
            <div class="search-item text-align-end">
                <span>订单状态：</span>
                <el-select v-model="form.orderMainStatus">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in orderStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item text-align-center">
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
            <div class="search-item text-align-end">
                <span>鉴评方式：</span>
                <el-select v-model="form.evalMethod" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in evaluateType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item" style="width: 38%;">
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
            <div class="search-item" style="width:38%; text-align: center;">
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
            <div class="search-item" style="width: 24%; text-align: end;">
                <el-button class="search-btn" @click="handleSearch">查询</el-button>
                <el-button class="reset-btn" @click="handleReset">重置</el-button>
                <!-- <el-button class="export-btn" @click="handleExport">导出</el-button> -->
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    align="center"
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="orderNumber"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="bindingPhone"
                    label="用户手机号">
                </el-table-column>
                <!-- <el-table-column
                    prop="serviceType"
                    width="130"
                    label="服务类型">
                </el-table-column> -->
                <el-table-column
                    prop="evalMethod"
                    label="鉴评方式">
                </el-table-column>
                <el-table-column
                    prop="orderMainType"
                    label="订单类型">
                </el-table-column>
                <el-table-column
                    label="订单金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.orderMainAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderMainStatus"
                    label="订单状态">
                </el-table-column>
                <el-table-column
                    prop="paymentStatus"
                    width="100"
                    label="支付状态">
                </el-table-column>
                <el-table-column
                    prop="gmtCreate"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                        <!-- 退款第一期不做 -->
                        <!-- <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handleRefund(scope.row)">退款</el-button> -->
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
                layout="prev, pager, next, sizes, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_PAGELIST
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';

export default {
    components: {
        Breadcrumb
    },
    data() {
        return {
            form: {
                orderNumber: '',
                orderMainType: 0,
                orderMainStatus: 0,
                paymentStatus: 0,
                evalMethod: 0,
                createTime: ['', ''],
                paymentTime: ['', '']
            },
            orderType: [
                {label: '售后订单', value: 1},
                {label: '结算订单', value: 2},
                {label: '提现订单', value: 3},
            ],
            serviceType: [
                {label: '采集+鉴别', value: 1},
                {label: '采集+评级', value: 2},
                {label: '采集+鉴别+封装', value: 3},
                {label: '采集+评级+封装', value: 4},
                {label: '核验', value: 5},
            ],
            orderStatus: [],
            paymentStatus: [
                {label: '已支付', value: 1},
            ],
            evaluateType: [
                {label: '远程鉴评', value: 1},
                {label: '批量鉴评', value: 2},
                {label: '核验', value: 3},
            ],
            total: 0,
            currentPage: 0,
            pageSize: 15,
            tableData: [],
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取订单列表
         * @function getData
         * @Params {Object} params 查询条件
         */
        getData() {
            let params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orderNumber: this.form.orderNumber,
                evalMethod: this.form.evalMethod,
                orderMainType: this.form.orderMainType,
                orderMainStatus: this.form.orderMainStatus,
                paymentStatus: this.form.paymentStatus,
                gmtCreateStart: this.form.createTime[0],
                gmtCreateEnd: this.form.createTime[1],
                payTimeStart: this.form.paymentTime[0],
                payTimeEnd: this.form.paymentTime[1]
            };
            POST_FINANCE_SLIP_PAGELIST(params).then(res => {
                res.data.rows.forEach(item => {
                    item.evalMethod = JSON.parse(item.evalMethod).desc;
                    item.orderMainType = JSON.parse(item.orderMainType).desc;
                    item.orderMainStatus = JSON.parse(item.orderMainStatus).desc;
                    item.paymentStatus = JSON.parse(item.paymentStatus).desc;
                });
                this.tableData = res.data.rows;
                this.total = res.data.total;
            });
        },
        /**
         * 更改订单类型
         * @function handleChangeOrderType
         */
        handleChangeOrderType(val) {
            if (val === 0) {
                this.orderStatus = [];
            }
            if (val === 1) {
                this.form.orderMainStatus = 0;
                this.orderStatus = [
                    {label: '售后中', value: 11},
                    {label: '已关闭', value: 7},
                ];
            }
            if (val === 2) {
                this.form.orderMainStatus = 0;
                this.orderStatus = [
                    {label: '对账中', value: 1},
                    {label: '待结算', value: 2},
                    {label: '待审核', value: 3},
                    {label: '待付款', value: 4},
                    {label: '已结算', value: 5},
                    {label: '已拒绝', value: 6},
                    {label: '已关闭', value: 7},
                ];
            }
            if (val === 3) {
                this.form.orderMainStatus = 0;
                this.orderStatus = [
                    {label: '已提交', value: 8},
                    {label: '处理中', value: 9},
                    {label: '已到账', value: 10},
                    {label: '已拒绝', value: 6},
                    {label: '已关闭', value: 7}
                ];
            }
        },
        /**
         * 查询
         * @function handleSearch
         */
        handleSearch() {
            this.getData();
        },
        /**
         * 重置
         * @function handleReset
         */
        handleReset() {
            let form = {
                orderNumber: '',
                orderMainType: 0,
                orderMainStatus: 0,
                paymentStatus: 0,
                evalMethod: 0,
                createTime: ['', ''],
                paymentTime: ['', '']
            };
            this.orderStatus = [];
            Object.assign(this.form, form);
        },
        /**
         * 导出
         * @function handleExport
         * @params {} res 接口返回
         */
        handleExport() {
            const blob = new Blob([res], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`
            const file_name = `订单列表${curDate}.xls`;
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
         * @function handleScan
         * @parsms {Object} data 订单详情
         */
        handleScan(data) {

        },
        /**
         * 订单退款
         * TODO: 第一期暂不做
         * @function handleRefund
         * @params {Object} data 订单详情
         */
        handleRefund(data) {
            this.$confirm('确定申请退款么？', '请选择', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$message.success('退款成功');
            }).catch(() => {});
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
    }
}
</script>

<style lang="scss" scoped>
    .container {
        .search {
            width: 100%;
            height: 176px;
            background: #fff;
            border-radius: 2px;
            padding: 24px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            &-item {
                width: 33.333%;
                height: 32px;
                margin-bottom: 16px;
                span {
                    width: 70px;
                    height: 32px;
                    line-height: 32px;
                }
                >>>.el-input {
                    width: 240px;
                    .el-input__inner {
                        width: 240px;
                        height: 32px;
                        line-height: 32px;
                        border-radius: 2px;
                    }
                    .el-select__caret {
                        line-height: 32px;
                    }
                }
                >>>.el-date-editor--datetimerange {
                    width: 340px;
                    height: 32px;
                    padding: 0 2px;
                    border-radius: 2px;
                }
                >>>.el-button {
                    width: 65px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 2px;
                    padding: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                }
            }
            .text-align-left {
                text-align: left;
            }
            .text-align-end {
                text-align: end;
            }
            .search-btn {
                background: #1890FF;
                border: 0;
                color: #fff;
            }
            .reset-btn {
                background: #fff;
                border: 1px solid #D9D9D9;
                color: #666666;
            }
            .export-btn {
                background: #fff;
                border: 1px solid #1890FF;
                color: #1890FF;
            }
        }
        .table {
            margin-top: 16px;
            padding: 16px 24px 0 24px;
            border-radius: 2px;
            background: #fff;
            >>>.el-table {
                thead {
                    tr>th {
                        height: 54px;
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: rgba(0,0,0,0.85);
                        background: #FAFAFA;
                        border-radius: 4px 4px 0 0;
                    }
                }
                tbody {
                    tr>td {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #666;
                        height: 54px;
                        padding: 0;
                        .el-button--text {
                            color:#1890FF;
                        }
                        .el-divider--vertical {
                            margin: 0 4px;
                            background: #E9E9E9;
                        }
                    }
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