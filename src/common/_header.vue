<template>
  <header>
    <span class="iconfont icon-back" @click="$router.go(-1)" v-if="typeName === -1"></span>
    <router-link class="iconfont icon-back" v-else :to="{name :typeName}"></router-link>
    <slot name="title"></slot>
    <div>&nbsp;</div>
  </header>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      typeName: {
        default: -1
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/font/iconfont.css";

  header {
    position: absolute;
    left: 50%;
    top:0;
    margin-left: -50%;
    width:100%;
    height:8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
    background-color: #fafafa;
    box-shadow: 0 0.5px 20px rgb(221, 221, 221);
    .icon-back{
      cursor: pointer;
      padding-left:4vw;
      font-size: 2rem;
    }
    h1 {
      font-size:1.5rem;
      letter-spacing: .2vw;
      font-weight: 600;
    }
  }

  @media screen and (min-width: 640px) {
    header {
      margin-left: -320px;
      width:640px;
      .icon-back{
        padding-left:28px;
        font-size: 2.2rem;
      }
      h1 {
        font-size:1.7rem;
      }
    }
  }
</style>
