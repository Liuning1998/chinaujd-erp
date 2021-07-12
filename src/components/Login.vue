<template>
    <div class="container"></div>
</template>
<script>
// 登陆页
// import {login, getImageCode} from '@/api/request.js';
export default{
    name: 'Login',
    data() {
        return {}
    },
    created() {
        // this.getImgCode();
        // 回车键登录
        let that = this;
        document.onkeydown = function(e) {
            e = window.event || e;
            if (that.$route.path == '/login' && (e.code == 'Enter' || e.code == 'enter')) { //验证在登录界面和按得键是回车键enter
                that.submit('form');
            }
        }
    },
    methods: {
        // 更新验证码
        updataCode() {
            this.getImgCode();
        },
         // 获取图形验证码
        getImgCode() {
            getImageCode().then(res => {
                this.imgcode = res.imageCode;
                this.uuid = res.uuid;
            });
        },
    }
}
</script>

<style scoped>
</style>
