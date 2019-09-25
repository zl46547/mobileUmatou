<template>
  <div id="defaultHome">
    <div class="defaultHome-item"
         v-for="(item,itemId) in defaultHomeData"
         :key="itemId"
    >
      <!-- 左上下 -->
      <div class="flex" v-if="item.FloorType === 1">
        <div>
          <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50"/>
        </div>
        <div>
          <img v-lazy="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50;"/>
          <img v-lazy="item.PicAdvItems[2].BackGroundImg" alt="" class="width-50;"/>
        </div>
      </div>
      <!-- 上下右 -->
      <div class="flex" v-if="item.FloorType === 2">
        <div>
          <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt="" class="width-50"/>
          <img v-lazy="item.PicAdvItems[1].BackGroundImg" alt="" class="width-50"/>
        </div>
        <div>
          <img v-lazy="item.PicAdvItems[2].BackGroundImg" alt="" class="width-50"/>
        </div>
      </div>
      <!-- 一列 -->
      <div v-if="item.FloorType === 7">
        <img v-lazy="item.PicAdvItems[0].BackGroundImg" alt="" class="width-100"
             @click="goToJump(item.FloorType,item.PicAdvItems[0])"/>
      </div>
      <!-- 两列 -->
      <div class="flex" v-if="item.FloorType === 6">
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
      <div class="flex" v-if="item.FloorType === 4">
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
      <div class="flex" v-if="item.FloorType === 12">
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
      <!-- 轮播 -->
      <div v-if="item.FloorType ===13">
        <Swipe :autoplay="3000" indicator-color="white">
          <SwipeItem v-for="image in item.AdvInfo.AdvItems"
                     :key="image.Id"
                     @click="goToTopicActivity(image.JumpValue)"
          >
            <img :src="image.PicUrl" :alt="image.ContentName"/>
          </SwipeItem>
        </Swipe>
      </div>
      <!-- 发现更多 -->
      <div class="flex flex-wrap find-more" v-if="item.FloorType === 15">
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
  import { Toast, Swipe, SwipeItem } from 'vant'
  import {getDefaultHome} from '../service'
  import {SCROLL_TOP} from '../../../vuex/types'

  export default {
    data() {
      return {
        defaultHomeData: []
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    created() {
      this.initDefaultHome()
    },
    methods: {
      /**
       * 初始化首页列表
       */
      initDefaultHome() {
        getDefaultHome().then((res) => {
          this.defaultHomeData = res.FloorInfo.ConfigHomeFloors
        })
      },
      /**
       * 页面跳转
       * @param floorType
       * @param picAdvItems
       */
      goToJump(floorType, picAdvItems) {
        if (floorType === 12 || floorType === 15) {
          this.goToDetail(picAdvItems.ProductId)
          return false
        }
        switch (picAdvItems.JumpType) {
          case 1:
            if (picAdvItems.JumpValue.indexOf('topics') > -1) {
              this.goToTopicActivity(picAdvItems.JumpValue)
            } else {
              Toast({
                message: '该活动已下架'
              })
            }
            break
          case 2:
            Toast({
              message: '该活动已下架'
            })
            break
          case 4:
            this.goToDetail(picAdvItems.JumpValue)
            break
          case 5:
            var categoryIds = [picAdvItems.JumpValue]
            this.goToCategoryDetail(JSON.stringify(categoryIds))
            break
        }
      },
      /**
       * 跳转至广告详情页
       * @param JumpValue
       */
      goToTopicActivity(JumpValue) {
        this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
        var queryId = JumpValue.replace('https://wechatx.34580.com/topics/', '')
        this.$router.push({path: '/topicActivity', query: {queryId}})
      },
      /**
       * 跳转商品详情页面
       * @param productId
       */
      goToDetail(productId) {
        this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
        this.$router.push({name: '商品详情', params: {productId}})
      },
      /**
       * 跳转分类详细页面
       * @param categoryIds
       */
      goToCategoryDetail(categoryIds) {
        this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
        this.$router.push({path: '/categoryDetail', params: {categoryIds}})
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../less/variables";

  #defaultHome {
    .defaultHome-item {
      background-color: #fff;
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
          font-size: 20rem/@baseFontSize;
          padding: 10rem/@baseFontSize 5rem/@baseFontSize;
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
          margin: 25rem/@baseFontSize 26rem/@baseFontSize;
          cursor: pointer;
          width: 180rem/@baseFontSize;
          img {
            width: 180rem/@baseFontSize;
            height: 180rem/@baseFontSize;
            display: block;
            margin-bottom: 10rem/@baseFontSize;
          }
          .product-name {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 30rem/@baseFontSize;
          }
          .price {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .flashSale-list-price {
              color: @priceColor;
              font-size: 30rem/@baseFontSize;
            }
            .flashSale-list-unit {
              padding-top: 10rem/@baseFontSize;
              color: rgb(150, 150, 150);
              font-size: 24rem/@baseFontSize;
            }
          }
        }
      }
    }
  }
</style>
