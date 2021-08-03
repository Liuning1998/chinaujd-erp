<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                align="center"
                label="结算订单统计">
                <el-table-column
                    prop="prop1"
                    width="100"
                    label="结算订单编号">
                </el-table-column>
                <el-table-column
                    prop="prop2"
                    width="100"
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
                    width="100"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="prop12"
                    label="审核人">
                </el-table-column>
                <el-table-column
                    prop="prop13"
                    width="100"
                    label="审核时间">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="60">
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
                    prop3: 132,
                    prop4: 400000,
                    prop5: 511,
                    prop6: 60000,
                    prop7: 70000,
                    prop8: 8000,
                    prop9: '待审核',
                    prop10: '张三',
                    prop11: '2021.06.01',
                    prop12: '李四',
                    prop13: '2021.06.01',
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
         * 获取审核历史数据
         * @function getData
         */
        getData() {

        },
        /**
         * 查看
         * @function handleScan
         * @params {Object} data
         */
        handleScan(data) {
            this.$router.push('/finance/settle/detail');
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
        >>>.el-table {
            padding: 24px 24px 0 24px;
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