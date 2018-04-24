<template>
  <section class="sectionFish" v-if="sectionFish">
    <router-link :to="{name:'详情页'}" class="sectionFish-banner">
      <img v-lazy="sectionFish.banner" alt="">
    </router-link>
    <ul class="sectionFish-list">
      <li v-for="k in sectionFish.list" :key="k.id">
        <router-link :to="{name:'详情页'}">
          <img v-lazy="k.imgPath" alt="">
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['sectionFish']
  }
</script>

import { Lazyload } from 'mint-ui'
<style lang="less" scoped>
  @import "../../assets/fz.less";
  @import "../../assets/index/style.css";

  .sectionFish {
    .sectionFish-list {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 2vw 4vw 2vw;
      li {
        width: 33.3%;
        padding: 1vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        a, img {
          width: 100%;
          display: block;
        }
      }
    }
    .sectionFish-banner {
      display: block;
      width: 100vw;
      img {
        width: 100%;
        height: 38vw;
      }
    }
  }
  @media screen and (min-width: 768px) {
    .sectionFish .sectionFish-banner {
      display: block;
      width:768px;
      a,img {
        width:768px;
        height:258px;
      }
    }
  }
</style>
