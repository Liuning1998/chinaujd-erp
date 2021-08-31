<template>
    <div class="container">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="序号"
                type="index">
            </el-table-column>
            <el-table-column
                prop="orderNumber"
                label="业务订单编号">
            </el-table-column>
            <el-table-column
                prop="bindingPhone"
                label="用户手机号">
            </el-table-column>
            <el-table-column
                label="服务类型">
                <template slot-scope="scope">
                    {{ scope.row.serviceType ? (serviceType.find(item => item.value === scope.row.serviceType)).label : ''}}
                </template>
            </el-table-column>
            <el-table-column
                label="鉴评方式">
                <template slot-scope="scope">
                    {{ scope.row.evalMethod ? (evaluateType.find(item => item.value === scope.row.evalMethod)).label : ''}}
                </template>
            </el-table-column>
            <el-table-column
                label="订单类型">
                <template slot-scope="scope">
                    {{ scope.row.orderMainType ? (orderType.find(item => item.value === scope.row.orderMainType)).label : ''}}
                </template>
            </el-table-column>
            <el-table-column
                label="订单金额">
                <template slot-scope="scope">
                    ¥ {{ scope.row.orderMainAmount || '0' }}
                </template>
            </el-table-column>
            <el-table-column
                label="订单状态">
                <template slot-scope="scope">
                    {{ scope.row.orderMainStatus ? (orderStatus.find(item => item.value === scope.row.orderMainStatus)).label : ''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="创建时间">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row.orderNumber)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            abnormalDialogVisible: false,
            orderStatus: [
                {label: '对账中', value: 1},
                {label: '待结算', value: 2},
                {label: '待审核', value: 3},
                {label: '待付款', value: 4},
                {label: '已结算', value: 5},
                {label: '已拒绝', value: 6},
                {label: '已关闭', value: 7},
                {label: '已提交', value: 8},
                {label: '处理中', value: 9},
                {label: '已到账', value: 10},
            ],
            evaluateType: [
                {label: '远程鉴评', value: 1},
                {label: '批量鉴评', value: 2},
                {label: '核验', value: 3},
            ],
            serviceType: [
                {label: '采集+鉴别', value: 1},
                {label: '采集+评级', value: 2},
                {label: '采集+鉴别+封装', value: 3},
                {label: '采集+评级+封装', value: 4},
                {label: '核验', value: 5},
            ],
            orderType: [
                {label: '售后订单', value: 1},
                {label: '结算订单', value: 2},
                {label: '提现订单', value: 3},
            ],
        }
    },
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
        /**
         * 查看订单详情
         * @function handleScan
         */
        handleScan(orderNumber) {
            // TODO: 跳转至业务订单详情界面
            this.$router.push({
                path: '',
                query: {
                    orderNumber
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        >>>.el-table {
            padding: 16px 24px 0 24px;
            border-radius: 2px;
            background: #fff;
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
</style>