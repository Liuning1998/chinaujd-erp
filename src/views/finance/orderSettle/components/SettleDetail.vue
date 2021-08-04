<template>
    <div class="container">
        <el-table
            class=""
            :data="tableData">
            <el-table-column>
                <el-table-column
                    prop="prop1"
                    width="150"
                    label="服务项单价">
                </el-table-column>
                <el-table-column
                    prop="prop2"
                    label="收费标准">
                </el-table-column>
            </el-table-column>
            <el-table-column
                width="180"
                label="中国集邮有限公司">
                <el-table-column
                    prop="prop3"
                    label="分润占比">
                </el-table-column>
                <el-table-column
                    prop="prop4"
                    label="分润收入">
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="邮来邮网">
                <el-table-column
                    prop="prop5"
                    label="分润占比">
                </el-table-column>
                <el-table-column
                    prop="prop6"
                    label="分润收入">
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="代理商(门店)">
                <el-table-column
                    prop="prop7"
                    label="分润占比">
                </el-table-column>
                <el-table-column
                    prop="prop8"
                    label="分润收入">
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="鉴评师">
                <el-table-column
                    prop="prop9"
                    label="分润占比">
                </el-table-column>
                <el-table-column
                    prop="prop10"
                    label="分润收入">
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-table
            :data="tableData">
            <el-table-column
                prop="prop11"
                width="150"
                label="产品服务组合项组合">
            </el-table-column>
            <el-table-column
                prop="prop12"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop13"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop14"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop15"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop16"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop17"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop18"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop19"
                label="">
            </el-table-column>
            <el-table-column
                prop="prop20"
                label="">
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