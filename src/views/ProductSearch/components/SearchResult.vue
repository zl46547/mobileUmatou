<template>
  <div class="search-result">
    <div class="title">查询结果</div>
    <div class="search-result-list"
         v-if="searchRes && searchRes.SourceData.length > 0">
      <ProductItem v-for="item in searchRes.SourceData"
                   :key="item.ProductId"
                   :productItem="item"
      />
    </div>
    <Empty v-else/>
  </div>
</template>

<script type="text/ecmascript-6">
  import ProductItem from './ProductItem'
  import Empty from './Empty'

  export default {
    computed: {
      searchRes() {
        return this.$store.state.products.keywordSearchResult
      }
    },
    components: {
      ProductItem,
      Empty
    }
  }
</script>

<style lang="less" scoped>
  .search-result {
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    .title {
      box-sizing: border-box;
      padding: 1.6rem 0 1.4rem 1.3rem;
      font-size: 1.8rem;
      color: #666;
      font-weight: bold;
    }
    .search-result-list{
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
