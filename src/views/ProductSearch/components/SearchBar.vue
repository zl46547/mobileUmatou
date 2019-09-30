<template>
  <div class="search-bar van-hairline--bottom">
    <i class="icon iconfont icon-arrow-left" @click="goBack"></i>
    <div class="search-input">
      <i class="iconfont icon-search"></i>
      <input type="text"
             v-model="keywords"
             placeholder="请输入商品名称"
      />
    </div>
    <div class="search-btn" @click="handleSearch()">搜索</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import utils from '../../../util/common'
  import {KEYWORD_SUGGEST_REQUEST} from '../../../vuex/types'
  export default {
    props: {
    },
    data() {
      return {
        keywords: null
      }
    },
    components: {
    },
    watch: {
      keywords(value) {
        this.handleChange(value)
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      /**
       * 点击搜索
       */
      handleSearch(keywords) {
      },
      /**
       * 搜索提示
       */
      handleChange: utils.debounce(function (value) {
        this.$store.dispatch(KEYWORD_SUGGEST_REQUEST, {
          keywords: this.keywords
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  .search-bar {
    display: flex;
    align-items: center;
    height: 5rem;
    box-sizing: border-box;
    background-color: #fff;
    .icon-arrow-left{
      width: 3rem;
      text-align: center;
      cursor: pointer;
      display: block;
      font-size:1.5rem;
    }
    .search-input{
      flex: 1;
      display: flex;
      align-items: center;
      border-radius: 90rem;
      background-color: #f5f5f5;
      padding: .5rem .5rem .5rem 1rem;
      input{
        background-color: transparent;
        width: 100%;
        display: inline-block;
        vertical-align: middle;
        margin-left: 1rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #666;
      }
    }
    .search-btn{
      color: #262626;
      padding: 1rem;
      font-size: 1.6rem;
    }
  }
</style>
