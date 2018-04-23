<template>
  <div>
    <v-header></v-header>
    <v-swiper :swiperData="swiperData.sweaperList"></v-swiper>
    <v-service></v-service>
    <v-section1 :section1="sectionOneData.sessionOneList"></v-section1>
    <v-section2 :section2="sectionTwoData.sessionTwoList"></v-section2>
    <v-section-meat :sectionMeat="sectionMeatData.sectionMeatList"></v-section-meat>
    <v-section-vegetables :sectionVegetables="sectionVegetablesData.sectionVegetablesList"></v-section-vegetables>
    <v-section-fish :sectionFish="sectionFishData.sectionFishList"></v-section-fish>
    <v-section-chicken :sectionChicken="sectionChickenData.sectionChickenList"></v-section-chicken>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/index/header.vue'
  import Swiper from '@/components/index/swiper.vue'
  import Service from '@/components/index/service.vue'
  import Section1 from '@/components/index/section1.vue'
  import Section2 from '@/components/index/section2.vue'
  import SectionMeat from '@/components/index/sectionMeat.vue'
  import SectionVegetables from '@/components/index/sectionVegetables.vue'
  import SectionFish from '@/components/index/sectionFish.vue'
  import SectionChicken from '@/components/index/sectionChicken.vue'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'

  export default {
    components: {
      'VHeader': Header,
      'VSwiper': Swiper,
      'VService': Service,
      'VSection1': Section1,
      'VSection2': Section2,
      'VSectionMeat': SectionMeat,
      'VSectionVegetables': SectionVegetables,
      'VSectionFish': SectionFish,
      'VSectionChicken': SectionChicken,
      'VBaseline': Baseline,
      'VFooter': Footer
    },
    data() {
      return {
        swiperData: '',
        sectionOneData: '',
        sectionTwoData: '',
        sectionMeatData: '',
        sectionVegetablesData: '',
        sectionFishData: '',
        sectionChickenData: ''
      }
    },
    beforeCreate() {
      /**
       * 获取轮播图数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/sweaper.json'
      }).then(response => {
        this.swiperData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      /**
       * 获取session1 数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/session1.json'
      }).then(response => {
        this.sectionOneData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      /**
       * 获取session2 数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/session2.json'
      }).then(response => {
        this.sectionTwoData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      /**
       * 获取 sectionMeat 数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/sectionMeat.json'
      }).then(response => {
        this.sectionMeatData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      /**
       * 获取 sectionVegetables 数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/sectionVegetables.json'
      }).then(response => {
        this.sectionVegetablesData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      /**
       * 获取 sectionFish 数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/sectionFish.json'
      }).then(response => {
        this.sectionFishData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      /**
       * 获取 sectionChicken 数据
       */
      this.$api({
        method: 'get',
        url: '/shihang/sectionChicken.json'
      }).then(response => {
        this.sectionChickenData = response.data
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
