<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                align="center">
                <template slot="header" slot-scope="">
                    <div class="header">
                        <span>平台订单对账数据</span>
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
                    label="每单对账状态"
                    width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.row.prop5 === 1">
                            <i class="dot-success"></i>
                            <span>正常</span>
                        </div>
                        <div v-if="scope.row.prop5 === 2">
                            <i class="dot-error"></i>
                            <span>异常未处理</span>
                            <el-button class="detail" type="text" @click="handleAbnormal(scope.row)">处理</el-button>
                        </div>
                        <div v-if="scope.row.prop5 === 3">
                            <i class="dot-warning"></i>
                            <span>异常已挂起</span>
                            <el-button class="detail" type="text" @click="handleAbnormal(scope.row)">处理</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center">
                <template slot="header" slot-scope="">
                    <div class="header">
                        <span>三方账户对账数据</span>
                        <div class="btns">
                            <span class="download">
                                <el-button type="text" size="small"><i></i>模版下载</el-button>
                            </span>
                            <el-upload action="#" class="upload">
                                <el-button type="text" size="small"><i></i>上传对账数据</el-button>
                            </el-upload>
                        </div>
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
                layout="prev, pager, next, sizes, jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
            title="异常处理"
            width="640px"
            class="abnormal-dialog"
            :visible.sync="abnormalDialogVisible"
            :before-close="dialogBeforeClose">
            <div>
                <div class="detail-type">
                    <span>处理方式：</span>
                    <div class="btns">
                        <span
                            :class="abnormalForm.type === item.value ? 'detail-type-select' : null"
                            v-for="(item, index) in detailType" :key="index"
                            @click="handleSelectDetailType(item.value)">
                            {{ item.label }}
                        </span>
                    </div>
                </div>
                <div class="detail-order" v-if="abnormalForm.type === 0">
                    <!-- <span v-if="currentData.prop9 && !currentData.prop1">平台订单</span> -->
                    <span>三方订单：</span>
                    <el-input v-model="orderNumber"></el-input>
                    <el-button type="primary" @click="handleSearch(handleSearch)">查询</el-button>
                </div>
                <div class="table" v-if="abnormalForm.type === 0">
                    <el-table
                        :data="abnormalTableData"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="60"
                            align="center"
                            type="selection">
                        </el-table-column>
                        <el-table-column
                            prop="prop1"
                            width="150"
                            label="订单号">
                        </el-table-column>
                        <el-table-column
                            prop="prop2"
                            width="95"
                            label="交易时间">
                        </el-table-column>
                        <el-table-column
                            prop="prop3"
                            width="90"
                            label="支付类型">
                        </el-table-column>
                        <el-table-column
                            width="90"
                            label="交易金额">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.modify">{{ scope.row.prop4 }}</span>
                                <el-input v-else v-model="scope.row.prop4" @blur="handleBlur(scope.row.prop1)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleModify(scope.row.prop1)">修改</el-button>
                                <el-divider direction="vertical"></el-divider>
                                <el-button type="text" @click="handleDelete(scope.row.prop1)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="remarks">
                    <span>备注：</span>
                    <el-input type="textarea" v-model="abnormalForm.remarks" placeholder=""></el-input>
                </div>
            </div>
            <div slot="footer">
                <el-button class="cancel" @click="dialogBeforeClose">取 消</el-button>
                <el-button class="submit"
                    :disabled="abnormalForm.type === 0 && !abnormalForm.order.length"
                    @click="handleSubmit">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detailType: [
                {label: '异常处理', value: 0},
                {label: '挂起异常', value: 1},
            ],
            tableData: [
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
            abnormalTableData: [],
            total: 110,
            pageSize: 15,
            currentPage: 0,
            currentData: {},
            abnormalDialogVisible: false,
            orderNumber: '',
            abnormalForm: {
                type: 0,
                order: [],
                remarks: '',
            }
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
        handleAbnormal(data) {
            this.currentData = data;
            this.abnormalDialogVisible = true;
        },
        /**
         * 关闭异常处理弹窗
         * @Function dialogBeforeClose
         */
        dialogBeforeClose() {
            this.abnormalDialogVisible = false;
            this.abnormalForm.order = [];
        },
        /**
         * 提交异常处理结果
         * @Function handleSubmit
         */
        handleSubmit() {
            this.$message.success('已确认关联，系统开始再次对账');
            this.abnormalDialogVisible = false;
            this.abnormalForm.order = [];
        },
        /**
         * 选择异常处理方式
         * @Function handleSelectDetailType
         * @params {String} value
         */
        handleSelectDetailType(value) {
            this.abnormalForm.type = value;
        },
        /**
         * 搜索异常数据
         * @Function handleSearch
         * @parans {String} keyword 订单号
         */
        handleSearch(keyword) {
            let data = [
                {
                    prop1: '443234444444345',
                    prop2: '2020.08.21 12:00:00',
                    prop3: '付款',
                    prop4: 40000,
                },
                {
                    prop1: '443234444444346',
                    prop2: '2020.08.21 12:00:00',
                    prop3: '付款',
                    prop4: 10000,
                }
            ];
            data.forEach(item => {
                item.modify = false;
            });
            this.abnormalTableData = data;
        },
        /**
         * 选择异常的订单号
         * @Function handleSelectionChange
         * @params {Array} val
         */
        handleSelectionChange(val) {
            this.abnormalForm.order = val.map(item => item.prop1);
        },
        /**
         * 输入框失去焦点修改金额
         * @function handleBlur
         */
        handleBlur(data) {
            this.abnormalTableData.forEach(item => {
                if (item.prop1 === data) {
                    item.modify = false;
                }
            });
        },
        /**
         * 修改异常订单
         * @Function handleModify
         * @params {Object} data
         */
        handleModify(data) {
            this.abnormalTableData.forEach(item => {
                if (item.prop1 === data) {
                    item.modify = true;
                }
            });
        },
        /**
         * 删除异常订单
         * @Function handleDelete
         * @params {Object} data
         */
        handleDelete(data) {},
    }
}
</script>

<style lang="scss" scoped>
    .container {
        padding: 24px 24px 0 24px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        background: #fff;
        box-sizing: border-box;
        >>>.el-table {
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 14px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                .btns {
                    display: flex;
                    .el-button {
                        height: 24px;
                        line-height: 24px;
                        background: #FFF;
                        border: 1px solid #1890FF;
                        border-radius: 2px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #1890FF;
                        padding: 0;
                        font-weight: 100;
                        box-sizing: border-box;
                    }
                    .download .el-button{
                        width: 100px;
                        margin-right: 24px;
                    }
                    .upload .el-button {
                        width: 128px;
                    }
                    .download i {
                        width: 12px;
                        height: 12px;
                        display: inline-block;
                        margin-right: 6px;
                        background: url('~@/assets/images/finance/icon_download.png') no-repeat top center;
                    }
                    .upload i {
                        width: 12px;
                        height: 12px;
                        display: inline-block;
                        margin-right: 6px;
                        background: url('~@/assets/images/finance/icon_upload.png') no-repeat top center;
                    }
                }
            }
            .dot-success {
                width: 6px;
                height: 6px;
                background: #52C41A;
                margin: 0 8px 0 6px;
                display: inline-block;
                border-radius: 50%;
            }
            .dot-error {
                width: 6px;
                height: 6px;
                background: #F5222D;
                margin: 0 8px 0 6px;
                display: inline-block;
                border-radius: 50%;
            }
            .dot-warning {
                width: 6px;
                height: 6px;
                background: #FAAD14;
                margin: 0 8px 0 6px;
                display: inline-block;
                border-radius: 50%;
            }
            .detail {
                margin-left: 16px;
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
        .abnormal-dialog {
            >>>.el-dialog {
                .el-dialog__header {
                    padding: 16px 24px;
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #333333;
                }
                .el-dialog__body {
                    padding: 8px 24px 0;
                    .detail-type {
                        display: flex;
                        span {
                            width: 70px;
                            height: 22px;
                            line-height: 22px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                        }
                        .btns {
                            span {
                                width: 88px;
                                height: 22px;
                                background: #F5F5F5;
                                border: 1px solid #D9D9D9;
                                border-radius: 2px;
                                display: inline-block;
                                text-align: center;
                                margin-right: 24px;
                                cursor: pointer;
                            }
                        }
                        &-select {
                            background: #FFFFFF!important;
                            border: 1px solid #1890FF!important;
                            color: #1890FF;
                        }
                    }
                    .detail-order {
                        margin-top: 24px;
                        display: flex;
                        align-items: center;
                        span {
                            width: 70px;
                            height: 22px;
                            line-height: 22px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                        }
                        .el-input {
                            width: 328px;
                            padding: 0;
                            .el-input__inner {
                                height: 32px;
                                line-height: 32px;
                                border-radius: 2px;
                            }
                        }
                        .el-button {
                            width: 65px;
                            height: 32px;
                            line-height: 32px;
                            padding: 0;
                            background: #1890FF;
                            border-radius: 2px;
                            font-size: 14px;
                            color: #FFFFFF;
                            margin-left: 24px;
                        }
                    }
                    .table {
                        margin-top: 24px;
                        border-radius: 2px;
                        background: #fff;
                        thead {
                            tr>th {
                                height: 54px;
                                font-family: PingFangSC-Medium;
                                font-size: 14px;
                                color: #333;
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
                                .el-input__inner {
                                    height: 32px;
                                    line-height: 32px;
                                    border-radius: 2px;
                                }
                            }
                        }
                    }
                    .remarks {
                        margin-top: 24px;
                        display: flex;
                        span {
                            width: 70px;
                            height: 22px;
                            line-height: 22px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            text-align: right;
                        }
                        .el-textarea__inner {
                            width: 328px;
                            height: 80px;
                        }
                    }
                }
                .el-dialog__footer {
                    padding: 24px;
                    font-size: 0;
                    >div {
                        display: flex;
                        justify-content: flex-end;
                    }
                    .cancel {
                        width: 65px;
                        height:32px;
                        line-height: 32px;
                        border-radius: 2px;
                        padding: 0;
                        background: #fff;
                        border: 1px solid #D9D9D9;
                        color: #666;
                        font-size: 14px;
                        margin-right: 8px;
                    }
                    .submit {
                        width: 65px;
                        height:32px;
                        line-height: 32px;
                        border-radius: 2px;
                        padding: 0;
                        background: #1890FF;
                        border: 0;
                        color: #fff;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>