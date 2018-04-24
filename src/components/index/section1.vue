<template lang="html">
    <section class="section1" v-if="section1">
      <ul class="section1-list">
        <li v-for="k in section1.list" :key="k.id">
          <router-link :to="{name:'详情页'}" >
            <img v-lazy="k.imgPath" alt="">
          </router-link>
        </li>
      </ul>
      <router-link :to="{name:'详情页'}" class="section1-banner">
        <img v-lazy="section1.banner" alt="">
      </router-link>
    </section>
</template>

<script type="text/ecmascript-6">

export default {
  props: ['section1']
}
</script>

import { Lazyload } from 'mint-ui'
<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
  .section1 {
    .section1-list {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 2vw 4vw 2vw;
      li {
        width:33.3%;
        padding: 1vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        a,img {
          width:100%;
          display: block;
        }
      }
    }
    .section1-banner {
      display: block;
      width:100vw;
      img {
        width:100%;
        height:38vw;
      }
    }
  }

@media screen and (min-width: 768px) {
  .section1 .section1-banner {
    display: block;
    width:768px;
    a,img {
      width:768px;
      height:258px;
    }
  }
}
</style>
