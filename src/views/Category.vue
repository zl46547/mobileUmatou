<template>
  <div class="wrap">
    <v-header>
      <h1 slot="title">商品分类</h1>
    </v-header>
    <section class="view">
      <v-aside :bigCategory="bigCategoryData.Data"></v-aside>
      <router-view :allAdvertise="allAdvertise"></router-view>
    </section>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/header/index.vue'
  import Aside from '@/components/category/aside.vue'
  import Footer from '@/common/footer/index.vue'

  export default {
    components: {
      'VHeader': Header,
      'VAside': Aside,
      'VFooter': Footer
    },
    data () {
      return {
        allData: '',
        bigCategoryData: '',
        allAdvertise: [] // 广告轮播
      }
    },
    mounted () {
      this.getBigCategory()
      this.getAdvertisement()
    },
    methods: {
      /**
       *  获取大分类列表
       */
      getBigCategory () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/category/bigCategory.json'
        }).then((res) => {
          vm.bigCategoryData = res.data
        }).catch((error) => {
          console.log(error)
        })
      },
      // 获取所有的顶部广告轮播图
      getAdvertisement () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/category/swiper.json'
        }).then((res) => {
          vm.allAdvertise = res.data.Data
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    .view {
      margin-top: 60px;
      height:calc(100vh - 120px);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
</style>
