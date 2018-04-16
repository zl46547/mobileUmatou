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
    data() {
      return {
        bannersList: []
      }
    },
    computed: {
      getBannersList() {
        var vm = this
        if (vm.response === '') {
          vm.bannersList = []
        } else {
          vm.bannersList = vm.response.ProductInfo.Banners
        }
        return this.bannersList
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .content{
     width:100%;
     height:70vw;
   }
  img{
    height:100%;
    width: 100%;
  }
</style>
