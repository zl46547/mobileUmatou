<template>
  <div v-if='adverise'>
    <mt-swipe :auto="4000" :interval="4000">
      <mt-swipe-item v-for="k in adverise" :key="k.Id">
        <router-link :to="{ name: '广告',params:{'type':k.JumpValue}}">
          <img :src="k.PicUrl">
        </router-link>
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
  .mint-swipe {
    width: 100%;
    height: 30vh;
    a, img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (min-width: 640px) {
    .mint-swipe {
      height: 40vh;
      a, img {
        display: block;
        width: 640px;
      }
    }
  }
</style>
