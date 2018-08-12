<template>
  <div id="app">
    <router-view></router-view>
    <v-loading v-show="fetchLoading"></v-loading>
  </div>
</template>

<script>
  import Loading from '@/common/_loading'

  export default {
    components: {
      'v-loading': Loading
    },
    computed: {
      fetchLoading () {
        return this.$store.state.detail.fetchLoading
      }
    }
  }
</script>

<style lang="less">
  /* 加载字体样式 */
  @import "./assets/font/iconfont.css";
  /* 初始化页面样式 */
  html, body, #app {
    width: 100%;
    height: 100%;
    background-color: #fff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size:12px;
  }
  body,
  dd,
  dl,
  dt,
  fieldset,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  html,
  img,
  legend,
  li,
  ol,
  p,
  ul {
    margin: 0;
    padding: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  button,
  fieldset,
  img,
  input {
    border: none;
    padding: 0;
    margin: 0;
    outline-style: none;
  }

  ul, li {
    background-color: #ffffff;
  }

  ol,
  ul {
    list-style: none;
  }

  input {
    padding-top: 0;
    padding-bottom: 0;
    font-family: "SimSun", "宋体";
  }

  input,
  select {
    vertical-align: middle;
  }

  input,
  select,
  textarea {
    font-size: 12px;
    margin: 0;
  }

  textarea {
    resize: none;
  }

  /*防止拖动*/
  img {
    border: 0;
    vertical-align: middle;
  }

  /*  去掉图片低测默认的3像素空白缝隙*/
  table {
    border-collapse: collapse;
  }

  //去斜体
  i {
    font-style: normal
  }

  body {
    font-family: PingFangSC-Light, helvetica, 'Heiti SC';
    color: #666;
    background-color: #e1e1e1;
    -webkit-tap-highlight-color: #f2f2f2;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-decoration: none;
    font-weight: normal;
    font-size: 100%;
    font-family: PingFangSC-Light, helvetica, 'Heiti SC';
  }

  .ac {
    text-align: center;
  }
  .clearFloat:after{
    content: '';
    height:0;
    line-height:0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  .el-notification.right {
    top: 40% !important;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    .el-notification__icon {
      font-size: 2.5rem;
    }
    .el-notification__group {
      width:100%;
      margin-left: 0;
      .el-notification__title {
        text-align: center;
        font-size: 2rem;
      }
      .el-notification__content {
        font-size: 1.3rem;
        text-align: center;
        margin: 0.7rem 0 0;
      }
    }
  }
  /* 修改messagebox默认样式 */
  .el-message-box {
    width: 80vw;
  }
  @media screen and (min-width: 640px) {
    #app {
      width: 640px;
      margin: 0 auto;
      height: 100%;
      background-color: #fff;
    }
    .el-notification.right {
      width: 40%;
    }
    /* 修改messagebox默认样式 */
    .el-message-box {
      width: 480px;
    }
  }
</style>
