<template>
    <div class="container">
        <Breadcrumb></Breadcrumb>
        <div class="tabs">
            <el-tabs v-model="activeName">
                <el-tab-pane
                    v-for="(item, index) in jurisdiction" :key="index"
                    :label="item.label" :name="item.name">
                    <Withdrawal v-if="activeName === 'withdrawal'"></Withdrawal>
                    <Capital v-if="activeName === 'capital'"></Capital>
                    <Review v-if="activeName === 'review'"></Review>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import Withdrawal from '@/views/finance/withdrawalManagement/components/withdrawal.vue';
import Capital from '@/views/finance/withdrawalManagement/components/capital';
import Review from '@/views/finance/withdrawalManagement/components/review';

export default {
    components: {
        Breadcrumb,
        Withdrawal,
        Capital,
        Review
    },
    data() {
        return {
            activeName: '',
            jurisdiction: [],
        }
    },
    created() {
        this.getJurisdiction();
    },
    methods: {
        getJurisdiction() {
            let arr = [
                {label: '提现', name: 'withdrawal'},
                {label: '资金明细', name: 'capital'},
                {label: '提现审核', name: 'review'},
            ]
            this.activeName = arr[0].name;
            this.jurisdiction = arr;
        }
    }
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