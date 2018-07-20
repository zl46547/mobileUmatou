<template>
  <header>
    <!--<router-link class="iconfont icon-back" :to="{name :'首页'}"-->
    <!--v-if="$route.matched[0].path == '/category'"></router-link>-->
    <!--<router-link class="iconfont icon-back" :to="{name :'用户页'}"-->
    <!--v-if="$route.matched[0].path == '/allOrders'"></router-link>-->
    <!--<span class="iconfont icon-back" @click="$router.go(-1)"-->
    <!--v-if="$route.matched[0].path != '/category' && $route.matched[0].path != '/allOrders'"></span>-->
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
  @import "../assets/fz";

  header {
    position: absolute;
    left: 0;
    top:0;
    width:100%;
    height:8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 4vw;
    padding-left:4vw;
    z-index: 999;
    background-color: #fafafa;
    box-shadow: 0 0.5px 20px rgb(221, 221, 221);
    .icon-back{
      margin-right:2vw;
    }
    h1 {
      .fz(font-size, 34);
      letter-spacing: .2vw;
      font-weight: 600;
    }
  }
    /*background-color: #fdfdfd;
    text-align: center;
    padding: 0 2vw;
    width: 100vw;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon-go {
      margin-left: 3vw;
      cursor: pointer;
    }
    h1 {
      .fz(font-size, 34);
      letter-spacing: .2vw;
      font-weight: 600;
    }
    span, a {
      display: inline-block;
      .fz(font-size, 46);
      &::before {
        color: #333;
      }
    }
    div {
      width: 11vw;
    }*/
  /*}*/

  @media screen and (min-width: 768px) {
    /*header {*/
      /*width: 744px;*/
      /*margin: 0 auto;*/
      /*padding: 0 12px;*/
      /*.icon-go {*/
        /*margin-left: 18px;*/
      /*}*/
      /*h1 {*/
        /*margin-right: 0px;*/
        /*font-size: 20px;*/
      /*}*/
      /*div {*/
        /*width: 26px;*/
      /*}*/
    /*}*/
  }
</style>
