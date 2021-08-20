<template>
    <div class="container">
        <el-radio-group v-model="radio">
            <el-radio-button :label="0">待审核</el-radio-button>
            <el-radio-button :label="1">待支付</el-radio-button>
            <el-radio-button :label="2">审核历史</el-radio-button>
        </el-radio-group>
        <Unreview
            v-if="radio === 0"
            :table-data="tableData"
            @getData="getData">
        </Unreview>
        <Unpay
            v-if="radio === 1"
            :table-data="tableData"
            @getData="getData">
        </Unpay>
        <Reviewed
            v-if="radio === 2"
            :table-data="tableData"
            @getData="getData">
        </Reviewed>
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
    POST_FINANCE_SLIP_CASHOUT_LIST,
} from '@/api/request';

import Unreview from '@/views/finance/withdrawalManagement/components/Unreview';
import Unpay from '@/views/finance/withdrawalManagement/components/Unpay';
import Reviewed from '@/views/finance/withdrawalManagement/components/Reviewed';

export default {
    name: '',
    components: {
        Unreview,
        Unpay,
        Reviewed
    },
    data() {
        return {
            radio: 0,
            tableData: [],
            total: 110,
            currentPage: 1,
            pageSize: 15,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * 获取列表数据
         * @function getData
         */
        getData() {
            let params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                status: this.radio
            };
            POST_FINANCE_SLIP_CASHOUT_LIST(params).then(res => {
                this.tableData = res.data.rows;
                this.total = Number(res.data.total);
            });
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
        margin-top: 16px;
        background: #FFF;
        >>>.el-radio-group {
            padding: 16px 24px;
            .el-radio-button {
                width: 74px;
                .el-radio-button__inner {
                    width: 74px;
                    height: 32px;
                    line-height: 32px;
                    padding: 0;
                }
            }
            .el-radio-button:first-child {
                .el-radio-button__inner {
                    border-radius: 2px 0 0 2px;
                }
            }
            .el-radio-button:last-child {
                .el-radio-button__inner {
                    border-radius: 0 2px 2px 0;
                }
            }
            .is-active {
                .el-radio-button__inner {
                    background: #FFF;
                    color: #1890FF;
                }
            }
        }
        .pagination {
            width: 100%;
            padding-bottom: 16px;
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