<template>
    <div class="container">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                align="center">
                <template slot="header" slot-scope="">
                    <div class="header">
                        <span>平台订单对账数据</span>
                        <el-upload action="#" class="btn">
                            <el-button type="text" size="small">点击上传</el-button>
                        </el-upload>
                    </div>
                </template>
                <el-table-column
                    prop="prop1"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="prop2"
                    label="交易时间">
                </el-table-column>
                <el-table-column
                    prop="prop3"
                    label="交易类型">
                </el-table-column>
                <el-table-column
                    prop="prop4"
                    label="交易金额">
                </el-table-column>
            </el-table-column>
            <el-table-column>
                <el-table-column
                    label="每单对账状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.prop5 === 1">
                            <i class="el-icon-success"></i>
                            <span>正常</span>
                        </div>
                        <div v-if="scope.row.prop5 === 2">
                            <i class="el-icon-error"></i>
                            <span>异常未处理</span>
                            <el-button type="text" @click="handleAbnormal">处理</el-button>
                        </div>
                        <div v-if="scope.row.prop5 === 3">
                            <i class="el-icon-info"></i>
                            <span>异常已挂起</span>
                            <el-button type="text" @click="handleAbnormalDetail">详情</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center">
                <template slot="header" slot-scope="">
                    <div class="header">
                        <span>三方账户对账数据</span>
                        <el-upload action="#" class="btn">
                            <el-button type="text" size="small">点击上传</el-button>
                        </el-upload>
                    </div>
                </template>
                <el-table-column
                    prop="prop6"
                    label="交易金额">
                </el-table-column>
                <el-table-column
                    prop="prop7"
                    label="业务类型">
                </el-table-column>
                <el-table-column
                    prop="prop8"
                    label="交易时间">
                </el-table-column>
                <el-table-column
                    prop="prop9"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    prop="prop10"
                    label="交易流水号">
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
        <el-dialog
            title="异常处理"
            :visible.sync="abnormalDialogVisible"
            :before-close="dialogBeforeClose">
            <div></div>
            <div slot="footer">
                <el-button @click="dialogBeforeClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
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
                    prop5: 1,
                    prop6: 6,
                    prop7: 7,
                    prop8: 8,
                    prop9: 9,
                    prop10: 10,
                },
                {
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                    prop4: 4,
                    prop5: 2,
                    prop6: 6,
                    prop7: 7,
                    prop8: 8,
                    prop9: 9,
                    prop10: 10,
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
         * 获取对账明细
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
         * 处理异常弹窗
         * @Function handleAbnormal
         */
        handleAbnormal() {
            this.abnormalDialogVisible = true;
        },
        /**
         * 异常详情
         * @Function handleAbnormalDetail
         */
        handleAbnormalDetail() {},
        /**
         * 关闭异常处理弹窗
         * @Function dialogBeforeClose
         */
        dialogBeforeClose() {
            this.abnormalDialogVisible = false;
        },
        /**
         * 提交异常处理结果
         * @Function handleSubmit
         */
        handleSubmit() {
            this.abnormalDialogVisible = false;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>