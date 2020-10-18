<template>
  <div id="detail">
    <!-- 产品规格 -->
    <div class="standard">
      <header>
        <p class="title">产品规格</p>
        <p class="sub-title">Product Standard</p>
      </header>
      <div class="standard-list">
        <p class="product-name">商品名称</p>
        <p>{{productInfo.productName}}</p>
      </div>
      <div class="standard-list">
        <p class="product-name">编号</p>
        <p>{{productInfo.number}}</p>
      </div>
      <div class="standard-list">
        <p class="product-name">规格</p>
        <p>{{productInfo.pvStandard}}</p>
      </div>
      <div class="standard-list">
        <p class="product-name">产地</p>
        <p>{{productInfo.place}}</p>
      </div>
      <div class="standard-list">
        <p class="product-name">储存方式</p>
        <p>{{productInfo.number}}</p>
      </div>
      <div class="standard-list">
        <p class="product-name">开票内容</p>
        <p>{{productInfo.financeCName}}</p>
      </div>
      <div class="standard-list">
        <p class="product-name">截单时间</p>
        <p>{{productInfo.lastTimeInfo?productInfo.lastTimeInfo:'未截单'}}</p>
      </div>
    </div>
    <div class="introduce" v-if="productInfo.fullDescription && productInfo.fullDescription.length>0">
      <img v-lazy="item" alt="" v-for="(item,index) in productInfo.fullDescription" :key="index"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      productInfo: {
        required: true,
        type: Object
      }
    },
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
  @import "../../../../../less/variables";

  #detail {
    height: calc(100vh - 44px - 5rem);
    overflow: auto;

    &::-webkit-scrollbar {
      display: none
    }

    -webkit-overflow-scrolling: touch;
    .standard {
      margin-bottom: 1px;
      padding: 10rem/@baseFontSize 0;
      background-color: #fff;
      header {
        display: flex;
        align-items: baseline;
        padding: 22rem/@baseFontSize 28rem/@baseFontSize;
        .title {
          font-size: 25rem/@baseFontSize;
          border-left: 10rem/@baseFontSize solid @themeColor;
          padding: 0 15rem/@baseFontSize 0 20rem/@baseFontSize;
          word-break: break-all;
          white-space: nowrap;
        }
        .sub-title {
          font-size: 23rem/@baseFontSize;
          color: #888;
          width: 80%;
          border-bottom: 1.3px solid #c3c3c3;
        }
      }

      .standard-list {
        font-size: 23rem/@baseFontSize;
        display: flex;
        padding-bottom: 10rem/@baseFontSize;
        align-items: center;
        .product-name {
          width: 108rem/@baseFontSize;
          display: flex;
          justify-content: flex-end;
          color: rgba(0, 0, 0, 0.43);
          margin: 0 30rem/@baseFontSize 0 25rem/@baseFontSize;
          white-space: nowrap;
        }
        div:nth-of-type(2) {
          width: 100%;
          padding-right: 20rem/@baseFontSize;
        }
      }
    }
    .introduce {
      padding-bottom: 20rem/@baseFontSize;
      background-color: #fff;
      img {
        width: 100%;
      }
    }
  }
</style>
