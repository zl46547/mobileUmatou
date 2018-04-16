<template>
  <div>
    <!--<div class="productName">{{getProductInfo.ProductName}}</div>-->
    <!--<div class="price">-->
      <!--<span>¥</span>-->
      <!--<span>{{getPrice[0]}}</span>-->
      <!--<span>.</span>-->
      <!--<span>{{getPrice[1]}}</span>-->
      <!--<span>/{{getProductInfo.Unit}}</span>-->
    <!--</div>-->
    <!--<div class="marketPrice">-->
      <!--市场价：-->
      <!--<p>{{getProductInfo.DefaultMoney}}</p>-->
      <!--<p>已售{{getProductInfo.SoldNumber}}</p>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['productInfo'],
    components: {},
    mounted() {
      console.log(this.productInfo)
    },
//    computed: {
//      getPrice() {
//        var vm = this
//        var price = vm.getProductInfo.PeriodMoney.split('.')
//        return price
//      },
//      getProductInfo() {
//        var vm = this
//        if (vm.productInfo === '') {
//          vm.productInfo = vm.product
//        }
//        return vm.productInfo
//      }
//    },
    data() {
      return {
        product: {
          ProductName: '',
          PeriodMoney: 0,
          Unit: '',
          DefaultMoney: '',
          SoldNumber: ''
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .productName {
    margin-bottom: .5rem;
    font-size: 1.125rem;
    color: #333;
  }

  .price {
    font-size: .875rem;
    color: #ff3e3e;
  }

  .price span:nth-of-type(2) {
    font-size: 1.25rem;
  }

  .price span:nth-of-type(5) {
    color: #999;
  }

  .marketPrice {
    color: #999;
  }

  .marketPrice p:nth-of-type(1) {
    text-decoration: line-through;
    float: left;
  }

  .marketPrice p:nth-of-type(2) {
    float: right;
  }
</style>
