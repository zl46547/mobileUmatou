<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">商品</mt-tab-item>
      <mt-tab-item id="2">详情</mt-tab-item>
      <mt-tab-item id="3">评价</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <v-banners :response="responseData"></v-banners>
        <v-price :response="responseData"></v-price>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2222
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        3333
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script type="text/ecmascript-6">

  import Banners from '../components/productDetail/banners.vue'
  import Price from '../components/productDetail/price.vue'

  export default {
    components: {
      'VBanners': Banners,
      'VPrice': Price
    },
    data() {
      return {
        selected: '1', // navbar切换
        responseData: '' // 相应数据
      }
    },
    mounted() {
      var bannersId = this.$route.params.id
      this.bannersId = bannersId
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/content/' + bannersId + '.json'
      }).then((res) => {
        this.responseData = res.data.Data
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {}
  }
</script>

<style scoped>
  /*.mint-navbar .mint-tab-item.is-selected {*/
  /*border-bottom: 3px solid #8BC34A;*/
  /*color: #4CAF50;*/
  /*}*/
</style>
