<template>
  <div class="orderList" v-if="dataList.length>0">
    <div class="order-content" v-for="(item,i) in dataList" :key="i">
      <div class="orderitem">
        <div class="img-left">
          <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'" alt="购物车图片">
        </div>
        <div class="img-right">
          <p>{{item.ProductName}}</p>
          <div class="content">
            <div class="price">
              <p>{{item.PvStandard}}</p>
              <p>¥{{item.DefaultMoney}}</p>
            </div>
            <p class="buyNum">X{{item.buyNum}}</p>
          </div>
        </div>
      </div>
      <div class="carList-bottom">
        <p>小计：¥{{item.totalMoney}}元</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    components: {},
    mounted () {
      this.dataList = this.$store.state.car.selectedCarList
    },
    data () {
      return {
        dataList: []
      }
    },
    methods: {},
    computed: {}
  }
</script>

<style lang="less" scoped>
  .orderList {
    .order-content {
      margin-bottom: 3vh;
      box-shadow: 0 2px 6px #bfbfbf;
      .orderitem {
        background-color: #fff;
        display: table;
        /*align-items: flex-start;*/
        padding: 1vh 5vw;
        .img-left{
          display: table-cell;
          vertical-align: middle;
          img {
            width: 25vw;
            height: 25vw;
            padding: 2vw;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
        }
        .img-right {
          display: table-cell;
          vertical-align: middle;
          padding: 2% 5%;
          width: 100%;
          p {
            text-overflow: ellipsis;
            padding-bottom: 3vw;
            color: #333;
            font-size: 1.5rem;
          }
          .content {
            display: flex;
            justify-content: space-between;
            .price p:nth-of-type(1) {
              color: #999;
              font-size: 1.4rem;
            }
            .price p:nth-of-type(2) {
              color: #f05423;
              font-size: 1.5rem;
            }
            .buyNum {
              color: #999;
              font-size: 1.5rem;
            }
          }
        }
      }
      .carList-bottom {
        background-color: #fff;
        height: 7vh;
        color: #f05423;
        display: flex;
        align-items: center;
        margin-top: 2px;
        p {
          font-size: 1.5rem;
          padding: 0 12vw;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .orderList {
      .order-content {
        margin-bottom: 20px;
        .orderitem {
          padding: 10px 15px;
          .img-left{
            img {
              width: 150px;
              height: 150px;
              padding: 15px;
            }
          }
          .img-right {
            padding: 2% 5%;
            width: 100%;
            p {
              padding-bottom: 20px;
              font-size: 1.7rem;
            }
            .content {
              .price p:nth-of-type(1) {
                font-size: 1.6rem;
              }
              .price p:nth-of-type(2) {
                font-size: 1.7rem;
              }
              .buyNum {
                font-size: 1.7rem;
              }
            }
          }
        }
        .carList-bottom {
          height: 70px;
          p {
            font-size: 1.7rem;
            padding: 0 70px;
          }
        }
      }
    }
  }
</style>
