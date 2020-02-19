<template>
  <header >
    <div class="search" @click.stop="goToSearch">
      <img src="../../assets/images/search.png"/>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goToSearch() {
        this.$router.push({name: '淘客商品搜索'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  header {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    width:100%;
    height: 100rem/@baseFontSize;
    display: flex;
    align-items: center;
    z-index: 999;
    border-bottom: 1px solid rgba(219, 219, 219, 0.48);
    .search {
      margin-left: 10rem/@baseFontSize;
      margin-right: 10rem/@baseFontSize;
      cursor: text;
      border-radius: 90rem/@baseFontSize;
      background-color: #eee;
      flex: 1;
      height: 70%;
      display: flex;
      align-items: center;
      img{
        margin: auto;
        width: 35%;
        display: block;
      }
    }
  }
</style>
