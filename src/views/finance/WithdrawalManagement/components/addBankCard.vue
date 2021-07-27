<template>
    <div class="container">
        <el-dialog
            title="添加银行卡"
            :visible.sync="dialogVisible"
            width="width"
            :before-close="handleClose">
            <div></div>
            <div slot="footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    methods: {
        /**
         * 关闭弹窗
         * @Function 
         */
        handleClose() {
            this.$emit('handleClose', false);
        },
        handleSubmit() {
            this.$emit('handleSubmit', false);
        },

    }
}
</script>

<style lang="scss" scoped>

</style>