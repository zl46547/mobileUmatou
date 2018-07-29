<template>
  <div >
    <div class="defaultHome" v-for="item in defaultHome" :key="item.Id" v-if="defaultHome">
      <!-- 小标题 -->
      <div class="title" v-if="item.ChildTitle">
        <p>{{item.FatherTitle}}</p>
        <p>{{item.ChildTitle}}</p>
      </div>
      <!-- 左上下 -->
      <div class="flex" v-if="parseInt(item.FloorType) === 1">
        <div>
          <router-link :to="{name:'详情页'}">
            <img :src="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50">
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'详情页'}">
            <img :src="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50">
          </router-link>
          <router-link :to="{name:'详情页'}">
            <img :src="item.PicAdvItems[2].BackGroundImg" alt="" class="width-50">
          </router-link>
        </div>
      </div>
      <!-- 上下右 -->
      <div class="flex" v-if="parseInt(item.FloorType) === 2">
        <div>
          <router-link :to="{name:'详情页'}">
            <img :src="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50">
          </router-link>
          <router-link :to="{name:'详情页'}">
            <img :src="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50">
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'详情页'}">
            <img :src="item.PicAdvItems[2].BackGroundImg" alt="" class="width-50">
          </router-link>
        </div>
      </div>
      <!-- 一列 -->
      <div class="flex" v-if="parseInt(item.FloorType) === 7">
        <router-link :to="item.PicAdvItems[0].routerlink">
          <img :src="item.PicAdvItems[0].BackGroundImg" alt="" class="width-100">
        </router-link>
      </div>
      <!-- 两列 -->
      <div class="flex" v-if="parseInt(item.FloorType) === 6">
        <router-link :to="item.PicAdvItems[0].routerlink">
          <img :src="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50">
        </router-link>
        <router-link :to="item.PicAdvItems[1].routerlink">
          <img :src="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50">
        </router-link>
      </div>
      <!-- 三列 -->
      <div class="flex" v-if="parseInt(item.FloorType) === 4">
        <router-link :to="item.PicAdvItems[0].routerlink">
          <img :src="item.PicAdvItems[0].BackGroundImg" alt="" class="width-33">
        </router-link>
        <router-link :to="item.PicAdvItems[1].routerlink">
          <img :src="item.PicAdvItems[1].BackGroundImg" alt="" class="width-33">
        </router-link>
        <router-link :to="item.PicAdvItems[2].routerlink">
          <img :src="item.PicAdvItems[2].BackGroundImg" alt="" class="width-33">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['defaultHome']
  }
</script>

import { Lazyload } from 'mint-ui'
<style lang="less" scoped>
  @import "../../assets/fz.less";

  .defaultHome {
    background-color: #fff;
    .title {
      text-align: center;
      margin: 2vh 0;
      padding-top:2vh;
    }
    .title p:nth-of-type(1) {
      font-size: 4vw;
      margin-bottom: 1vh;
    }
    .title p:nth-of-type(2) {
      font-size: 1vw;
      color: #999;
    }
    .flex {
      width: 100vw;
      display: flex
    }
    .width-50 {
      width: 50vw;
    }
    .width-100 {
      width: 100vw;
    }
    .width-33 {
      width: 33.3vw;
    }
  }

  @media screen and (min-width: 640px) {
    .defaultHome {
      .title {
        padding-top:10px;
        margin: 10px 0
      }
      .title p:nth-of-type(1) {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .title p:nth-of-type(2) {
        font-size: 5px;
      }
      .flex {
        width: 640px;
      }
      .width-50 {
        width: 320px;
      }
      .width-100 {
        width: 640px;
      }
      .width-33 {
        width: 213.3px;
      }
    }
  }
</style>
