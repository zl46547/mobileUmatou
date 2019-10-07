<template>
  <div class="search-bar van-hairline--bottom">
    <i class="icon iconfont icon-arrow-left" @click="goBack"></i>
    <div class="search-input">
      <i class="iconfont icon-search"></i>
      <Field placeholder="请输入商品名称"
             @input="handleChange"
             clearable
             v-model="keywords"
      />
    </div>
    <div class="search-btn" @click="handleSearch()">搜索</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Field } from 'vant'
  import utils from '../../../util/common'
  import {
    KEYWORD_SUGGEST_REQUEST,
    KEYWORD_SEARCH_RESULT_REQUEST
  } from '../../../vuex/types'
  export default {
    props: {
    },
    data() {
      return {
        keywords: null
      }
    },
    components: {
      Field
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      /**
       * 点击搜索
       */
      handleSearch() {
        if (!this.keywords) {
          return false
        }
        let params = {
          keyword: this.keywords,
          pageIndex: 1,
          pageSize: 20
        }
        this.$store.dispatch(KEYWORD_SEARCH_RESULT_REQUEST, params)
      },
      /**
       * 搜索提示
       */
      handleChange: utils.debounce(function (keywords) {
        this.$store.dispatch(KEYWORD_SUGGEST_REQUEST, {
          keywords
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
      .van-cell{
        background-color: transparent;
        padding: 0 1rem;
      }
    }
    .search-btn{
      color: #262626;
      padding: 1rem;
      font-size: 1.6rem;
    }
  }
</style>
