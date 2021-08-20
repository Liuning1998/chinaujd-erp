<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="search">
            <div class="search-item search-item-left">
                <span>结算订单编号：</span>
                <el-input v-model="form.settlementId" placeholder="请输入"></el-input>
            </div>
            <div class="search-item search-item-end">
                <span>审核状态：</span>
                <el-select v-model="form.examineStatus" placeholder="">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="item in examineStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item search-item-left">
                <span>申请时间：</span>
                <el-date-picker
                    v-model="form.applyTime"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div class="search-item search-item-center">
                <span>审核时间：</span>
                <el-date-picker
                    v-model="form.examineTime"
                    :picker-options="pickerOptions"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>
            <div class="search-btns">
                <el-button class="search-btn" @click="handleSearch">查询</el-button>
                <el-button class="reset-btn" @click="handleReset">重置</el-button>
                <!-- <el-button type="primary" @click="handleExport">导出</el-button> -->
            </div>
        </div>
        <div class="order-detail">
            <search-table
                :table-data="tableData"
                @getData="getData">
            </search-table>
        </div>
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
import {
    POST_FINANCE_SLIP_SETTLEMENT_PAGELIST,
} from '@/api/request';

import Breadcrumb from '@/components/Breadcrumb';
import SearchTable from '@/views/finance/orderSettle/components/SearchTable';

export default {
    components: {
        Breadcrumb,
        SearchTable
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            form: {
                settlementId: '',
                examineStatus: '',
                applyTime: ['', ''],
                examineTime: ['', '']
            },
            examineStatus: [
                {label: '待审核', value: 0},
                {label: '待结算', value: 1},
                {label: '已结算', value: 2},
                {label: '已拒绝', value: 3},
                {label: '已关闭', value: 4},
            ],
            activeName: 'unreview',
            total: 0,
            currentPage: 1,
            pageSize: 15,
            tableData: [],
        }
    },
    methods: {
        /**
         * 获取订单列表
         * @function getData
         * @Params {Object} params 查询条件
         */
        getData() {
            let params = {
                applyStart: this.form.applyTime[0],
                applyEnd: this.form.applyTime[1],
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                examineStart: this.form.examineTime[0],
                examineEnd: this.form.examineTime[1],
                settlementId: this.form.settlementId,
                examineStatus: this.form.examineStatus,
            };
            POST_FINANCE_SLIP_SETTLEMENT_PAGELIST(params).then(res => {
                res.data.rows.forEach(item => {
                    item.examineStatus = Number(JSON.parse(item.examineStatus).value);
                })
                this.tableData = res.data.rows;
                this.total = total;
            })
        },
        /**
         * 查询
         * @function handleSearch
         */
        handleSearch() {
            this.getData();
        },
        /**
         * 重置
         * @function handleReset
         */
        handleReset() {
            let form = {
                settlementId: null,
                examineStatus: null,
                applyTime: ['', ''],
                examineTime: ['', '']
            };
            Object.assign(this.form, form);
        },
        /**
         * 导出
         * @function handleExport
         * @params {} res 接口返回
         */
        handleExport() {
            const blob = new Blob([res], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`;
            const file_name = `结算订单${curDate}.xls`;
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
        .search {
            width: 100%;
            height: 176px;
            background: #fff;
            border-radius: 2px;
            padding: 24px;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            &-item {
                height: 32px;
                margin-bottom: 16px;
                span {
                    height: 32px;
                    line-height: 32px;
                }
                >>>.el-input {
                    width: 240px;
                    .el-input__inner {
                        width: 240px;
                        height: 32px;
                        line-height: 32px;
                        border-radius: 2px;
                    }
                    .el-select__caret {
                        line-height: 32px;
                    }
                    .el-icon-date {
                        line-height: 32px;
                    }
                }
                >>>.el-date-editor--datetimerange {
                    width: 294px;
                    height: 32px;
                    padding: 0 2px;
                    border-radius: 2px;
                }
                >>>.el-button {
                    width: 65px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 2px;
                    padding: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                }
            }
            &-item-left {
                width: 38%;
                span {
                    width: 100px;
                    display: inline-block;
                    text-align: end;
                }
            }
            &-item-center {
                width: 34%;
                span {
                    width: 70px;
                    display: inline-block;
                    text-align: left;
                }
            }
            &-item-end {
                width: 28%;
                span {
                    width: 70px;
                    display: inline-block;
                    text-align: left;
                }
            }
            &-btns {
                width: 100%;
                text-align: end;
                >>>.el-button {
                    height: 32px;
                    background: #1890FF;
                    border-radius: 2px;
                    border: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    font-weight: 100;
                    color: #FFFFFF;
                    padding: 5px 12px;
                }
                .search-btn {
                    background: #1890FF;
                    border: 0;
                    color: #fff;
                }
                .reset-btn {
                    background: #fff;
                    border: 1px solid #D9D9D9;
                    color: #666666;
                }
            }
        }
        .order-detail {
            margin-top: 16px;
            background: #fff;
            border-radius: 2px;
            >>>.el-tabs {
                .el-tabs__header {
                    margin: 0;
                }
                .el-tabs__nav-wrap {
                    padding: 10px 24px 0;
                    .el-tabs__item {
                        font-size: 16px;
                    }
                    .el-tabs__item:nth-child(2) {
                        padding: 0 44px 0 0;
                    }
                    .el-tabs__item:nth-child(3) {
                        padding: 0 44px;
                    }
                    .el-tabs__item:last-child {
                        padding: 0 0 0 44px;
                    }
                }
                .el-tabs__nav-wrap::after {
                    height: 1px;
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