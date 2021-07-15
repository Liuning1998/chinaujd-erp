<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                align="center"
                label="结算订单统计">
                <el-table-column
                    prop="prop1"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    prop="prop2"
                    label="结算时间段">
                </el-table-column>
                <el-table-column
                    label="收入金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop3 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="支出金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop4 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="结算金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop5 }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="结算收入分配">
                <el-table-column
                    label="中国集邮有限公司">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop6 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="邮来邮网">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop7 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="代理商（门店）">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop7 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="鉴评师">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop8 }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="结算申请信息">
                <el-table-column
                    prop="prop9"
                    label="审核状态">
                </el-table-column>
                <el-table-column
                    prop="prop10"
                    label="申请人">
                </el-table-column>
                <el-table-column
                    prop="prop11"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="prop12"
                    label="审核人">
                </el-table-column>
                <el-table-column
                    prop="prop13"
                    label="审核时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
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
                    prop10: 10,
                    prop11: 11,
                    prop12: 12,
                    prop13: 13,
                }
            ],
            total: 0,
            currentPage: 0,
            pageSize: 10,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取审核历史数据
         * @Function getData
         */
        getData() {

        },
        /**
         * 查看
         * @Function handleScan
         * @params {Object} data
         */
        handleScan(data) {

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