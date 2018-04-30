<template>
  <div class="detail-content">
    <ul>
      <li :class="{active:i == isActive}" @click="getActive(item.index)" v-for="(item,i) in tabs" :key="i">
        {{item.name}}
      </li>
    </ul>
    <div class="introduce" v-if="nowIndex == 0">
      <img :src="getImageUrl" alt="">
    </div>
    <div class="standard" v-if="nowIndex == 1">
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
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['responseData'],
    data () {
      return {
        nowIndex: 0,
        tabs: [{
          name: '介绍',
          index: '0'
        },
          {
            name: '规格',
            index: '1'
          }]
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
    padding-top: 14vh;
    padding-bottom: 11vh;
    ul {
      position: fixed;
      top:9vh;
      padding: 1vh 0;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      width: 100%;
      height: 6vh;
      li {
        width: 100%;
        margin: auto;
        text-align: center;
        cursor: pointer;
        font-size: 2vh;
      }
    }
    .standard {
      margin-top: 3vh;
      .standard-list {
        font-size: 3vw;
        display: flex;
        padding: 2vh 0;
        border-top: 1px solid rgba(224, 216, 216, 0.55);
        align-items: center;
        height: 4vh;
        .product-name {
          width: 20vw;
          color: rgba(0, 0, 0, 0.43);
          margin-left: 8vw;
        }
      }
    }
    .introduce {
      img {
        width: 100vw;
      }
    }
  }

  .active {
    color: #63a35c;
  }

  @media screen and (min-width: 768px) {
    .detail-content {
      padding-top: 65px;
      padding-bottom: 65px;
      ul {
        height: 30px;
        width:768px;
        top:60px;
        padding: 10px 0;
        li{
          font-size: 10px;
        }
      }
      .standard {
        margin-top: 50px;
        > .standard-list {
          font-size: 16px;
          height: 30px;
          line-height:30px;
          .product-name {
            width: 100px;
            margin-left: 40px;
          }
        }
      }
      .introduce {
        img {
          width: 768px;
        }
      }
    }
  }
</style>
