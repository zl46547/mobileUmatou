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
        <img src="../assets/images/logo.png"/>
        <form class="form">
          <div class="user">
            <input type="text" placeholder="请输入用户名">
            <img src="../assets/images/生鲜-西红柿.svg"/>
          </div>
          <input type="password" placeholder="请输入密码">
          <div class="login-button" @click="login">登录<img src="../assets/images/生鲜-螃蟹.svg"/></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    mounted () {
      var vm = this
    },
    data () {
      return {}
    },
    methods: {
      login() {
      }
    }
  }
</script>

<style lang="less" scoped>
  #login {
    .wrapper {
      background-image: url(../assets/images/login-bgc.jpg);
      background-size: cover;
      opacity: 0.8;
      position: absolute;
      display: flex;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      z-index: 2;
      &::before {
        position: absolute;
        background: inherit;
        background-size: cover;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        filter: blur(5px);
        z-index: -1;
      }
      .container {
        margin: auto;
        text-align: center;
        img {
          width: 50%;
          margin-bottom: 20px;
        }
        form {
          padding: 20px 0;
          position: relative;
          z-index: 2;
          input {
            outline: 0;
            border: 1px solid rgba(255, 255, 255, 0.4);
            background-color: rgba(255, 255, 255, 0.38);
            width: 80vw;
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
              width: 30vw;
              left: -5vw;
              top: -8vh;
              transform: rotate(-32deg);
            }
          }
          .login-button {
            background-color: #4cd964;
            border-radius: 5px;
            padding: 10px 15px;
            color: #fff;
            width: 70vw;
            cursor: pointer;
            font-size: 18px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            transition-duration: 0.25s;
            &:hover {
              background-color: #f5f7f9;
            }
            img {
              width: 20vw;
              position: absolute;
              left: 66vw;
              bottom: -8vh;
              transform: rotate(-35deg);
              animation: pangxie 2s;
              transition: all 2s;
              &:hover {
                transform: rotate(-1835deg);
                left: -20vw;
                bottom: 68vh;
              }
            }
          }
        }
      }
    }
    .bg-bubbles {
      position: absolute;
      top: -20vh;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      li {
        list-style: none;
        position: absolute;
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
        &:nth-of-type(5) {
          width: 20vw;
          height: 20vw;
          animation-delay: 17s;
        }
        &:nth-of-type(6) {
          width: 35vw;
          height: 35vw;
          animation-delay: 23s;
          background-color: rgba(255, 255, 255, 0.2);
        }
        &:nth-of-type(7) {
          width: 25vw;
          height: 25vw;
          animation-delay: 12s;
        }
        &:nth-of-type(8) {
          width: 20vw;
          height: 20vw;
          animation-delay: 45s;
        }
        &:nth-of-type(9) {
          width: 15vw;
          height: 15vw;
          animation-delay: 2s;
          background-color: rgba(255, 255, 255, 0.3);
        }
        &:nth-of-type(10) {
          width: 26vw;
          height: 26vw;
        }
        &:nth-of-type(11) {
          width: 28vw;
          height: 28vw;
          animation-delay: 8s;
        }
        &:nth-of-type(12) {
          width: 33vw;
          height: 33vw;
          animation-delay: 30s;
        }
      }
    }
    @keyframes square-one {
      0% {
        left: 0;
        top: 0;
      }
      20% {
        width: 58vw;
        height: 58vw;
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
      /*25% {*/
      /*width:58vw;*/
      /*height:58vw;*/
      /*transform: translate(120vw,80vh) rotate(180deg);*/
      /*}*/
      /*50% {*/
      /*transform: translate(-20vw,50vh) rotate(280deg);*/
      /*}*/
      /*75% {*/
      /*transform: translate(50vw, 120vh) rotate(380deg);*/
      /*}*/
      100% {
        transform: rotate(-1835deg);
        left: 66vw;
        bottom: -8vh;
      }
    }
  }

  @media screen and (min-width: 640px) {
  }
</style>
