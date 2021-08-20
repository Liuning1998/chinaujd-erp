<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="search">
            <div class="search-item text-align-left">
                <span>订单状态：</span>
                <el-select v-model="form.orderStatus" placeholder="请输入" @change="handleChangeOrderStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="item in orderStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item text-align-center">
                <span>对账状态：</span>
                <el-select v-model="form.status" placeholder="请输入">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="item in status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item text-align-end">
                <span>对账时间段：</span>
                <el-date-picker
                    v-model="form.time"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div class="btns">
                <el-button @click="handleSearch">查询</el-button>
                <el-button @click="handleAddOrder">新增对账单</el-button>
                <el-button @click="handleAllSettle">申请结算</el-button>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    width="170"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    width="100"
                    label="账单时间段">
                    <template slot-scope="scope">
                        {{ scope.row.startTime }}~{{ scope.row.endTime }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="收入金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.incomeAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="支出金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.expensesAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="收支净额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.incomeExpenditure }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="订单状态">
                    <template slot-scope="scope">
                        {{ orderStatus.find(item => item.value === scope.row.orderStatus).label }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="80"
                    label="对账状态">
                    <template slot-scope="scope">
                        {{ orderStatus.find(item => item.value === scope.row.status).label }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="异常未处理金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.exceptionUnprocessedAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="110"
                    label="异常挂起金额">
                    <template slot-scope="scope">
                        ¥{{ scope.row.exceptionHangAmount }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="240"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                        <el-divider
                            v-if="Number(scope.row.orderStatus) === 0 && Number(scope.row.status) === 1"
                            direction="vertical"></el-divider>
                        <el-button
                            v-if="Number(scope.row.orderStatus) === 0 && Number(scope.row.status) === 1"
                            type="text" @click="handleRefund(scope.row)">对账</el-button>
                        <el-divider
                            v-if="Number(scope.row.orderStatus) === 0 && Number(scope.row.status) === 1 ||
                            ([1, 5, 6].includes(Number(scope.row.orderStatus)) && Number(scope.row.status) === 2)"
                            direction="vertical"></el-divider>
                        <el-button
                            v-if="Number(scope.row.orderStatus) === 0 && Number(scope.row.status) === 1 ||
                            ([1, 5, 6].includes(Number(scope.row.orderStatus)) && Number(scope.row.status) === 2)"
                            type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-divider
                            v-if="[1, 5, 6].includes(Number(scope.row.orderStatus)) && Number(scope.row.status) === 2"
                            direction="vertical"></el-divider>
                        <el-button
                            v-if="[1, 5, 6].includes(Number(scope.row.orderStatus)) && Number(scope.row.status) === 2"
                            type="text" @click="handleSettle(scope.row.id)">结算</el-button>
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
        <el-dialog
            title="新增对账单"
            width="480px"
            class="add-dialog"
            :visible.sync="addOrderDialogVisible"
            :before-close="addOrderDialogBeforeClose">
            <div class="add-dialog-item">
                <span>对账时段：</span>
                <el-date-picker
                    v-model="addOrderForm.time"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div class="add-dialog-item">
                <span>对账方式：</span>
                <div class="btns">
                    <span
                        :class="addOrderForm.type === item.value ? 'select-btns' : null"
                        v-for="(item, index) in orderCycle" :key="index"
                        @click="handleSelectOrderCycle(index)">
                        {{ item.label }}
                    </span>
                </div>
            </div>
            <div slot="footer">
                <el-button @click="handleAddOrderSubmit">生成对账单</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="订单结算申请"
            width="640px"
            class="settle-dialog"
            :visible.sync="settleDialogVisible"
            :before-close="settleDialogBeforeClose">
            <div>
                <el-table
                    ref="materialTable"
                    :data="settleTableData"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        align="center"
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="id"
                        label="订单编号">
                    </el-table-column>
                     <el-table-column
                        align="center"
                        label="账单时间段">
                        <template slot-scope="scope">
                            {{ scope.row.startTime }}~{{ scope.row.endTime}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        align="center"
                        label="收入金额">
                        <template slot-scope="scope">
                            ¥{{ scope.row.incomeAmount }}
                        </template>
                    </el-table-column>
                     <el-table-column
                        align="center"
                        label="支出金额">
                        <template slot-scope="scope">
                            ¥{{ scope.row.expensesAmount }}
                        </template>
                    </el-table-column>
                     <el-table-column
                        align="center"
                        label="收支净额">
                        <template slot-scope="scope">
                            ¥{{ scope.row.incomeExpenditure }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="settleDialogBeforeClose">取 消</el-button>
                <el-button @click="handleSettleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    POST_FINANCE_SLIP_ADD,
    POST_FINANCE_SLIP_LIST,
    POST_FINANCE_SLIP_DELETE,
    POST_FINANCE_SLIP_SETTLEMENT_SAVE,
    POST_FINANCE_SLIP_SETTLEMENT_LIST,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';

export default {
    components: {
        Breadcrumb
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            form: {
                orderStatus: '',
                status: '',
                time: ['', ''],
            },
            addOrderForm: {
                type: null,
                time: ['', ''],
            },
            orderStatus: [
                {label: '对账中', value: 0},
                {label: '待结算', value: 1}
            ],
            status: [],
            multipleSelection: [],
            tableData: [],
            settleTableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 15,
            addOrderDialogVisible: false,
            settleDialogVisible: false,
            orderCycle: [
                {label: '全部', value: 0},
                {label: '周', value: 1},
                {label: '月', value: 2},
                {label: '年', value: 3},
            ],
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
                startTime: this.form.time[0],
                endTime: this.form.time[1],
                orderStatus: this.form.orderStatus,
                status: this.form.status
            }
            POST_FINANCE_SLIP_LIST(params).then(res => {
                res.data.forEach(item => {
                    item.orderStatus = JSON.parse(item.orderStatus).value;
                    item.status = JSON.parse(item.status).value;
                });
                this.tableData = res.data.rows;
                this.total = Number(res.data.total);
            });
        },
        /**
         * 更改订单状态
         * @function handleChangeOrderStatus
         */
        handleChangeOrderStatus(val) {
            this.form.status = '';
            if (val === '') {
                this.status = [];
            }
            if (val === 0) {
                this.status = [
                    {label: '未平账', value: 1}
                ];
            }
            if (val === 1) {
                this.status = [
                    {label: '已平账', value: 2}
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
         * 新增对账单
         * @function handleAddOrder
         */
        handleAddOrder() {
            this.addOrderDialogVisible = true;
        },
        /**
         * 申请结算
         * @function handleAllSettle
         */
        handleAllSettle() {
            let params = {
                id: null,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }
            POST_FINANCE_SLIP_SETTLEMENT_LIST(params).then(() => {
                this.settleDialogVisible = true;
                this.settleTableData = res.data.rows;
            });
        },
        /**
         * 查看订单
         * @function handleScan
         * @parsms {Object} data 订单详情
         */
        handleScan(data) {
            // TODO: 更换订单详情页
            this.$router.push('/finance/record/detail');
        },
        /**
         * 订单退款
         * @function handleRefund
         * @params {Object} data 订单详情
         */
        handleRefund(data) {
            this.$router.push({
                path: '/finance/record/detail',
                query: {
                    id: data.id
                }
            });
        },
        /**
         * 删除订单
         * @function handleDelete
         * @params {Object} data 订单详情
         */
        handleDelete(id) {
            this.$confirm('您确认要删除该对账单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                let params = {
                    id
                };
                let value = JSON.parse(data.orderStatus).value;
                if ([2, 3, 4, 5, 6].includes(value)) {
                    this.$message.warning('该对账单已结算');
                    return;
                }
                POST_FINANCE_SLIP_DELETE(params).then(() => {
                    this.$message.success('已删除');
                });
            }).catch(() => {});
        },
        /**
         * 订单结算
         * @function handleSettle
         * @params {Object} data 订单详情
         */
        handleSettle(id) {
            this.$confirm('您确认要结算该对账单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                let value = JSON.parse(data.orderStatus).value;
                if ([0].includes(value)) {
                    this.$message.success('订单未对账，不可结算');
                    return;
                }
                let params = {
                    shipIdList: [id]
                }
                POST_FINANCE_SLIP_SETTLEMENT_SAVE(params).then(() => {
                    this.$message.warning('已提交');
                });
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
        /**
         * 关闭新增对账单弹窗
         * @function addOrderDialogBeforeClose
         */
        addOrderDialogBeforeClose() {
            this.addOrderDialogVisible = false;
            let obj = {
                type: null,
                time: ['', ''],
            };
            Object.assign(this.addOrderForm, obj);
        },
        /**
         * 生成对账单
         * @function handleAddOrderSubmit
         */
        handleAddOrderSubmit() {
            let {time: [startTime = '', endTime = ''], type = ''} = this.addOrderForm;

            if (!startTime || !endTime) {
                this.$message.warning('请选择对账时段');
                return;
            }
            if (!type) {
                this.$message.warning('请选择对账方式');
                return;
            }
            let params = {
                endTime,
                startTime,
                type
            };
            POST_FINANCE_SLIP_ADD(params).then(() => {
                this.$message.success('已生成对账单');
                this.getData();
                this.addOrderDialogVisible = false;
                let obj = {
                    type: null,
                    time: ['', ''],
                };
                Object.assign(this.addOrderForm, obj);
            });
        },
        /**
         * 关闭订单结算申请弹窗
         * @function settleDialogBeforeClose
         */
        settleDialogBeforeClose() {
            this.settleDialogVisible = false;
            // 清空选择
            this.$refs.materialTable.clearSelection();
        },
        /**
         * 申请结算
         * @function handleSettleSubmit
         */
        handleSettleSubmit() {
            this.settleDialogVisible = false;
            // 清空选择
            this.$refs.materialTable.clearSelection();
            // this.$message.success('已申请');
            this.getData();
        },
        /**
         * 选择申请结算的订单
         * @function handleSelectionChange
         * @params {Array} val
         */
        handleSelectionChange(val) {
            this.multipleSelection = val.map(item => item.id);
        },
        /**
         * 选择对账方式 周/月/年/自定义
         * @function handleSelectOrderCycle
         * @params {Number} index 下标
         */
        handleSelectOrderCycle(index) {
            this.addOrderForm.type = this.orderCycle[index].value;
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        .search {
            width: 100%;
            height: 128px;
            background: #fff;
            border-radius: 2px;
            padding: 24px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            &-item {
                width: 30%;
                height: 32px;
                margin-bottom: 16px;
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
                    .el-icon-date {
                        line-height: 32px;
                    }
                }
                >>>.el-date-editor--datetimerange {
                    width: 340px;
                    height: 32px;
                    padding: 0 2px;
                    border-radius: 2px;
                }
            }
            .text-align-left {
                text-align: left;
            }
            .text-align-center {
                text-align: center;
            }
            .text-align-end {
                width: 40%;
                text-align: end;
            }
            .btns {
                width: 100%;
                text-align: end;
                >>>.el-button {
                    height: 32px;
                    background: #1890FF;
                    border-radius: 2px;
                    border: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    font-weight: 100;
                    color: #FFFFFF;
                    padding: 5px 12px;
                }
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
        .add-dialog {
            >>>.el-dialog {
                border-radius: 4px;
            }
            &-item {
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                span {
                    width: 70px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                }
                .btns {
                    width: 360px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        width: 64px;
                        height: 22px;
                        line-height: 22px;
                        background: #F5F5F5;
                        border: 1px solid #D9D9D9;
                        border-radius: 2px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        text-align: center;
                        cursor: pointer;
                    }
                    .select-btns {
                        background: #FFFFFF;
                        border: 1px solid #1890FF;
                        color: #1890FF;
                    }
                }
                >>>.el-date-editor--datetimerange {
                    width: 360px;
                    height: 32px;
                    padding: 0 10px;
                    border-radius: 2px;
                }
            }
            >>>.el-dialog__header {
                padding: 16px 24px;
                .el-dialog__title {
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333333;
                }
            }
            >>>.el-dialog__body {
                padding: 8px 24px 0;
            }
            >>>.el-dialog__footer {
                padding: 0 24px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                .el-button {
                    width: 102px;
                    height: 32px;
                    line-height: 32px;
                    background: #1890FF;
                    border-radius: 2px;
                    color: #fff;
                    padding: 0;
                    border: 0;
                }
            }
        }
        .settle-dialog {
            >>>.el-dialog {
                border-radius: 4px;
            }
            >>>.el-dialog__header {
                padding: 16px 24px;
                .el-dialog__title {
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333333;
                }
            }
            >>>.el-dialog__body {
                padding: 8px 24px 0;
            }
            >>>.el-dialog__footer {
                padding: 24px;
                .el-button {
                    width: 65px;
                    height: 32px;
                    line-height: 32px;
                    background: #1890FF;
                    border-radius: 2px;
                    color: #fff;
                    padding: 0;
                    border: 0;
                }
                .cancel {
                    background: #FFFFFF;
                    border: 1px solid #D9D9D9;
                    color: #666;
                }
            }
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
    }
</style>