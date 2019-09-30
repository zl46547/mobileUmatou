<template>
  <div class="search-tip">
    <div v-if="searchTip && searchTip.length>0">
      <div class="select-item van-hairline--bottom"
           v-for="item in searchTip"
           :key="item.ProductId"
           @click="goToDetail(item)">
        {{item.displayName}}
      </div>
      <!--<div wx:if="{{keywords && searchTip && searchTip.length <= 0}}">-->
      <!--<div class="select-item">未找到相关商品</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { keywordSuggest } from '../service'

  export default {
    data () {
      return {
      }
    },
    methods: {
      handleKeyWord (val) {
      }
    },
    computed: {
      searchTip() {
        console.log(this.$store.state.products.searchTip)
        return this.$store.state.products.searchTip
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-tip {
    position: absolute;
    top: 92 rpx;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    .select-item {
      color: #666;
      font-size: 30 rpx;
      background-color: #fff;
      padding: 24 rpx;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
