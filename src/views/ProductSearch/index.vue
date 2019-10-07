<template>
  <div class="search-wapper">
    <SearchBar ref="searchBar"/>
    <SearchTip v-if="showSearchTip"/>
    <KeywordPanel v-show="!showSearchResult"/>
    <SearchResult v-if="showSearchResult"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBar from './components/SearchBar'
  import KeywordPanel from './components/KeywordPanel'
  import SearchTip from './components/SearchTip'
  import SearchResult from './components/SearchResult'
  export default {
    components: {
      SearchBar,
      KeywordPanel,
      SearchTip,
      SearchResult
    },
    computed: {
      showSearchResult() {
        return this.$store.state.products.keywordSearchResult
      },
      showSearchTip() {
        return this.$store.state.products.searchTip
      }
    },
    methods: {
      handleSearch(value) {
        this.showSearchResult = value
      }
    }
  }
</script>

<style lang="less" scoped>
.search-wapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
