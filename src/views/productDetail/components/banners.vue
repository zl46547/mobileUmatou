<template>
  <div id="banners" v-if="banners">
    <mt-swipe :auto="4000" :interval="4000">
      <mt-swipe-item v-for="(item,index) in getBannersList" :key="index">
        <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+item+'/800.jpeg'" class="slide-image"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Swipe, SwipeItem } from 'mint-ui'
  export default {
    props: ['banners'],
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem
    },
    data () {
      return {
        bannersList: []
      }
    },
    computed: {
      getBannersList () {
        var vm = this
        if (vm.banners === '') {
          vm.bannersList = []
        } else {
          vm.bannersList = vm.banners
        }
        return vm.bannersList
      }
    }
  }
</script>

<style lang="less" scoped>
  #banners {
    width: 100%;
    height:350px;
      img {
        height: 100%;
        width: 100%;
      }
  }
  @media screen and (min-width: 400px) {
    #banners {
      height:450px;
    }
  }
  @media screen and (min-width: 500px) {
    #banners {
      height:550px;
    }
  }
</style>
