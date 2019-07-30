<template>
  <div id="categoryMain">
    <div class="randerAdvertise" v-if="randerAdvertise.length > 0">
      <v-swiper :adverise="randerAdvertise"></v-swiper>
    </div>
    <div class="hotCategory" v-if="pathId == '0'">
      <div class="category-list" v-for="k in category" :key="k.Id" @click="goToCategoryDetail(k.Id)">
        <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+k.PictureId+'/160.jpeg'" mode="widthFix"/>
        <div class="title">{{k.Name}}</div>
      </div>
    </div>
    <div class="subCategory" v-if="pathId != '0'"
         :class="{'hasAdv':randerAdvertise.length > 0,'notHasAdv':randerAdvertise.length <= 0}">
      <div v-for="(k,index) in category" :key="index">
        <div class="subTitle">
          <div class="metaKeywords">{{k.MetaKeywords}}</div>
          <div class="allProduct" @click="allProduct">
            <span>全部商品</span>
            <span class="icon iconfont icon-arrow"></span>
          </div>
        </div>
        <div class="subContent">
          <div class="item" v-for="(item) in k.SmallCategories" :key="item.Id" @click="goToCategoryDetail(item.Id)">
            <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/' +item.PictureId+ '/160.jpeg'"
                 mode="widthFix"/>
            <div class="subContent-title">{{item.Name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import Swiper from './swiper.vue'

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
      'VSwiper': Swiper
    },
    mounted () {
      var vm = this
      vm.pathId = vm.$route.params.id
      vm.getAllAdvertisement().then((res) => {
        if (vm.pathId === '0') {
          vm.getHotCategory()
        } else {
          vm.getSubCategory(vm.pathId)
        }
      })
    },
    watch: {
      '$route': function (url) {
        var vm = this
        let {id} = url.params
        if (!id) {
          vm.getHotCategory()
        } else {
          vm.getSubCategory(id)
        }
      }
    },
    methods: {
      /**
       * 跳转分类详细页面
       * @param productId
       */
      goToCategoryDetail(id) {
        var vm = this
        vm.$router.push({name: '详细分类', query: {categoryIds: id}})
      },
      /**
       * 获取热门分类数据
       */
      getHotCategory () {
        var vm = this
        vm.pathId = 0
        vm.$api({
          method: 'get',
          url: '/products/hotCategory'
        }).then((res) => {
          vm.category = res.data.Data.HotCategoryList
          vm.getRanderAdvertise(0)
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 获取小分类数据
       * @param id
       */
      getSubCategory (id) {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/products/subCategory',
          params: {id}
        }).then((res) => {
          vm.category = res.data.Data.SubCategories
          vm.getRanderAdvertise(id)
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 获取所有广告数据
       */
      getAllAdvertisement () {
        var vm = this
        return new Promise((resolve, reject) => {
          vm.$api({
            method: 'get',
            url: '/home/advertisementPhotoshoot',
            params: {typeCode: 1002}
          }).then((res) => {
            vm.allAdvertise = res.data.Data
            resolve('SUCCESS')
          }).catch((error) => {
            console.log(error)
          })
        })
      },
      /**
       * 根据id获取对应的广告列表
       * @param id
       */
      getRanderAdvertise(id) {
        var vm = this
        vm.randerAdvertise = vm.allAdvertise.where(function (e) {
          return e.CategotyId === id
        })
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
  #categoryMain {
    width: 78%;
    .hotCategory {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: calc(100vh - 120px - 110px);
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .category-list {
        width: 33%;
        text-align: center;
        padding: 1vh 0;
        cursor: pointer;
        img {
          display: block;
          width: 70%;
          margin: 0 auto;
        }
        .title {
          font-size: 1.3rem;
          padding: 2vh 0;
          text-align: center;
        }
      }
    }
    .subCategory {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      .subTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 15px;
        .metaKeywords {
          color: #333;
          font-weight: 400;
          font-size: 1.35rem;
        }
        .allProduct {
          color: #999;
          cursor: pointer;
          display: flex;
          align-items: center;
          span {
            font-size: 1.3rem;
          }
          .icon-arrow {
            font-size: 1.4rem;
          }
        }
      }
      .subContent {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 33%;
          text-align: center;
          cursor: pointer;
          img {
            width: 80%;
          }
          .subContent-title {
            font-size: 1.3rem;
            padding: 2vh 0;
            text-align: center;
          }
        }
      }
    }
    .hasAdv {
      height: calc(100vh - 120px - 110px);
    }
    .notHasAdv {
      height: calc(100vh - 110px);
    }
  }

  @font-face {
    font-family: 'iconfont';
    src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYUikwsAAAZoAAAAHEdERUYAKQAKAAAGSAAAAB5PUy8yPJVIGQAAAVgAAABWY21hcAAP6dIAAAHAAAABQmdhc3D//wADAAAGQAAAAAhnbHlm8fnDvAAAAxAAAAB4aGVhZBKfr/0AAADcAAAANmhoZWEGwwOFAAABFAAAACRobXR4DAABHQAAAbAAAAAQbG9jYQA8AAAAAAMEAAAACm1heHABEAAvAAABOAAAACBuYW1lKeYRVQAAA4gAAAKIcG9zdHOFdNsAAAYQAAAAMAABAAAAAQAAwKHoVF8PPPUACwQAAAAAANe/NgEAAAAA1782AQEd/+AC5QMeAAAACAACAAAAAAAAAAEAAAOA/4AAXAQAAAAAAALlAAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAEACMAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5ifmJwOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAAEAAAABAABHQAAAAMAAAADAAAAHAABAAAAAAA8AAMAAQAAABwABAAgAAAABAAEAAEAAOYn//8AAOYn//8Z3AABAAAAAAAAAQYAAAEAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAACAR3/4ALlAx4AFQAiAAABNCcBJiIGFBcBBwYUFjI/ATY/ATY1ASYiDwEGFBYyPwE2NALlDP6LDSEZDAFYxQwZIQ3iBAMEAf6cDSEMHgwZIQ0dDAGAEAwBdgwZIQ3+qMYMIhgM4gQFCgUF/sYMDB0NIRkMHQ0hAAAAABIA3gABAAAAAAAAABUALAABAAAAAAABAAgAVAABAAAAAAACAAcAbQABAAAAAAADAAgAhwABAAAAAAAEAAgAogABAAAAAAAFAAsAwwABAAAAAAAGAAgA4QABAAAAAAAKACsBQgABAAAAAAALABMBlgADAAEECQAAACoAAAADAAEECQABABAAQgADAAEECQACAA4AXQADAAEECQADABAAdQADAAEECQAEABAAkAADAAEECQAFABYAqwADAAEECQAGABAAzwADAAEECQAKAFYA6gADAAEECQALACYBbgAKAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQACgAACkNyZWF0ZWQgYnkgaWNvbmZvbnQKAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABSAGUAZwB1AGwAYQByAABSZWd1bGFyAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAABHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuAABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAABodHRwOi8vZm9udGVsbG8uY29tAAACAAAAAAAAAAoAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAQAAAABAAIBAgVhcnJvdwAAAAH//wACAAEAAAAMAAAAFgAAAAIAAQADAAMAAQAEAAAAAgAAAAAAAAABAAAAANWkJwgAAAAA1782AQAAAADXvzYB) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-arrow:before {
    content: "\e627";
  }

  @media screen and (min-width: 400px) {
    #categoryMain {
      .hotCategory {
        height: calc(100vh - 160px - 115px);
        .category-list {
          .title {
            font-size: 1.35rem;
          }
        }
      }
      .subCategory {
        .subTitle {
          margin: 15px 25px;
          .metaKeywords {
            font-size: 1.4rem;
          }
          .allProduct {
            span {
              font-size: 1.35rem;
            }
            .icon-arrow {
              font-size: 1.45rem;
            }
          }
        }
        .subContent {
          .item {
            .subContent-title {
              font-size: 1.3rem;
            }
          }
        }
      }
      .hasAdv {
        height: calc(100vh - 160px - 115px);
      }
      .notHasAdv {
        height: calc(100vh - 115px);
      }
    }
  }

  @media screen and (min-width: 500px) {
    #categoryMain {
      .hotCategory {
        height: calc(100vh - 200px - 115px);
      }
      .hasAdv {
        height: calc(100vh - 200px - 115px);
      }
      .notHasAdv {
        height: calc(100vh - 115px);
      }
    }
  }
</style>
