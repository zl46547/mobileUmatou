<template>
  <div class="product">

  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    props: {
      productInfo: {
        required: true,
        type: Object
      },
      productInfoServices: {
        required: true
      },
      productActivities: {
        required: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .product {
    margin-top: 80rem/@baseFontSize;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none
    }

    -webkit-overflow-scrolling: touch;
  }
</style>
