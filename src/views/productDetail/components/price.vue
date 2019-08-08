<template>
  <div id="price">
    <div class="content">
      <div class="productName">{{price.productName}}</div>
      <div class="price">
        <span>¥</span>
        <span>{{price.periodMoney}}</span>
        <span>/{{price.unit}}</span>
      </div>
      <div class="marketPrice">
        <div>
          <div>市场价：</div>
          <div>{{price.defaultMoney}}元/{{price.unit}}</div>
        </div>
        <div>已售{{price.soldNumber}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['price']
  }
</script>

<style lang="less" scoped>
  #price{
    width:100%;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    .content{
      padding: 10px 24px;
      .productName {
        margin-bottom: 1vh;
        font-size: 1.4rem;
        color: #333;
      }
      .price {
        font-size:1.3rem;
        padding: 5px 0;
        color: #ff3e3e;
        span{
          &:nth-of-type(2) {
            font-size: 1.4rem;
          }
          &:nth-of-type(3) {
            color: #999;
            letter-spacing: 2px;
            font-size:1.25rem;
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
          font-size:1.3rem;
          div{
            &:nth-of-type(1){
              font-size:1.35rem;
            }
            &:nth-of-type(2){
              font-size:1.3rem;
              letter-spacing: 2px;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 400px) {
    #price{
      .content{
        padding: 16px 26px;
        .productName {
          font-size: 1.6rem;
        }
        .price {
          font-size:1.3rem;
          padding: 5px 0;
          color: #ff3e3e;
          span{
            &:nth-of-type(2) {
              font-size: 1.8rem;
            }
            &:nth-of-type(3) {
              font-size:1.3rem;
            }
          }
        }
        .marketPrice {
          >div{
            font-size:1.4rem;
            div{
              &:nth-of-type(1){
                font-size:1.4rem;
              }
              &:nth-of-type(2){
                font-size:1.5rem;
              }
            }
          }
        }
      }
    }
  }
</style>
