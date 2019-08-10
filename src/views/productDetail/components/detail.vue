<template>
  <div id="detail">
    <!-- 产品规格 -->
    <div class="standard">
      <header>
        <p class="title">产品规格</p>
        <p class="sub-title">Product Standard</p>
      </header>
      <div class="standard-list">
        <div class="product-name">商品名称</div>
        <div>{{detail.productName}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">编号</div>
        <div>{{detail.number}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">规格</div>
        <div>{{detail.pvStandard}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">产地</div>
        <div>{{detail.place}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">储存方式</div>
        <div>{{detail.number}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">开票内容</div>
        <div>{{detail.financeCName}}</div>
      </div>
      <div class="standard-list">
        <div class="product-name">截单时间</div>
        <div>{{detail.lastTimeInfo?detail.lastTimeInfo:'未截单'}}</div>
      </div>
    </div>
    <div class="introduce" v-if="detail.fullDescription && detail.fullDescription.length>0">
      <img v-lazy="item" alt="" v-for="(item,index) in detail.fullDescription" :key="index"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['detail'],
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
  #detail {
    .standard {
      margin-bottom: 1px;
      padding: 1vh 0;
      background-color: #fff;
      header {
        display: flex;
        align-items: baseline;
        padding: 12px 18px;
        .title {
          font-size: 1.5rem;
          border-left: 10px solid #90c320;
          padding: 0 5px 0 10px;
          word-break: break-all;
          white-space: nowrap;
        }
        .sub-title {
          font-size: 1.3rem;
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
          width: 108px;
          display: flex;
          justify-content: flex-end;
          color: rgba(0, 0, 0, 0.43);
          margin: 0 20px 0 15px;
          white-space: nowrap;
        }
        div:nth-of-type(2){
          width: 100%;
          padding-right: 10px;
        }
      }
    }
    .introduce {
      padding-bottom: 2vh;
      background-color: #fff;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (min-width: 400px) {
    #detail {
      .standard {
        header {
          padding: 18px 24px;
          .title {
            font-size: 1.8rem;
          }
          .sub-title {
            font-size: 1.5rem;
          }
        }
        .standard-list {
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
