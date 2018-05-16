<template>
  <div class="main">
    <div class="randerAdvertise" v-if="getRanderAdvertisements.length > 0">
      <v-swiper :adverise="getRanderAdvertisements"></v-swiper>
    </div>
    <div class="hotCategory" v-if="pathId === '0' && categoryList.Data">
      <div class="category-list" v-for="k in categoryList.Data.HotCategoryList" :key="k.Id">
        <router-link :to="'/categoryDetail/'+k.Id">
          <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/' +k.PictureId+ '/160.jpeg'" alt="">
          <span>{{k.Name}}</span>
        </router-link>
      </div>
    </div>
    <!---->
    <!---->
    <!---->
    <!---->
    <div class="subCategory" v-if="pathId !== '0' && categoryList.Data">
      <div v-for="k in categoryList.Data.SubCategories" :key="k.Id">
        <div style="display: flex;justify-content: space-between;margin: 3vh;margin-bottom: 0">
          <p style="color: #333;font-weight: 400;">{{k.MetaKeywords}}</p>
          <div style="color: #999;cursor: pointer"><span>全部商品</span><i class="icon iconfont icon-right"></i></div>
        </div>
        <div style="display: flex;flex-wrap: wrap">
          <div v-for="item in k.SmallCategories" :key="item.Id" style="width: 33%;text-align: center; padding: 1vh 0;">
            <router-link :to="'/categoryDetail/'+item.Id">
              <img style="display: block;width: 60%;margin: 4vw auto;"
                   v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/' +item.PictureId+ '/160.jpeg'" alt="">
              <span>{{item.Name}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import utils from '@/util/common.js'
  import Swiper from '@/components/category/swiper.vue'

  export default {
    props: ['allAdvertise'],
    data () {
      return {
        categoryList: [],
        pathId: '0',
        randerAdvertise: [] // 需渲染的广告轮播
      }
    },
    components: {
      'VSwiper': Swiper
    },
    watch: {
      '$route': 'pathChange' // 监听事件
    },
    mounted () {
      this.getCategory()
//      this.getRanderAdvertisements()
    },
    methods: {
      pathChange () {
        let pathId = this.$route.params // 获得当前路径参数Id
        this.pathId = pathId.tab
        this.getCategory()
      },
      getCategory () {
        var vm = this
        var id = vm.pathId
        vm.$api({
          method: 'get',
          url: '/shihang/category/smallCategory/' + id + '.json'
        }).then((res) => {
          vm.categoryList = res.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    computed: {
      tabIndex () {
        return this.$store.state.category.tabIndex
      },
      // 获取需渲染的广告轮播
      getRanderAdvertisements () {
        var vm = this
        if (!utils.isEmpty(vm.allAdvertise)) {
          vm.randerAdvertise = []
          vm.allAdvertise.forEach(function (e) {
            if (parseInt(vm.pathId) === parseInt(e.CategotyId)) {
              vm.randerAdvertise.push(e)
            }
          })
        }
        return vm.randerAdvertise
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    width: 78vw;
    margin-bottom: 6vh;
    > .randerAdvertise {
      height: 22vh;
    }
    > .hotCategory {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .category-list {
        width: 33%;
        text-align: center;
        padding: 1vh 0;
        a {
          color: #666;
          display: block;
          img {
            display: block;
            width: 60%;
            margin: 4vw auto;
          }
          span {
            text-align: center;
          }
        }
      }
    }
    > .subCategory {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
    }
  }
</style>
