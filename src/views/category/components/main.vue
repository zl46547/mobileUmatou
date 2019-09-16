<template>
  <div id="category-main" ref="categoryMain">
    <Swiper :adverse="randerAdvertise"></Swiper>
    <div class="hot-category" v-if="!pathId">
      <div class="category-list"
           v-for="item in category"
           :key="item.Id"
           @click="goToCategoryDetail(item.Id)">
        <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.PictureId}/160.jpeg`"/>
        <div class="title">{{item.Name}}</div>
      </div>
    </div>
    <div class="sub-category" v-else>
      <div v-for="(item,index) in category" :key="index">
        <div class="sub-title">
          <div class="meta-keywords">{{item.MetaKeywords}}</div>
          <div class="all-product" @click="allProduct">
            <span>全部商品</span>
            <span class="icon iconfont icon-arrow-right"></span>
          </div>
        </div>
        <div class="sub-content">
          <div class="category-list"
               v-for="smallItem in item.SmallCategories"
               :key="smallItem.Id"
               @click="goToCategoryDetail(smallItem.Id)"
          >
            <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${smallItem.PictureId}/160.jpeg`"/>
            <div class="title">{{smallItem.Name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  import Swiper from './swiper'
  import utils from '../../../util/common'
  import {
    getHotCategory,
    getSubCategory,
    getSwipper
  } from '../service'

  export default {
    data () {
      return {
        category: '',
        pathId: '',
        randerAdvertise: [], // 需渲染的广告轮播
        allAdvertise: [] // 需渲染的广告轮播
      }
    },
    components: {
      Swiper
    },
    created () {
      this.getAllAdvertisement()
    },
    watch: {
      '$route': function () {
        this.getCategoryDetailById()
      }
    },
    methods: {
      /**
       * 获取所有广告数据
       */
      async getAllAdvertisement () {
        this.allAdvertise = await getSwipper({typeCode: 1002})
        this.getCategoryDetailById()
      },
      /**
       * 根据id获取分类数据
       */
      getCategoryDetailById () {
        let id = Number(this.$route.params.id)
        if (!id) {
          this.initHotCategory()
        } else {
          this.initSubCategory(id)
        }
      },
      /**
       * 获取热门分类数据
       */
      initHotCategory () {
        this.pathId = 0
        getHotCategory().then((res) => {
          this.category = res.HotCategoryList
          this.randerAdvertise = this.allAdvertise
          utils.backToTop(this.$refs.categoryMain)
        })
      },
      /**
       * 获取小分类数据
       * @param id
       */
      initSubCategory (id) {
        this.pathId = id
        getSubCategory({id}).then((res) => {
          this.category = res.SubCategories
          this.randerAdvertise = this.allAdvertise.filter(item => item.CategotyId === id)
          utils.backToTop(this.$refs.categoryMain)
        })
      },
      /**
       * 跳转分类详细页面
       * @param id
       */
      goToCategoryDetail (id) {
        this.$router.push({name: '详细分类', query: {categoryIds: id}})
      },
      /**
       * 全部商品
       */
      allProduct () {
        Toast({
          message: '该功能暂未开发'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../less/variables";

  #category-main {
    width: 78%;
    height: 100%;
    &::-webkit-scrollbar {
      display: none
    }
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .hot-category {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .category-list {
      width: 33.3%;
      text-align: center;
      padding: 10rem/@baseFontSize 0;
      cursor: pointer;

      img {
        display: block;
        width: 70%;
        margin: 0 auto;
      }

      .title {
        font-size: 20rem/@baseFontSize;
        padding: 20rem/@baseFontSize 0;
        text-align: center;
      }
    }

    .sub-category {
      .sub-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10rem/@baseFontSize 15rem/@baseFontSize;

        .meta-keywords {
          color: #333;
          font-weight: 400;
          font-size: 24rem/@baseFontSize;
        }

        .all-product {
          color: #999;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 22rem/@baseFontSize;
          .icon-arrow-right {
            font-size: 24rem/@baseFontSize;
          }
        }
      }
      .sub-content {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  }
</style>
