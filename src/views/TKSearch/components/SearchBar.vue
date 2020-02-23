<template>
  <div class="search-bar van-hairline--bottom">
    <i class="icon iconfont icon-arrow-left" @click="goBack"></i>
    <div class="search-input">
      <i class="iconfont icon-search"></i>
      <Field placeholder="请输入商品名称"
             clearable
             v-model="keyword"
             autofocus
             @keyup.enter="handleSearch"
      />
    </div>
    <div class="search-btn" @click="handleSearch()">搜索</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Field } from 'vant'
  import {
    HISTORY_SEARCH,
    MATERIAL_SEARCH_RESULT
  } from '../../../vuex/types'
  import {materialSearch} from '../service'
  export default {
    data() {
      return {
        keyword: null
      }
    },
    components: {
      Field
    },
    watch: {
      keyword: {
        immediate: true,
        handler(value) {
          if (!value) {
            this.$router.replace({
              path: '/TKSearch/keyword'
            })
          }
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      /**
       * 点击搜索
       */
      handleSearch() {
        if (!this.keyword) {
          return false
        }
        materialSearch({keyword: this.keyword}).then(res => {
          if (res.result_list) {
            this.$store.commit(MATERIAL_SEARCH_RESULT, res.result_list.map_data)
            this.$store.commit(HISTORY_SEARCH, this.keyword)
            this.$router.push({
              path: '/TKSearch/result'
            })
          }
        })
      }
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
