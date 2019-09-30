<template>
  <div id="login">
    <div class="wrapper">
      <transition name="slide-fade" mode="out-in">
        <div class="container-login" v-if="isLogin" key="login">
          <img class="logo" src="../../assets/images/logo_login.png"/>
          <form class="login-form">
            <div class="form-div">
              <i class="iconfont icon-acount"></i>
              <input type="text" placeholder="请输入手机号码" v-model="user.mobile">
            </div>
            <div class="form-div">
              <i class="iconfont icon-password"></i>
              <input type="password" placeholder="请输入密码" v-model="user.password">
            </div>
            <div class="login-button" @click="login">登录</div>
            <div class="bottom">
              <span @click="forgetPassword">忘记密码？</span>
              <span @click="goToRegister">立即注册</span>
            </div>
          </form>
        </div>
        <div class="container-register" v-else key="register">
          <img class="logo" src="../../assets/images/logo_login.png"/>
          <form class="register-form">
            <div class="form-div">
              <i class="iconfont icon-acount"></i>
              <input type="text" placeholder="请输入手机号码" v-model="user.mobile">
            </div>
            <div class="form-div">
              <i class="iconfont icon-password"></i>
              <input type="password" placeholder="请输入密码" v-model="user.password">
            </div>
            <div class="form-div">
              <i class="iconfont icon-confirm-password"></i>
              <input type="password" placeholder="请确认密码" v-model="user.confirmPwd">
            </div>
            <div class="login-button" @click="register">注册</div>
            <div class="bottom">
              <span @click="goToLogin">已有账号，立即前往登录</span>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  import {submitRegster, submitSignIn} from './service'
  import * as types from '../../vuex/types'
  export default {
    components: {},
    mounted () {
    },
    data () {
      return {
        isLogin: true,
        user: {
          mobile: '18115169031',
          password: '16899199',
          confirmPwd: ''
        }
      }
    },
    methods: {
      forgetPassword() {
        this.user.mobile = '18115169031'
        this.user.password = '16899199'
      },
      /**
       * 切换注册页面
       */
      goToRegister() {
        this.user = {
          mobile: '',
          password: '',
          confirmPwd: ''
        }
        this.isLogin = false
      },
      /**
       * 切换登录页面
       */
      goToLogin() {
        this.isLogin = true
      },
      /**
       * 登录
       */
      login() {
        if (!this.user.mobile || !this.user.password) {
          Toast('手机号码或密码不能为空')
          return false
        }
        if (!this.user.mobile.match(/^(1[3456789])\d{9}$/)) {
          Toast('请输入正确的手机号码')
          return false
        }
        submitSignIn(this.user).then(res => {
          if (res) {
            this.$store.commit(types.USER, {...res, token: new Date().getTime()})
            setTimeout(() => {
              this.$router.go(-1)
            }, 2000)
          }
        })
      },
      /**
       * 注册
       */
      register() {
        if (!this.user.mobile || !this.user.password) {
          Toast('手机号码或密码不能为空！')
          return false
        }
        if (!this.user.mobile.match(/^(1[3456789])\d{9}$/)) {
          Toast('请输入正确的手机号码')
          return false
        }
        if (this.user.password !== this.user.confirmPwd) {
          Toast('两次密码不一致！')
          return false
        }
        submitRegster(this.user).then(res => {
          this.$store.commit(types.USER, {...res, token: new Date().getTime()})
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #login {
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(50%);
      opacity: 0;
    }
    width: 100%;
    height: 100vh;
    .wrapper {
      background: url(../../assets/images/login-bgc.jpg) no-repeat;
      background-size: cover;
      display: flex;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      z-index: 2;
      .container-login, .container-register {
        margin: auto;
        margin-top: 25%;
        text-align: center;
        width: 85%;
        .logo {
          width: 30%;
          margin-bottom: 30rem/@baseFontSize;
        }
        form {
          padding: 0 10%;
          .iconfont {
            padding: 15rem/@baseFontSize;
            padding-right: 25rem/@baseFontSize;
            color: #4d4d4d;
            font-size: 28rem/@baseFontSize;
          }
          .form-div {
            border-bottom: 1px solid @themeColor;
            display: flex;
            align-items: center;
            font-size: 27rem/@baseFontSize;
            margin-bottom: 15rem/@baseFontSize;
          }
          input {
            color: #4d4d4d;
            background-color: transparent;
            font-size: 22rem/@baseFontSize;
            font-weight: 300;
            width: 100%;
            &::-webkit-input-placeholder {
              color: #acacac;
            }
          }
          .bottom {
            margin: auto;
            padding: 10rem/@baseFontSize;
            padding-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              cursor: pointer;
              color: #4d4d4d;
              font-size: 24rem/@baseFontSize;
            }
          }
          .login-button {
            background-color: @themeColor;
            border-radius: 5rem/@baseFontSize;
            padding: 20rem/@baseFontSize 25rem/@baseFontSize;
            letter-spacing: 12rem/@baseFontSize;
            color: #efefef;
            cursor: pointer;
            font-size: 22rem/@baseFontSize;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            transition-duration: 0.25s;
          }
        }
      }
    }
  }
</style>
