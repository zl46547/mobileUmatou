<template>
  <div class="content">
    <mt-swipe :auto="5000">
      <mt-swipe-item v-for="(items,i) in getBannersList" :key="i">
        <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+items+'/800.jpeg'" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['response'],
    components: {},
    data () {
      return {
        bannersList: []
      }
    },
    computed: {
      getBannersList () {
        var vm = this
        if (vm.response === '') {
          vm.bannersList = []
        } else {
          vm.bannersList = vm.response.ProductInfo.Banners
        }
        return this.bannersList
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .content {
    margin-top: 20px;
    width: 100%;
    height: 70vw;
    img {
      height: 100%;
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      margin-top: 56px;
      width: 768px;
      height: 500px;
      /*img {*/
        /*height: 500px;*/
        /*width: 768px;*/
      /*}*/
    }
  }
</style>
