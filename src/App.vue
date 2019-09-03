<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-show="fetchLoading"></Loading>
  </div>
</template>

<script>
  import Loading from '@/common/_loading'

  export default {
    components: {
      Loading
    },
    computed: {
      fetchLoading () {
        return this.$store.state.detail.fetchLoading
      }
    }
  }
</script>

<style lang="less">
  @import "./less/index.less";
</style>
