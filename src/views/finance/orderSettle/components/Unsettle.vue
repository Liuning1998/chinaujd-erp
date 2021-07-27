<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                align="center"
                label="订单结算统计">
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
                    label="收入笔数">
                    <template slot-scope="scope">
                        <span>{{ scope.row.prop3 }}笔</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="收入金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop4 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="支出笔数">
                    <template slot-scope="scope">
                        <span>{{ scope.row.prop5 }}笔</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="支出金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop6 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="结算金额">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop7 }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="结算收入分配">
                <el-table-column
                    label="中国集邮有限公司">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop8 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="邮来邮网">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop9 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="代理商（门店）">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop10 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="鉴评师">
                    <template slot-scope="scope">
                        <span>¥{{ scope.row.prop11 }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="结算申请信息">
                <el-table-column
                    prop="prop12"
                    label="审核状态">
                </el-table-column>
                <el-table-column
                    prop="prop13"
                    label="申请人">
                </el-table-column>
                <el-table-column
                    prop="prop14"
                    width="100"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    width="150"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDownload(scope.row)">下载</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handlePayment(scope.row)">支付</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-dialog
            title="结算支付"
            width="480px"
            :visible.sync="settleDialogVisible"
            :before-close="handleClose">
            <div class="settle-item">
                <span>结算方式：</span>
                <div class="settle-btns">
                    <span
                        v-for="(item, index) in settleType" :key="index"
                        :class="settleForm.settle_type === item.value ? 'select-btns' : null"
                        @click="handleSelectSettleType(index)">
                        {{ item.label }}
                    </span>
                </div>
            </div>
            <div class="settle-item">
                <span>支付凭证：</span>
                <div class="upload">
                    <el-upload
                        action="#"
                        multiple
                        accept=".jpg,.png,.gif"
                        list-type="picture-card"
                        :file-list="settleForm.fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="handleClose">取 消</el-button>
                <el-button class="submit" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
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
                    prop9: 9000,
                    prop10: 10000,
                    prop11: 11000,
                    prop12: '待审核',
                    prop13: '张三',
                    prop14: '2021.06.01',
                }
            ],
            total: 0,
            currentPage: 0,
            pageSize: 15,
            settleDialogVisible: false,
            settleType: [
                {label: '线上支付', value: 1},
                {label: '线下支付', value: 2}
            ],
            settleForm: {
                settle_type: null,
                fileList: []
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取待结算数据
         * @Function getData
         */
        getData() {

        },
        /**
         * 下载
         * @Function handleDownload
         * @params {Object} data
         */
        handleDownload(data) {
            // res 接口返回
            const blob = new Blob([res], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`;
            const file_name = `待结算订单${curDate}.xls`;
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
         * 支付
         * @Function handlePayment
         * @params {Object} data
         */
        handlePayment(data) {
            this.settleDialogVisible = true;
        },
        /**
         * 查看
         * @Function handleScan
         * @params {Object} data
         */
        handleScan(data) {
            this.$router.push('/finance/settle/detail');
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
         * 取消结算支付
         * @Function handleClose
         */
        handleClose() {
            this.settleDialogVisible = false;
            let obj = {
                settle_type: null,
            };
            Object.assign(this.settleForm, obj);
        },
        /**
         * 结算支付
         * @Function handleSubmit
         */
        handleSubmit() {
            if (!this.settleForm.settle_type) {
                this.$message.warning('请选择结算方式');
                return;
            }
            let obj = {
                settle_type: null,
            };
            this.$message.success('已完成结算');
            Object.assign(this.settleForm, obj);
            this.settleDialogVisible = false;
            this.getData();
        },
        /**
         * 选择结算方式
         * @Function handleSelectSettleType
         * @params {Number} index
         */
        handleSelectSettleType(index) {
            this.settleForm.settle_type = this.settleType[index].value;
        }
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
        >>>.el-dialog__wrapper {
            .el-dialog__header {
                padding: 16px 24px;
                .el-dialog__title {
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333333;
                }
            }
            .el-dialog__body {
                padding: 8px 24px 0;
                .settle-item {
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    >span {
                        width: 70px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333;
                    }
                    .settle-btns {
                        span {
                            width: 88px;
                            height: 22px;
                            line-height: 22px;
                            background: #F5F5F5;
                            border: 1px solid #D9D9D9;
                            border-radius: 2px;
                            margin-right: 24px;
                            display: inline-block;
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
                    .upload {
                        .el-upload--picture-card {
                            width: 88px;
                            height: 88px;
                            line-height: 88px;
                            border-radius: 2px;
                            background: rgba(0,0,0,0.04);
                        }
                    }
                }
            }
            .el-dialog__footer {
                padding: 0 24px 24px 24px;
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