<template>
  <div class="wrap">
    <v-header class="header">
      <h1 slot="title">商品分类</h1>
    </v-header>
    <section class="view">
      <v-aside :datas="allData"></v-aside>
      <router-view :datas="allData"></router-view>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Aside from '@/components/category/aside.vue'

  export default {
    components: {
      'VHeader': Header,
      'VAside': Aside
    },
    data () {
      return {
        allData: ''
      }
    },
    create () {
      this.$api({
        method: 'get',
        url: '/category'
      }).then((res) => {
        this.allData = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;

    .view {
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
</style>
