<template>
  <div class="keyword-panel van-hairline--bottom">
    <div class="title">热门搜索</div>
    <div class="keyword-list">
        <span v-for="item in searchHotList"
              :key="item.Id"
              class="item-box"
              @click="handleKeyWord(item)">{{item.HotWordName}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {productHotWord} from '../service'

  export default {
    mounted() {
      productHotWord().then(res => {
        this.searchHotList = res
      })
    },
    data() {
      return {
        searchHotList: []
      }
    },
    methods: {
      handleKeyWord(val) {
        this.$invoke('SearchBar', 'handleSearch', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .keyword-panel {
    background-color: #fff;
    box-sizing: border-box;
    .title{
      box-sizing: border-box;
      padding: 1.6rem 0 1.4rem 1.3rem;
      font-size: 1.8rem;
      color: #666;
      font-weight: bold;
    }
    .keyword-list{
      display: flex;
      flex-wrap: wrap;
      padding: 0 1.3rem;
      .item-box {
        margin-right: 1.2rem;
        margin-bottom: 1.2rem;
        display: inline-block;
        color: #262626;
        padding: .6rem 1.3rem;
        background: #f6f5f5;
        border-radius: .5rem;
        font-size: 1.3rem;
      }
    }
  }
</style>
