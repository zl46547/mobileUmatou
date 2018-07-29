<template>
  <div>
    <img src="../assets/images/baseline.png" alt="">
  </div>

</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  div {
    text-align: center;
    padding:3vw 0;
    background-color: #f9f9f9;
    img {
      width:55vw;
    }
  }
  @media screen and (min-width: 640px) {
    div {
      img {
        width:255px;
        margin: 0 auto;
      }
    }
  }
</style>
