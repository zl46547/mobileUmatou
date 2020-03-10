<template>
  <div class="search-wapper">
    <SearchBar ref="searchBar"/>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBar from './components/SearchBar'
  export default {
    components: {
      SearchBar
    },
    computed: {
      showSearchResult() {
        return this.$store.state.tkTools.keywordSearchResult
      },
      historySearch() {
        return this.$store.state.tkTools.historySearch
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
