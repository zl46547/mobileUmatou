<template>
  <div class="search-wapper">
    <SearchBar @handle-search="handleSearch"/>
    <KeywordPanel/>
    <!--<div class="search-container" v-else>-->
      <!--<SearchResult/>-->
    <!--</div>-->
    <SearchTip/>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBar from './components/SearchBar'
  import KeywordPanel from './components/KeywordPanel'
  import SearchTip from './components/SearchTip'
  export default {
    data() {
      return {
        showSearchResult: null
      }
    },
    components: {
      SearchBar,
      KeywordPanel,
      SearchTip
    },
    computed: {
    },
    methods: {
      handleSearch(value) {
        this.showSearchResult = value
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
