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
  import Header from '@/common/_header.vue'
  import Aside from '@/components/category/aside.vue'
  import Footer from '@/common/_footer.vue'

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
//        var url = '/Home/AdvertisementPhotoshootRequest'
//        var requestData = {
//          'sourcetype': 9,
//          'json': {
//            'TypeCode': 1002,
//            'PlatForm': 1500
//          }
//        }
//        api.ajax(url, requestData, function (val) {
//          if (!utils.isEmpty(val.query.results)) {
//            vm.allAdvertise = val.query.results.json.Data
//          }
//        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex; // 将对象作为弹性伸缩盒显示。
    -webkit-box-orient: vertical; // 属性规定框的子元素应该被水平或垂直排列。
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;

    .view {
      width: 100%;
      height: 100%;
      margin: 12vw 0 16vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }

  @media screen and (min-width: 768px) {
    .wrap {
      .view {
        margin: 62px 0 70px 0;
      }
    }
  }
</style>
