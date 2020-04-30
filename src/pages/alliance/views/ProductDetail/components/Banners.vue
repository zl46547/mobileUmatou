<template>
  <div id="banners" v-if="banners">
    <Swipe indicator-color="white" :autoplay="3000">
      <SwipeItem v-for="(item,index) in banners" :key="index">
        <img :src="item" class="slide-image"/>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem } from 'vant'
  export default {
    props: {
      banners: {
        require: true,
        type: Array,
        default: () => []
      }
    },
    components: {
      Swipe,
      SwipeItem
    }
  }
</script>

<style lang="less" scoped>
  #banners {
    width: 100%;
      img {
        display: block;
        width: 100%;
      }
  }
</style>
