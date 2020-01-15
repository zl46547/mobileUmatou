<template>
  <div id="TK-skill-bag">
    <div class="content">
      <img src="../../assets/images/skillBags/0.gif" alt="">
      <img src="../../assets/images/skillBags/1.gif" alt="">
      <img src="../../assets/images/skillBags/2.gif" alt="">
      <img src="../../assets/images/skillBags/3.gif" alt="">
      <img src="../../assets/images/skillBags/4.gif" alt="">
      <img src="../../assets/images/skillBags/5.gif" alt="">
      <img src="../../assets/images/skillBags/6.gif" alt="">
      <img src="../../assets/images/skillBags/7.gif" alt="">
      <img src="../../assets/images/skillBags/8.gif" alt="">
      <img src="../../assets/images/skillBags/9.gif" alt="">
    </div>
    <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-skill-bag {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: #feca43;
    .content {
      flex: 1;
      overflow-y: auto;
      img{
        display: block;
        width:100%;
      }
    }
    .icon-fanhui{
      display: block;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      color: #555;
      font-size: 4rem;
    }
  }
</style>
