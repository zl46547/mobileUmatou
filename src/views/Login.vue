<template>
  <div id="login">
    <ul class="bg-bubbles">
      <li><img src="../assets/images/生鲜-柑橘.svg"/></li>
      <li><img src="../assets/images/生鲜-肉类.svg"/></li>
      <li><img src="../assets/images/生鲜-胡萝卜.svg"/></li>
      <li><img src="../assets/images/生鲜-葡萄.svg"/></li>
    </ul>
    <div class="wrapper">
      <div class="container">
        <img class="logo" src="../assets/images/logo.png"/>
        <form class="form">
          <div class="user">
            <input type="text" placeholder="请输入用户名">
            <img src="../assets/images/生鲜-西红柿.svg"/>
          </div>
          <input type="password" placeholder="请输入密码">
          <div class="login-button" @click="login" @mouseenter="mouseenter" @mouseleave="mouseleave">登录<img ref="pangxie" src="../assets/images/生鲜-螃蟹.svg"/></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    mounted () {
//      var vm = this
    },
    data () {
      return {}
    },
    methods: {
      login() {
      },
      mouseenter() {
        var vm = this
        vm.$refs.pangxie.style.transform = 'rotate(-1835deg)'
        vm.$refs.pangxie.style.left = '-20vw'
        vm.$refs.pangxie.style.bottom = '68vh'
      },
      mouseleave() {
        var vm = this
        vm.$refs.pangxie.style.transform = 'rotate(1765deg)'
        vm.$refs.pangxie.style.left = '67vw'
        vm.$refs.pangxie.style.bottom = '-4vh'
      }
    }
  }
</script>

<style lang="less" scoped>
  #login {
    .wrapper {
      background-image: url(../assets/images/login-bgc.jpg);
      background-size: cover;
      position: absolute;
      display: flex;
      opacity: 0.9;
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
        filter: blur(2px);
        z-index: -10;
      }
      .container {
        margin: auto;
        text-align: center;
        .logo {
          width: 50%;
          margin-bottom: 20px;
        }
        form {
          padding: 20px 0;
          position: relative;
          z-index: 2;
          input {
            border: 1px solid rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.38);
            width: 70%;
            border-radius: 3px;
            padding: 10px 15px;
            margin: 0 auto 10px auto;
            display: block;
            text-align: center;
            font-size: 18px;
            font-weight: 300;
          }
          .user{
            position: relative;
            img{
              position: absolute;
              width: 30%;
              left: -5vw;
              top: -9vh;
              transform: rotate(-32deg);
            }
          }
          .login-button {
            background-color: #4cd964;
            border-radius: 5px;
            padding: 10px 15px;
            color: #fff;
            width: 70%;
            cursor: pointer;
            font-size: 18px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            transition-duration: 0.25s;
            img {
              width: 20%;
              position: absolute;
              left: 67vw;
              bottom: -4vh;
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
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      li {
        list-style: none;
        position: absolute;
        top:-20vh;
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
          left:0;
          top:125vh;
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
        transform:  rotate(480deg);
        left: 0;
        top: 0;
      }
    }
    @keyframes square-two {
      0% {
        left:0;
        top:125vh;
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
        transform:  rotate(480deg);
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
        left: 67vw;
        bottom: -4vh;
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
        .container {
          margin: auto;
          text-align: center;
          .logo {
            margin-bottom: 30px;
          }
          form {
            input {
              border-radius: 3px;
              padding: 10px 15px;
              margin: 0 auto 10px auto;
              display: block;
              text-align: center;
              font-size: 18px;
              font-weight: 300;
            }
            .user{
              position: relative;
              img{
                position: absolute;
                left: -5vw;
                top: -9vh;
                transform: rotate(-32deg);
              }
            }
            .login-button {
              background-color: #4cd964;
              border-radius: 5px;
              padding: 10px 15px;
              color: #fff;
              cursor: pointer;
              font-size: 18px;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
              transition-duration: 0.25s;
              img {
                position: absolute;
                left: 67vw;
                bottom: -4vh;
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
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        li {
          list-style: none;
          position: absolute;
          top:-20vh;
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
            left:0;
            top:125vh;
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
          transform:  rotate(480deg);
          left: 0;
          top: 0;
        }
      }
      @keyframes square-two {
        0% {
          left:0;
          top:125vh;
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
          transform:  rotate(480deg);
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
          left: 67vw;
          bottom: -4vh;
        }
      }
    }
  }
</style>
