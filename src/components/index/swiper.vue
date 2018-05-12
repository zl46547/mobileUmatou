<template>
    <div v-if='adverise'>
      <mt-swipe :auto="4000" :interval="4000">
        <mt-swipe-item v-for="k in adverise" :key="k.Id">
          <router-link :to="{ name: '详情页'}">
            <img :src="k.PicUrl">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ['adverise']
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
