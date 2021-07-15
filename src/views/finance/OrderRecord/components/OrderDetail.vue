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
                prop="prop1"
                label="订单号" >
            </el-table-column>
            <el-table-column
                prop="prop1"
                label="用户手机号" >
            </el-table-column>
            <el-table-column
                prop="prop3"
                label="服务类型" >
            </el-table-column>
            <el-table-column
                prop="prop4"
                label="鉴评方式" >
            </el-table-column>
            <el-table-column
                prop="prop5"
                label="订单类型" >
            </el-table-column>
            <el-table-column
                prop="prop6"
                label="订单金额" >
            </el-table-column>
            <el-table-column
                prop="prop7"
                label="订单状态" >
            </el-table-column>
            <el-table-column
                prop="prop8"
                label="支付状态" >
            </el-table-column>
            <el-table-column
                prop="prop9"
                label="创建时间" >
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
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
export default {
    data() {
        return {
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
                }
            ],
            total: 0,
            pageSize: 10,
            currentPage: 0,
            abnormalDialogVisible: false,
        }
    },
    methods: {
        /**
         * 获取订单明细
         * @Function getData
         */
        getData() {

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
         * 查看订单详情
         * @Function handleScan
         */
        handleScan() {

        },
    }
}
</script>

<style lang="scss" scoped>

</style>