<template>
    <div class="container">
        <el-table
            :data="tableData">
            <el-table-column
                prop="prop11"
                label="系统角色">
            </el-table-column>
            <el-table-column
                prop="prop12"
                label="结算主体">
            </el-table-column>
            <el-table-column
                prop="prop13"
                label="结算金额">
            </el-table-column>
            <el-table-column
                prop="prop14"
                label="备注">
                <template slot-scope="scope">
                    <span>{{ scope.row.prop || '-' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="prop15"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleScan(scope.row)">查看</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="handleRefund(scope.row)">备注</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    created() {},
    methods: {}
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
    }
</style>