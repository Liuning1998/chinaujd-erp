<template>
    <div class="container">
        <el-radio-group v-model="radio">
            <el-radio-button :label="1">待审核</el-radio-button>
            <el-radio-button :label="2">待支付</el-radio-button>
            <el-radio-button :label="3">审核历史</el-radio-button>
        </el-radio-group>
        <Unreview v-if="radio === 1"></Unreview>
        <Unpay v-if="radio === 2"></Unpay>
        <Reviewed v-if="radio === 3"></Reviewed>
    </div>
</template>

<script>
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
            radio: 1,
        }
    },
    methods: {}
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
    }
</style>