<template>
  <div id="login">
    <div class="wrapper">
      <transition name="slide-fade" mode="out-in">
        <div class="container-login" v-if="isLogin" key="login">
          <img class="logo" src="../../assets/images/logo_login.png"/>
          <form class="login-form">
            <div class="form-div">
              <i class="iconfont icon-username"></i>
              <input type="text" placeholder="请输入手机号码" v-model="user.userName">
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
              <i class="iconfont icon-username"></i>
              <input type="text" placeholder="请输入手机号码" v-model="user.userName">
            </div>
            <div class="form-div">
              <i class="iconfont icon-password"></i>
              <input type="password" placeholder="请输入密码" v-model="user.password">
            </div>
            <div class="form-div">
              <i class="iconfont icon-comfirm-password"></i>
              <input type="password" placeholder="请确认密码" v-model="user.comfirmPwd">
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
  import { Toast } from 'mint-ui'
  export default {
    components: {},
    mounted () {
      var vm = this
      vm.userList = vm.$store.state.login.userList
    },
    data () {
      return {
        isLogin: true,
        userList: [], // 所有用户列表
        user: {
          userName: '18115169031',
          password: '123456',
          comfirmPwd: ''
        }
      }
    },
    methods: {
      forgetPassword() {
        var vm = this
        vm.user.userName = '18115169031'
        vm.user.password = '123456'
      },
      /**
       * 切换注册页面
       */
      goToRegister() {
        var vm = this
        vm.user = {
          userName: '',
          password: '',
          comfirmPwd: ''
        }
        vm.isLogin = false
      },
      /**
       * 切换登录页面
       */
      goToLogin() {
        var vm = this
        vm.isLogin = true
      },
      /**
       * 登录
       */
      login() {
        var vm = this
        if (!vm.user.userName || !vm.user.password) {
          Toast('手机号码或密码不能为空')
          return false
        }
        if (!vm.user.userName.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
          Toast('请输入正确的手机号码')
          return false
        }
        var exit = vm.userList.contains(vm.user, function (a, b) {
          return a.userName === b.userName && a.password === b.password
        })
        if (exit) {
          vm.$store.commit('TOKEN', new Date().getTime())
          vm.$router.go(-1)
        } else {
          Toast('手机号码或密码不正确')
          return false
        }
      },
      /**
       * 注册
       */
      register() {
        var vm = this
        if (!vm.user.userName || !vm.user.password) {
          Toast('手机号码或密码不能为空！')
          return false
        }
        if (!vm.user.userName.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
          Toast('请输入正确的手机号码')
          return false
        }
        if (vm.user.password !== vm.user.comfirmPwd) {
          Toast('两次密码不一致！')
          return false
        }
        var exit = vm.userList.contains(vm.user, function (a, b) {
          return a.userName === b.userName
        })
        if (exit) {
          Toast('该账户已存在！')
          return false
        } else {
          vm.$message({
            message: '恭喜你，注册成功！',
            type: 'success'
          })
          var user = JSON.parse(JSON.stringify(vm.user))
          vm.$store.commit('USER_LIST', user)
          vm.user.password = ''
          setTimeout(function () {
            vm.isLogin = true
          }, 1000)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
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
    max-width: 640px;
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
        margin: 25% auto;
        text-align: center;
        width: 85%;
        .logo {
          width: 30%;
          margin-bottom: 30px;
        }
        form {
          padding: 0 10%;
          border-radius: 10px;
          .iconfont {
            padding: 5px 15px 5px 5px;
            color: #4d4d4d;
            font-size: 1.8rem;
          }
          .form-div {
            border-bottom: 1px solid #49A934;
            display: flex;
            align-items: center;
            font-size: 1.7rem;
            margin-bottom: 3vh;
          }
          input {
            color: #4d4d4d;
            background-color: transparent;
            font-size: 1.2rem;
            font-weight: 300;
            width: 100%;
            &::-webkit-input-placeholder {
              color: #acacac;
            }
          }
          .bottom {
            margin: auto;
            padding: 10px;
            padding-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              cursor: pointer;
              color: #4d4d4d;
              font-size: 1.3rem;
            }
          }
          .login-button {
            background-color: #49A934;
            border-radius: 5px;
            padding: 10px 15px;
            letter-spacing: 12px;
            color: #efefef;
            cursor: pointer;
            font-size: 1.2rem;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            transition-duration: 0.25s;
          }
        }
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family:"iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-username:before { content: "\e759"; }

    .icon-comfirm-password:before { content: "\e645"; }

    .icon-password:before { content: "\e607"; }
  }
  @media screen and (min-width: 400px) {
    #login {
      .wrapper {
        .container-login, .container-register {
          .logo {
          }
          form {
            .iconfont {
              font-size: 2rem;
            }
            .form-div {
              font-size: 1.9rem;
            }
            input {
              font-size: 1.4rem;
            }
            .bottom {
              span {
                font-size: 1.5rem;
              }
            }
            .login-button {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
</style>
