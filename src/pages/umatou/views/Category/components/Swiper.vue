<template>
  <div class="swiper">
    <Swipe :autoplay="4000" @change="onChange">
      <SwipeItem v-for="item in adverse" :key="item.Id">
        <img :src="item.PicUrl">
      </SwipeItem>
      <div class="custom-indicator" slot="indicator">
        {{ current + 1 }}/{{adverse.length}}
      </div>
    </Swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem } from 'vant'

  export default {
    props: {
      adverse: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    watch: {
      adverse () {
        this.current = 0
      }
    },
    data () {
      return {
        current: 0
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    methods: {
      onChange (index) {
        this.current = index
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .swiper {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .custom-indicator {
      position: absolute;
      right: 15rem/@baseFontSize;
      bottom: 15rem/@baseFontSize;
      padding: 5rem/@baseFontSize 10rem/@baseFontSize;
      color: #fff;
      font-size: 20rem/@baseFontSize;;
      background: rgba(0, 0, 0, 0.1);
    }
  }
</style>
