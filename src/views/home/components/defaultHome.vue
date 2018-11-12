<template>
  <div id="defaultHome">
    <div class="defaultHome-item" v-for="(item,itemId) in defaultHomeData" :key="itemId" v-if="defaultHomeData">
      <!-- 小标题 -->
      <div class="title" v-if="item.ChildTitle">
        <div>{{item.FatherTitle}}</div>
        <div>{{item.ChildTitle}}</div>
      </div>
      <!-- 左上下 -->
      <div class="flex" v-if="item.FloorType == 1">
        <div>
          <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50"/>
        </div>
        <div>
          <img v-lazy="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50;"/>
          <img v-lazy="item.PicAdvItems[2].BackGroundImg" alt="" class="width-50;"/>
        </div>
      </div>
      <!-- 上下右 -->
      <div class="flex" v-if="item.FloorType == 2">
        <div>
          <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50"/>
          <img v-lazy="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50"/>
        </div>
        <div>
          <img v-lazy="item.PicAdvItems[2].BackGroundImg" alt="" class="width-50"/>
        </div>
      </div>
      <!-- 一列 -->
      <div v-if="item.FloorType == 7">
        <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt="" class="width-100"
             @click="goToJump(item.FloorType,item.PicAdvItems[0])"/>
      </div>
      <!-- 两列 -->
      <div class="flex" v-if="item.FloorType == 6">
        <div class="width-50">
          <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt=""
               @click="goToJump(item.FloorType,item.PicAdvItems[0])"/>
        </div>
        <div class="width-50">
          <img v-lazy="item.PicAdvItems[1].BackGroundImg" alt=""
               @click="goToJump(item.FloorType,item.PicAdvItems[1])"/>
        </div>
      </div>
      <!-- 三列 -->
      <div class="flex" v-if="item.FloorType == 4">
        <div class="width-33">
          <img v-lazy="item.PicAdvItems[0].BackGroundImg"
               @click="goToJump(item.FloorType,item.PicAdvItems[0])"/>
        </div>
        <div class="width-33">
          <img v-lazy="item.PicAdvItems[1].BackGroundImg"
               @click="goToJump(item.FloorType,item.PicAdvItems[1])"/>
        </div>
        <div class="width-33">
          <img v-lazy="item.PicAdvItems[2].BackGroundImg"
               @click="goToJump(item.FloorType,item.PicAdvItems[2])"/>
        </div>
      </div>
      <!-- 横向滚动 -->
      <div class="flex" v-if="item.FloorType == 12">
        <div class="scroll-div">
          <div class="scroll-div-item" v-for="(scrollItem,scrollItemIndex) in item.ProductItems" :key="scrollItemIndex"
               @click="goToJump(item.FloorType,scrollItem)">
            <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/'+scrollItem.PictureId+'/160.jpeg'"/>
            <div class="product-name">{{scrollItem.ProductName}}</div>
            <div class="price">
              <span class="flashSale-list-price">￥{{scrollItem.PeriodMoney}}</span>
              <span class="flashSale-list-unit">/{{scrollItem.PvStandard}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 发现更多 -->
      <div class="flex flex-wrap find-more" v-if="item.FloorType == 15">
        <div v-for="(k,kId) in item.CategoryProductItems[0].ProductItems" class="width-50" :key="kId">
          <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/'+k.PictureId+'/500.jpeg'" class="width-50"
               @click="goToJump(item.FloorType,k)"/>
          <div class="product-name">{{k.ProductName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        defaultHomeData: ''
      }
    },
    mounted() {
      var vm = this
      vm.getDefaultHome()
    },
    methods: {
      getDefaultHome() {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/index/command/defaultHome.json'
        }).then((res) => {
          vm.defaultHomeData = res.data.Data.FloorInfo.ConfigHomeFloors
        })
      },
      /**
       * 页面跳转
       * @param floorType
       * @param picAdvItems
       */
      goToJump(floorType, picAdvItems) {
        var vm = this
        if (floorType === 12 || floorType === 15) {
          vm.goToDetail(picAdvItems.ProductId)
          return false
        }
        switch (picAdvItems.JumpType) {
          case 1:
            if (picAdvItems.JumpValue.indexOf('topics') > -1) {
              vm.goToIndexAdv(picAdvItems.JumpValue)
            } else {
              Toast({
                message: '该功能暂未开发'
              })
            }
            break
          case 2:
            Toast({
              message: '该功能暂未开发'
            })
            break
          case 4:
            vm.goToDetail(picAdvItems.JumpValue)
            break
          case 5:
            var categoryIds = [picAdvItems.JumpValue]
            vm.goToCategoryDetail(JSON.stringify(categoryIds))
            break
        }
      },
      /**
       * 跳转至广告详情页
       * @param JumpValue
       */
      goToIndexAdv(JumpValue) {
        var vm = this
        var queryId = JumpValue.replace('https://wechatx.34580.com/topics/', '')
        vm.$router.push({path: '/indexAdv', query: {queryId}})
      },
      /**
       * 跳转商品详情页面
       * @param productId
       */
      goToDetail(productId) {
        var vm = this
        vm.$router.push({name: '商品详情', params: {productId}})
      },
      /**
       * 跳转分类详细页面
       * @param productId
       */
      goToCategoryDetail(categoryIds) {
        var vm = this
        vm.$router.push({path: '/categoryDetail', params: {categoryIds}})
      }
    }
  }
</script>
<style lang="less" scoped>
  #defaultHome {
    .defaultHome-item {
      background-color: #fff;
      .title {
        text-align: center;
        margin: 2vh 0;
        padding-top: 2vh;
      }
      .title div:nth-of-type(1) {
        font-size: 0.3rem;
        margin-bottom: 1vh;
      }
      .title div:nth-of-type(2) {
        font-size: 0.25rem;
        color: #999;
      }
      .flex {
        display: flex
      }
      .flex-wrap {
        flex-wrap: wrap;
      }
      img{
        width:100%;
      }
      .width-50 {
        width: 50%;
        cursor: pointer;
      }
      .width-100 {
        width: 100%;
        cursor: pointer;
      }
      .width-33 {
        width: 33.3%;
        cursor: pointer;
      }
      a {
        color: #666;
        text-decoration: none;
        display: flex;
        align-items: center;
      }
      .find-more {
        .product-name {
          text-align: center;
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.3rem;
          padding: 10px 5px;
        }
        img {
          width: 90%;
          text-align: center;
        }
      }
      .scroll-div {
        white-space: nowrap;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        .scroll-div-item {
          display: inline-block;
          margin: 5px 10px;
          cursor: pointer;
          img {
            width: 100px;
          }
          .product-name {
            text-align: center;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.3rem;
          }
          .price {
            text-align: center;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .flashSale-list-price {
              color: #b4282d;
              font-size: 0.28rem;
            }
            .flashSale-list-unit {
              padding-top: 2vh;
              color: rgb(150, 150, 150);
              font-size: 0.22rem;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 400px) {
    #defaultHome {
      .defaultHome-item {
        .title div:nth-of-type(1) {
          font-size: 1.5rem;
        }
        .title div:nth-of-type(2) {
          font-size: 1.25rem;
        }
        .find-more {
          .product-name {
            font-size: 1.5rem;
            padding: 15px 5px;
          }
        }
        .scroll-div {
          &::-webkit-scrollbar{
            display: none;
          }
          .scroll-div-item {
            margin: 15px 20px;
            img {
              width: 120px;
            }
            .product-name {
              width: 120px;
              font-size: 1.3rem;
            }
            .price {
              width: 120px;
              .flashSale-list-price {
                font-size: 1.8rem;
              }
              .flashSale-list-unit {
                font-size: 1.22rem;
              }
            }
          }
        }
      }
    }
  }
</style>
