<template>
  <div class="search-tip">
    <div v-if="searchTip && searchTip.length>0">
      <div class="select-item van-hairline--bottom"
           v-for="(item,index) in searchTip"
           :key="index"
           @click="handleSelected(item.Key)">
        {{item.Key}}
      </div>
    </div>
    <div v-else>
      <div class="select-item">未找到相关商品</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {}
    },
    methods: {
      handleSelected(keyword) {
        this.$store.state.products.searchTip = null
        this.$parent.$refs.searchBar.keywords = keyword
        this.$parent.$refs.searchBar.handleSearch()
      }
    },
    computed: {
      searchTip() {
        return this.$store.state.products.searchTip
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-tip {
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;

    .select-item {
      color: #666;
      font-size: 1.2rem;
      background-color: #fff;
      padding: 1.3rem;
    }
  }
</style>
