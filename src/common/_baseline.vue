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
    margin-bottom: 13vw;
    padding:3vw 0;
    background-color: #f9f9f9;
    img {
      width:55vw;
    }
  }
  @media screen and (min-width: 768px) {
    div {
      margin-bottom: 55px;
      img {
        width:255px;
        margin: 0 auto;
      }
    }
  }
</style>
