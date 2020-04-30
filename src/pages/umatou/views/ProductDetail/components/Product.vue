<template>
  <div class="product">
    <Banners :banners="productInfo.banners"/>
    <Price :price="productInfo"></Price>
    <Service :service="productInfoServices"
             :activity="productActivities"
             :lastTime="productInfo"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import Banners from './Banners'
  import Price from './Price'
  import Service from './Service'

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
    },
    components: {
      Banners,
      Price,
      Service
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

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
