<template>
    <div class="container">
        <div class="image"></div>
        <div class="login">
            <div class="login-head">
                <p>欢迎登录</p>
                <p>数字化集邮服务管理系统</p>
            </div>
            <el-form :model="form" class="login-form" :rules="rules" label-position="top" ref="form">
                <el-form-item label="账号" class="login_form_label" prop="username">
                    <el-input
                        v-model.trim="form.username" type="number"
                        placeholder="请输入登录手机号"
                        oninput="if(value.length>20)value=value.slice(0,20)"
                        @keydown.native="channelInputLimit">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" class="login_form_label" prop="password">
                    <el-input
                        v-model="form.password" type="password"
                        placeholder="请输入登录密码" show-password
                        maxlength="20" @input="checkPassword">
                    </el-input>
                </el-form-item>
                <el-form-item label="图形验证码" class="login_form_label" prop="imageCode">
                    <el-input v-model="form.imageCode" placeholder="请输入图形验证码" maxlength="20">
                        <template slot="append">
                            <el-image
                                :src="imgCode" @click="updataCode"
                                style="width: 88px;height: 40px;cursor: pointer;" fit="fill">
                            </el-image>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="regSys">
                    <el-select v-model="form.regSys" placeholder="请选择角色">
                        <el-option
                            v-for="(item, index) in regSys" :key="index"
                            :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button class="login-btn" type="primary" @click="submit('form')">登 录</el-button>
            <div class="login-footer">
                <p>CopyRight 2021  www.chinau.com.cn 版权所有</p>
            </div>
        </div>
    </div>
</template>
<script>
import {login, getImageCode} from '@/api/request.js';

export default{
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: '',
                imageCode: '',
                regSys: ''
            },
            imgCode: '',
            uuid: '',
            regSys: [
                {label: '供应链', value: 6},
                {label: '服务商', value: 3},
            ],
            rules: {
                username: [
                    {required: true, message: '请输入登录手机号', trigger: ['blur', 'change']},
                    {type: 'number', validator: this.checkPhone, trigger: ['blur', 'change']}
                ],
                password: [
                    {required: true, message: '请输入登录密码', trigger: ['blur', 'change']},
                ],
                imageCode: [{required: true, message: '请填写图形验证码', trigger: ['blur', 'change']}],
                regSys: [{required: true, message: '请选择角色', trigger: ['blur', 'change']}]
            }
        }
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
                this.imgCode = res.imageCode;
                this.uuid = res.uuid;
            });
        },
        // 提交
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        username: this.form.username,
                        password: this.form.password,
                        imageCode: this.form.imageCode,
                        uuid: this.uuid,
                        regSys: this.form.regSys,
                    };
                    login(params).then(res => {
                        this.$message.success('登录成功');
                        this.$store.commit('set_token', res.token);
                        this.$store.commit('set_name', res.username);
                        this.$store.commit('set_userId', res.userId);
                        this.$store.commit('set_regSys', res.regSys);
                        this.$router.push('/index');
                    }).catch(() => {
                        this.$message.warning('登录失败');
                    })
                }
            })
        },
        // 校验手机号码格式
        checkPhone(rule, value, callback) {
            let reg = /^1[345789]\d{9}$/;
            if (!reg.test(value)) {
                callback(new Error('手机号码格式错误，请重新输入'));
            } else {
                callback();
            }
        },
        channelInputLimit (e) {
            let key = e.key;
            if (['e', '.', '-', '+'].includes(key)) {
                e.returnValue = false;
                return false;
            }
            return true;
        },
        // 不记录密码中的非数字、非字母
        checkPassword(value) {
            if (!value) {
                callback(new Error('请输入密码'));
            }
            let reg = new RegExp("[A-Za-z0-9]+"), len=value.length, result = '';
            for(let i = 0; i < len; i++) {
                if (reg.test(value[i])) {
                    result += value[i];
                }
            }
            this.form.password = result;
        }
    }
}
</script>

<style scoped lang="scss">
    .container {
        width: 100%;
        min-height: 100%;
        background: url('../assets/images/login/login_bg.png') no-repeat top center;
        background-size: cover;
        position: relative;
        .image {
            position: absolute;
            top: 108px;
            left: 64px;
            width: 613px;
            height: 465px;
            background: url('../assets/images/login/login_image.png') no-repeat top center;
        }
        .login {
            position: absolute;
            top: 140px;
            left: 875px;
            width: 330px;
            height: 417px;
            &-head {
                font-family: PingFang-SC-Heavy;
                font-size: 20px;
                color: #333;
                p {
                    line-height: 32px;
                }
            }
            &-form {
                margin-top: 48px;
                >>>.el-form-item {
                    margin-bottom: 0;
                    .el-form-item__label {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333;
                        height: 20px;
                        line-height: 20px;
                        padding: 0;
                    }
                    .el-form-item__label:before {
                        content: ''!important
                    }
                    .el-form-item__content {
                        margin-bottom: 24px;
                        .el-input__inner {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333!important;
                            padding: 0;
                        }
                        .el-input-group--append {
                            height: 40px;
                            .el-input-group__append {
                                height: 40px;
                                background-color: #fff;
                                border: 0;
                                border-radius: 0;
                                padding: 0;
                            }
                        }
                        input {
                            border-top-color: transparent;
                            border-left-color: transparent;
                            border-right-color: transparent;
                            border-bottom-color: #979797;
                            border-radius: 0;
                            outline: none;
                        }
                        input:-webkit-autofill {
                            box-shadow: 0 0 0px 1000px white inset !important;
                            border: 0 solid transparent;
                            border-bottom: 1px solid #979797;
                        }
                    }
                    .el-select {
                        width: 100%;
                    }
                    .el-input input[type="number"] {
                        -webkit-appearance:textfield;
                        -moz-appearance:textfield;
                        -o-appearance:textfield;
                        -ms-appearance:textfield;
                        appearance:textfield;
                    }
                    .el-input input[type="number"]::-webkit-inner-spin-button,
                    .el-input input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                        -o-appearance: none !important;
                        -ms-appearance: none !important;
                        appearance: none !important;
                        margin: 0;
                    }
                    input::-webkit-credentials-auto-fill-button {
                        display: none !important;
                        visibility: hidden;
                        pointer-events: none;
                        position: absolute;
                        right: 0;
                    }
                }
                >>>.is-error {
                    .el-form-item__content {
                        input {
                            border-top-color: transparent;
                            border-left-color: transparent;
                            border-right-color: transparent;
                            border-bottom-color: #F5222D;
                            border-radius: 0;
                            outline: none;
                        }
                    }
                }
            }
            &-btn {
                width: 330px;
                height: 40px;
                border-radius: 2px;
                >>>span {
                    font-family: PingFangSC-Semibold;
                    font-size: 16px;
                    color: #FFF;
                }
            }
            &-footer {
                margin-top: 150px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
            }
        }
    }
</style>
