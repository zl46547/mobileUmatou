<template>
    <div id="adverise" v-if='adverise'>
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
    height:120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (min-width: 400px) {
    #adverise {
      height:160px;
    }
  }
  @media screen and (min-width: 500px) {
    #adverise {
      height:200px;
    }
  }
</style>
