<template>
  <div id="login">
    <ul class="bg-bubbles">
      <li><img src="../assets/images/生鲜-柑橘.svg"/></li>
      <li><img src="../assets/images/生鲜-肉类.svg"/></li>
      <li><img src="../assets/images/生鲜-胡萝卜.svg"/></li>
      <li><img src="../assets/images/生鲜-葡萄.svg"/></li>
    </ul>
    <div class="wrapper">
      <transition name="slide-fade" mode="out-in">
        <div class="container-login" v-if="isLogin" key="login">
          <img class="logo" src="../assets/images/logo.png"/>
          <form class="login-form">
            <img src="../assets/images/生鲜-西红柿.svg"/>
            <div class="form-div" ref="userName">
              <i class="iconfont icon-user"></i>
              <input type="text" placeholder="请输入手机号码" v-model="user.userName" @focus="getInputFocus('userName')"
                     @blur="getInputBlus('userName')">
            </div>
            <div class="form-div" ref="password">
              <i class="iconfont icon-lock"></i>
              <input type="password" placeholder="请输入密码" v-model="user.password" @focus="getInputFocus('password')"
                     @blur="getInputBlus('password')">
            </div>
            <div class="login-button" @click="login" @mouseenter="mouseenter" @mouseleave="mouseleave">登录
              <img ref="pangxie" src="../assets/images/生鲜-螃蟹.svg"/>
            </div>
            <div class="bottom">
              <span>忘记密码？</span>
              <span @click="goToRegister">立即注册</span>
            </div>
          </form>
          <div style="font-size: 18px;">
            {{userList}}<br>{{user}}
          </div>
        </div>
        <div class="container-register" v-else key="register">
          <img class="logo" src="../assets/images/logo.png"/>
          <form class="register-form">
            <div class="form-div" ref="userName">
              <i class="iconfont icon-user"></i>
              <input type="text" placeholder="请输入手机号码" v-model="user.userName" @focus="getInputFocus('userName')"
                     @blur="getInputBlus('userName')">
            </div>
            <div class="form-div" ref="password">
              <i class="iconfont icon-lock"></i>
              <input type="password" placeholder="请输入密码" v-model="user.password" @focus="getInputFocus('password')"
                     @blur="getInputBlus('password')">
            </div>
            <div class="form-div" ref="comfirmPwd">
              <i class="iconfont icon-unlock"></i>
              <input type="password" placeholder="请确认密码" v-model="user.comfirmPwd"
                     @focus="getInputFocus('comfirmPwd')"
                     @blur="getInputBlus('comfirmPwd')">
            </div>
            <div class="login-button" @click="register" @mouseenter="mouseenter" @mouseleave="mouseleave">注册
            </div>
            <div class="bottom">
              &nbsp;
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
          userName: '',
          password: '',
          comfirmPwd: ''
        }
      }
    },
    methods: {
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
       * input获得焦点
       */
      getInputFocus(val) {
        var vm = this
        vm.$refs[val].style.boxShadow = '0 0 10px #fff'
      },
      /**
       * input失去焦点
       */
      getInputBlus(val) {
        var vm = this
        vm.$refs[val].style.boxShadow = 'none'
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
          vm.$notify({
            title: '注册',
            message: '注册成功',
            type: 'success',
            duration: 1000
          })
          var user = JSON.parse(JSON.stringify(vm.user))
          vm.$store.commit('USER_LIST', user)
          vm.user.password = ''
          setTimeout(function () {
            vm.isLogin = true
          }, 1000)
        }
      },
      /**
       * 鼠标悬浮登录按钮
       */
      mouseenter() {
        var vm = this
        if (!vm.isLogin) {
          return
        }
        vm.$refs.pangxie.style.transform = 'rotate(-1835deg)'
        vm.$refs.pangxie.style.left = '-60%'
        vm.$refs.pangxie.style.bottom = '75vh'
      },
      /**
       * 鼠标悬浮离开登录按钮
       */
      mouseleave() {
        var vm = this
        if (!vm.isLogin) {
          return
        }
        vm.$refs.pangxie.style.transform = 'rotate(1765deg)'
        vm.$refs.pangxie.style.left = '88%'
        vm.$refs.pangxie.style.bottom = '-30%'
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
    width: 100%;
    height: 100vh;
    .wrapper {
      background-image: url(../assets/images/login-bgc.jpg);
      background-size: cover;
      position: absolute;
      display: flex;
      opacity: 0.8;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      z-index: 2;
      &::before {
        position: absolute;
        background: inherit;
        background-size: cover;
        width: 100%;
        height: 100vh;
        content: '';
        filter: blur(4px);
        z-index: -10;
      }
      .container-login, .container-register {
        margin: auto;
        text-align: center;
        width: 85%;
        .logo {
          width: 50%;
          margin-bottom: 20px;
        }
        form {
          padding: 8% 10%;
          border-radius: 10px;
          box-shadow: 0 0 40px #fff inset;
          position: relative;
          z-index: 2;
          > img {
            position: absolute;
            width: 30%;
            left: -10%;
            top: -20%;
            transform: rotate(-32deg);
          }
          .iconfont {
            padding: 5px 15px 5px 5px;
            color: #fff;
            font-size: 8vw;
          }
          .form-div {
            border: 1.5px solid rgba(255, 255, 255, 0.5);
            border-radius: 3px;
            display: flex;
            align-items: center;
            font-size: 7vw;
            margin-bottom: 3vh;
          }
          input {
            color: #4d4d4d;
            background-color: transparent;
            font-size: 18px;
            font-weight: 300;
            width: 100%;
            &::-webkit-input-placeholder {
              color: #ffffff;
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
              color: #fff;
              font-size: 3vw;
            }
          }
          .login-button {
            background-color: #4cd964;
            border-radius: 5px;
            padding: 10px 15px;
            letter-spacing: 12px;
            color: #fff;
            cursor: pointer;
            font-size: 18px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            transition-duration: 0.25s;
            img {
              width: 20%;
              position: absolute;
              left: 88%;
              bottom: -30%;
              transform: rotate(-35deg);
              animation: pangxie 2s;
              transition: all 2s;
            }
          }
        }
      }
    }
    .bg-bubbles {
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      li {
        list-style: none;
        position: absolute;
        top: -20vh;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(1) {
          width: 28vw;
          height: 28vw;
          animation: square-one 80s infinite;
          animation-timing-function: linear;
        }
        &:nth-of-type(2) {
          width: 25vw;
          height: 25vw;
          left: 0;
          top: 125vh;
          animation: square-two 100s infinite;
          animation-timing-function: ease-in-out;
          animation-delay: 5s;
        }
        &:nth-of-type(3) {
          width: 30vw;
          height: 30vw;
          animation: square-one 80s infinite;
          animation-timing-function: linear;
          animation-delay: 18s;
        }
        &:nth-of-type(4) {
          width: 30vw;
          height: 30vw;
          animation: square-two 100s infinite;
          animation-timing-function: ease-in-out;
          animation-delay: 34s;
        }
      }
    }
    @keyframes square-one {
      0% {
        left: 0;
        top: 0;
      }
      20% {
        width: 48vw;
        height: 48vw;
        transform: rotate(180deg);
        left: 50vw;
        top: 100vh;
      }
      40% {
        left: 100vw;
        top: 0;
      }
      60% {
        width: 58vw;
        height: 58vw;
        left: -20vw;
        top: 60vh;
      }
      80% {
        transform: rotate(280deg);
        left: 100vw;
        top: 60vh;
      }
      100% {
        transform: rotate(480deg);
        left: 0;
        top: 0;
      }
    }
    @keyframes square-two {
      0% {
        left: 0;
        top: 125vh;
      }
      20% {
        width: 58vw;
        height: 58vw;
        transform: rotate(180deg);
        left: 50vw;
        top: 0;
      }
      40% {
        left: 100vw;
        top: 120vh;
      }
      60% {
        width: 58vw;
        height: 58vw;
        left: -20vw;
        top: 60vh;
      }
      80% {
        transform: rotate(280deg);
        left: 100vw;
        top: 60vh;
      }
      100% {
        transform: rotate(480deg);
        left: 0;
        top: 125vh;
      }
    }
    @keyframes pangxie {
      0% {
        transform: rotate(0deg);
        left: -20vw;
        bottom: 70vh;
      }
      100% {
        transform: rotate(-1835deg);
        left: 88%;
        bottom: -30%;
      }
    }
  }

  @media screen and (min-width: 640px) {
    #login {
      .wrapper {
        width: 640px;
        &::before {
          width: 640px;
        }
        .container-login, .container-register {
          margin: auto;
          text-align: center;
          .logo {
            margin-bottom: 30px;
          }
          form {
            .iconfont {
              font-size: 40px;
            }
            input {
              font-size: 24px;
              &::-webkit-input-placeholder {
                color: #ffffff;
              }
            }
            .bottom {
              span {
                font-size: 20px;
                cursor: pointer;
              }
            }
            .login-button {
              font-size: 18px;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
              transition-duration: 0.25s;
            }
          }
        }
      }
      .bg-bubbles {
        width: 640px;
        li {
          &:nth-of-type(1) {
            width: 150px;
            height: 150px;
          }
          &:nth-of-type(2) {
            width: 120px;
            height: 120px;
          }
          &:nth-of-type(3) {
            width: 180px;
            height: 180px;
          }
          &:nth-of-type(4) {
            width: 180px;
            height: 180px;
          }
        }
      }
      @keyframes square-one {
        0% {
          left: 0;
          top: 0;
        }
        20% {
          width: 200px;
          height: 48vw;
          left: 50vw;
          top: 100vh;
        }
        40% {
          left: 100vw;
          top: 0;
        }
        60% {
          width: 250px;
          height: 250px;
          left: -20vw;
          top: 60vh;
        }
        80% {
          transform: rotate(280deg);
          left: 100vw;
          top: 60vh;
        }
        100% {
          transform: rotate(480deg);
          left: 0;
          top: 0;
        }
      }
      @keyframes square-two {
        0% {
          left: 0;
          top: 125vh;
        }
        20% {
          width: 300px;
          height: 300px;
          transform: rotate(180deg);
          left: 50vw;
          top: 0;
        }
        40% {
          left: 100vw;
          top: 120vh;
        }
        60% {
          width: 200px;
          height: 200px;
          left: -20vw;
          top: 60vh;
        }
        80% {
          transform: rotate(280deg);
          left: 100vw;
          top: 60vh;
        }
        100% {
          transform: rotate(480deg);
          left: 0;
          top: 125vh;
        }
      }
    }
  }
</style>
