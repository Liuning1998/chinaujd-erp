<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                prop="prop1"
                width="180"
                label="对账订单编号">
            </el-table-column>
            <el-table-column
                prop="prop2"
                width="180"
                label="账单时间段">
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
                label="收支净额">
                <template slot-scope="scope">
                    <span>¥{{ scope.row.prop5 }}</span>
                </template>
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
                layout="prev, pager, next, sizes, jumper"
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
                    prop1: 'JS2021070916451234',
                    prop2: '2021.06.01~2021.06.30',
                    prop3: 3,
                    prop4: 4,
                    prop5: 5,
                    prop6: '对账订单',
                    prop7: '待结算',
                    prop8: '已平账',
                }
            ],
            total: 0,
            currentPage: 0,
            pageSize: 15,
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
         * 查看订单
         * @Function handleScan
         * @params {Object} data
         */
        handleScan(data) {
            this.$router.push({
                path: '/finance/record/detail',
                query: {
                    lcp: 1
                }
            });
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
    .container {
        padding: 24px 24px 0 24px;
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