<template lang="html">
    <mt-swipe :auto="4000" v-if='swiperData' :interval="4000">
      <mt-swipe-item v-for="k in swiperData" :key="k.id">
        <router-link :to="{ name: '详情页'}">
          <img :src="k.imgPath">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script type="text/ecmascript-6">

export default {
  props: ['swiperData']
}
</script>

<style lang="less" scoped>
.mint-swipe {
  width: 100%;
  height:50vw;
  a,img {
    display: block;
    width: 100%;
    height:100%;
  }
}
@media screen and (min-width: 768px) {
  .mint-swipe{
    height:404px;
    a,img {
      display: block;
      width: 768px;
      height:404px;
    }
  }
}
</style>
