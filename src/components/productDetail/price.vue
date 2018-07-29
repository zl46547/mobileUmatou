<template>
  <div class="content">
    <div>
      <div class="productName">{{response.ProductInfo.ProductName}}</div>
      <div class="price">
        <span>¥</span>
        <span>{{response.ProductInfo.PeriodMoney}}</span>
        <span>/{{response.ProductInfo.Unit}}</span>
      </div>
      <div class="marketPrice clearFloat">
        <p>市场价：</p>
        <p>{{response.ProductInfo.DefaultMoney}}</p>
        <p>元/{{response.ProductInfo.Unit}}</p>
        <p>已售{{response.ProductInfo.SoldNumber}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['response'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .content{
    width:100%;
    background-color: #fff;
    margin-bottom: 1px;
  }
  .content>div{
    padding: 3vw 5vw;
  }
  .productName {
    margin-bottom: .5rem;
    font-size: 1.125rem;
    color: #333;
  }

  .price {
    font-size: 1rem;
    color: #ff3e3e;
  }

  .price span:nth-of-type(2) {
    font-size: 1.25rem;
  }

  .price span:nth-of-type(3) {
    color: #999;
    letter-spacing: 2px;
  }

  .marketPrice {
    color: #999;
  }

  .marketPrice p:nth-of-type(1),p:nth-of-type(2),p:nth-of-type(3)  {
    float: left;
  }
  .marketPrice p:nth-of-type(2),p:nth-of-type(3)  {
    text-decoration: line-through;
    font-size:19px;
    letter-spacing: 2px;
  }

  .marketPrice p:nth-of-type(3)  {
    font-size:16px;
  }
  .marketPrice p:nth-of-type(4) {
    float: right;
  }

  @media screen and (min-width: 640px) {
    .content>div{
      padding: 15px 25px;
    }
  }
</style>
