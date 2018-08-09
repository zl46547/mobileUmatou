<template>
  <div class="detail-content">
    <!-- 产品规格 -->
    <div class="standard">
      <header>
        <p class="title">产品规格</p>
        <p class="sub-title">Product Standard</p>
      </header>
      <div class="standard-list">
        <div class="product-name">商品名称</div>
        <div>{{responseData.ProductInfo.ProductName}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">编号</div>
        <div>{{responseData.ProductInfo.Number}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">规格</div>
        <div>{{responseData.ProductInfo.PvStandard}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">产地</div>
        <div>{{responseData.ProductInfo.Place}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">储存方式</div>
        <div>{{responseData.ProductInfo.Number}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">开票内容</div>
        <div>{{responseData.ProductInfo.FinanceCName}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">截单时间</div>
        <div>{{responseData.ProductInfo.LastTimeInfo}}</div>
      </div>
    </div>
    <div class="introduce">
      <img :src="getImageUrl" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['responseData'],
    data () {
      return {
        nowIndex: 0,
        tabs: [
          {
            name: '介绍',
            index: '0'
          },
          {
            name: '规格',
            index: '1'
          }
        ]
      }
    },
    computed: {
      isActive () {
        return this.nowIndex
      },
      getImageUrl () {
        if (this.responseData) {
          var start = this.responseData.ProductInfo.FullDescription.indexOf('http')
          var end = this.responseData.ProductInfo.FullDescription.indexOf('jpg') + 3
          var imageUrl = this.responseData.ProductInfo.FullDescription.substring(start, end)
          return imageUrl
        }
      }
    },
    methods: {
      getActive (val) {
        this.nowIndex = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail-content {
    .standard {
      margin-bottom: 1px;
      padding: 1vh 0;
      background-color: #fff;
      header {
        display: flex;
        align-items: baseline;
        padding: 2vh 3vw;
        .title {
          font-size: 1.5rem;
          border-left: 2.3vw solid #90c320;
          padding: 0 5px 0 10px;
          word-break: break-all;
          white-space: nowrap;
        }
        .sub-title {
          font-size: 1.2rem;
          color: #888;
          width: 80%;
          border-bottom: 1.3px solid #c3c3c3;
        }
      }
      .standard-list {
        font-size: 1.3rem;
        display: flex;
        padding-bottom: 2vh;
        align-items: center;
        .product-name {
          width: 20%;
          display: flex;
          justify-content: flex-end;
          color: rgba(0, 0, 0, 0.43);
          margin: 0 8vw 0 4vw;
          white-space: nowrap;
        }
        div:nth-of-type(2){
          width: 80%;
        }
      }
    }
    .introduce {
      padding-bottom: 2vh;
      background-color: #fff;
      img {
        width: 100vw;
      }
    }
  }

  .active {
    color: #63a35c;
  }

  @media screen and (min-width: 640px) {
    .detail-content {
      .standard {
        header {
          padding: 2vh 20px;
          .title {
            font-size: 1.7rem;
            border-left: 16px solid #90c320;
          }
          .sub-title {
            font-size: 1.4rem;
          }
        }
        > .standard-list {
          font-size: 1.5rem;
          .product-name {
            margin: 0 40px 0 20px;
          }
        }
      }
      .introduce {
        img {
          width: 640px;
        }
      }
    }
  }
</style>
