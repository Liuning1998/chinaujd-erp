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
            <!-- <el-table-column
                label="服务类型">
                <template slot-scope="scope">
                    {{ scope.row.serviceType ? JSON.parse(scope.row.serviceType).desc : ''}}
                </template>
            </el-table-column> -->
            <el-table-column
                label="鉴评方式">
                <template slot-scope="scope">
                    {{ scope.row.evalMethod ? JSON.parse(scope.row.evalMethod).desc : ''}}
                </template>
            </el-table-column>
            <el-table-column
                label="订单类型">
                <template slot-scope="scope">
                    {{ scope.row.orderMainType ? JSON.parse(scope.row.orderMainType).desc : ''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="orderMainAmount"
                label="订单金额">
            </el-table-column>
            <el-table-column
                label="订单状态">
                <template slot-scope="scope">
                    {{ scope.row.orderMainStatus ? JSON.parse(scope.row.orderMainStatus).desc : ''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="prop8"
                label="支付状态">
                <template slot-scope="scope">
                    {{ scope.row.paymentStatus ? JSON.parse(scope.row.paymentStatus).desc : ''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="gmtCreate"
                label="创建时间">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
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
        handleScan() {

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