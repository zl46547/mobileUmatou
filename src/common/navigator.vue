<template>
  <header>
    <div class="back" @click="goBack">
      <i class="icon iconfont icon-arrow-left"></i>
    </div>
    <div class="title">
      <slot name="title"></slot>
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
      goBack() {
        var vm = this
        vm.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  header {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-color: #fff;
    max-width:640px;
    width:100%;
    height: 45px;
    display: flex;
    flex: 1;
    align-items: center;
    z-index: 999;
    box-shadow: 0 0.5px 5px rgba(219, 219, 219, 0.48);
    .back{
      width:50px;
      text-align: center;
      cursor: pointer;
      i{
        font-size:1.8rem;
      }
    }
    .title{
      width:100%;
      margin-left: -25px;
      text-align: center;
      font-size:1.3rem;
    }
  }

  @media screen and (min-width: 400px) {
    header {
      height: 50px;
    }
  }
</style>
