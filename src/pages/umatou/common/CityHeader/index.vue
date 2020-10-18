<template>
  <header  @click="handleCityChange">
    <span class="logo">优鲜码头</span>
    <div class="search" @click.stop="goToSearch">
      <img src="../../../../assets/images/search.png"/>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  export default {
    methods: {
      handleCityChange() {
        Toast({
          message: '该功能暂未开发'
        })
      },
      goToSearch() {
        this.$router.push({name: '商品搜索'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../less/variables";

  header {
    position: absolute;
    left: 0;
    top: 0;
    width:100%;
    height: 100rem/@baseFontSize;
    display: flex;
    align-items: center;
    z-index: 999;
    background-color: #57bc2f;
    .logo{
      margin-left: 10rem/@baseFontSize;
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
    }
    .search {
      margin-left: 10rem/@baseFontSize;
      margin-right: 10rem/@baseFontSize;
      cursor: text;
      border-radius: 90rem/@baseFontSize;
      background-color: #fff;
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
