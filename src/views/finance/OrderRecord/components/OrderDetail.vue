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
            tableData: [],
            total: 0,
            pageSize: 15,
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