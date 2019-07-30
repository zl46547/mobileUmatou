<template>
    <div id="adverise" v-if='adverise'>
      <Swipe :autoplay="4000" @change="onChange">
        <SwipeItem v-for="k in adverise" :key="k.Id">
          <img :src="k.PicUrl">
        </SwipeItem>
        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/{{adverise.length}}
        </div>
      </Swipe>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem } from 'vant'
export default {
  props: ['adverise'],
  watch: {
    adverise() {
      this.current = 0
    }
  },
  data() {
    return {
      current: 0
    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  methods: {
    onChange(index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
  #adverise {
    width: 100%;
    max-width: 640px;
    height:120px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      color: #fff;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
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
