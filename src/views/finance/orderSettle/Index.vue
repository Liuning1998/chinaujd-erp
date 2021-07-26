<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="search">
            <div class="search-item search-item-left">
                <span>结算订单编号：</span>
                <el-input v-model="form.orderNumber"></el-input>
            </div>
            <div class="search-item search-item-center">
                <span>订单类型：</span>
                <el-select v-model="form.orderType" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in orderType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item search-item-end">
                <span>审核状态：</span>
                <el-select v-model="form.examineStatus" placeholder="">
                    <el-option label="全部" :value="0"></el-option>
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
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleReset">重置</el-button>
                <el-button type="primary" @click="handleExport">导出</el-button>
            </div>
        </div>
        <div class="order-detail">
            <el-tabs v-model="activeName">
                <el-tab-pane label="待审核" name="unreview">
                    <unreview></unreview>
                </el-tab-pane>
                <el-tab-pane label="待结算" name="unsettle">
                    <unsettle></unsettle>
                </el-tab-pane>
                <el-tab-pane label="审核历史" name="reviewed">
                    <reviewed></reviewed>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import Unreview from '@/views/finance/orderSettle/components/Unreview';
import Unsettle from '@/views/finance/orderSettle/components/Unsettle';
import Reviewed from '@/views/finance/orderSettle/components/Reviewed';

export default {
    components: {
        Breadcrumb,
        Unreview,
        Unsettle,
        Reviewed
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            form: {
                orderNumber: '',
                orderType: 0,
                examineStatus: 0,
                applyTime: [],
                examineTime: []
            },
            orderType: [
                {label: '售后订单', value: 1},
                {label: '结算订单', value: 2},
                {label: '提现订单', value: 3},
            ],
            examineStatus: [
                {label: '待审核', value: 1},
                {label: '待结算', value: 2},
                {label: '已结算', value: 3},
                {label: '已拒绝', value: 4},
                {label: '已关闭', value: 5},
            ],
            activeName: 'unreview',
        }
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
         * 查询
         * @Function handleSearch
         */
        handleSearch() {
            this.getData();
        },
        /**
         * 重置
         * @Function handleReset
         */
        handleReset() {
            let form = {
                orderNumber: '',
                orderType: 0,
                examineStatus: 0,
                applyTime: [],
                examineTime: []
            };
            Object.assign(this.form, form);
        },
        /**
         * 导出
         * @Function handleExport
         * @params {} res 接口返回
         */
        handleExport() {
            const blob = new Blob([res], {
                type: 'application/vnd.ms-excel;charset=utf-8'
            });
            let curDate = `${new Date().getFullYear()}年${(new Date().getMonth() + 1)}月${new Date().getDate()}日`
            const file_name = `订单明细${curDate}.xls`;
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
    }
</style>