<template>
  <div id="TK-tools">
    <Navigator>
      <span slot="title">淘客助手</span>
    </Navigator>
    <div class="content">
      <Button type="info" @click="addProduct">添加商品</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import {Button} from 'vant'

  export default {
    components: {
      Navigator,
      Button
    },
    data() {
      return {}
    },
    methods: {
      addProduct() {
        this.$router.push({name: '淘客商品添加'})
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-tools {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .content {
      margin-top: 4rem;
      padding: 0 2rem;
      flex: 1;
      background-color: #fff;
      overflow-y: auto;
    }
  }
</style>
