<template>
  <div id="price">
    <div class="content">
      <div class="productName">{{response.ProductInfo.ProductName}}</div>
      <div class="price">
        <span>¥</span>
        <span>{{response.ProductInfo.PeriodMoney}}</span>
        <span>/{{response.ProductInfo.Unit}}</span>
      </div>
      <div class="marketPrice">
        <div>
          <p>市场价：</p>
          <p>{{response.ProductInfo.DefaultMoney}}</p>
          <p>元/{{response.ProductInfo.Unit}}</p>
        </div>
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

<style lang="less" scoped>
  #price{
    width:100%;
    background-color: #fff;
    margin-bottom: 1px;
    .content{
      padding: 3vw 5vw;
      .productName {
        margin-bottom: 1vh;
        font-size: 1.3rem;
        color: #333;
      }
      .price {
        font-size: 1rem;
        color: #ff3e3e;
        span{
          &:nth-of-type(2) {
            font-size: 1.5rem;
          }
          &:nth-of-type(3) {
            color: #999;
            letter-spacing: 2px;
            font-size:1rem;
          }
        }
      }
      .marketPrice {
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >div{
          display: flex;
          align-items: baseline;
          P{
            &:nth-of-type(1){
              font-size:1.3rem;
            }
            &:nth-of-type(2),&:nth-of-type(3){
              font-size:1.2rem;
              letter-spacing: 2px;
              text-decoration: line-through;
            }
          }
        }
        >p{
          font-size:1.2rem;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    #price{
      width:640px;
      .content{
        padding: 20px 35px;
        .productName {
          font-size: 1.8rem;
        }
        .price {
          font-size: 1.5rem;
          span{
            &:nth-of-type(2) {
              font-size: 2rem;
            }
            &:nth-of-type(3) {
              font-size:1.4rem;
            }
          }
        }
        .marketPrice {
          >div{
            P{
              &:nth-of-type(1){
                font-size:1.5rem;
              }
              &:nth-of-type(2),&:nth-of-type(3){
                font-size:1.4rem;
              }
            }
          }
          >p{
            font-size:1.4rem;
          }
        }
      }
    }
  }
</style>
