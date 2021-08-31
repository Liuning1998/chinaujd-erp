<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="tabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="提现" name="withdrawal"></el-tab-pane>
                <el-tab-pane label="资金明细" name="capital"></el-tab-pane>
                <el-tab-pane label="提现审核" name="review"></el-tab-pane>
            </el-tabs>
        </div>
        <Withdrawal v-if="activeName === 'withdrawal'"></Withdrawal>
        <Capital v-if="activeName === 'capital'"></Capital>
        <Review v-if="activeName === 'review'"></Review>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import Withdrawal from '@/views/finance/withdrawalManagement/components/Withdrawal';
import Capital from '@/views/finance/withdrawalManagement/components/Capital';
import Review from '@/views/finance/withdrawalManagement/components/Review';

export default {
    components: {
        Breadcrumb,
        Withdrawal,
        Capital,
        Review
    },
    data() {
        return {
            activeName: 'withdrawal',
        }
    },
    created() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
    .container {
        .tabs {
            >>>.el-tabs {
                .el-tabs__header {
                    margin: 0;
                    background: #FFF;
                    .el-tabs__nav-wrap {
                        padding: 10px 24px 0;
                        overflow: inherit;
                        font-family: PingFangSC-Medium;
                        .el-tabs__item {
                            font-size: 16px;
                            padding: 0 44px;
                        }
                        .el-tabs__item:nth-child(2) {
                            padding: 0 44px 0 0;
                        }
                        .el-tabs__item:last-child {
                            padding: 0 0 0 44px;
                        }
                    }
                }
            }
        }
    }
</style>