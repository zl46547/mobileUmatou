<template>
    <div id="adverise" v-if='adverise'>
      <!--<swiper indicator-dots="true" autoplay="true" circular="true">-->
        <!--<block v-for="(item,index) in adverise" :key="index">-->
          <!--<swiper-item>-->
            <!--<image :src="item.PicUrl" class="slide-image" mode="aspectFit"/>-->
          <!--</swiper-item>-->
        <!--</block>-->
      <!--</swiper>-->
      <mt-swipe :auto="4000" :interval="4000">
        <mt-swipe-item v-for="k in adverise" :key="k.Id">
          <img :src="k.PicUrl">
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem } from 'mint-ui'
export default {
  props: ['adverise'],
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  }
}
</script>

<style lang="less" scoped>
  #adverise {
    width: 100%;
    max-width: 640px;
    height:150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (min-width: 400px) {
    #adverise {
      height:200px;
    }
  }
</style>
