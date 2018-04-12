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
    mounted () {
      this.$api({
        method: 'get',
        url: '/shihang/category/category.json'
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
    display: flex; // 将对象作为弹性伸缩盒显示。
    -webkit-box-orient: vertical; // 属性规定框的子元素应该被水平或垂直排列。
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;

    .view {
      width: 100%;
      height:100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
</style>
