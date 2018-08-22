<template>
  <div id="category-detail">
    <v-header>
      <h1 slot="title">分类详情页</h1>
    </v-header>
    <v-category class="category-main"></v-category>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Category from '@/components/categoryDetail/categoryDetailBody.vue'
  import Footer from '@/common/_footer.vue'

  export default {
    components: {
      'VHeader': Header,
      'VCategory': Category,
      'VFooter': Footer
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  #category-detail{
    overflow: hidden;
    .category-main{
      margin-top: 60px;
    }
  }
</style>
