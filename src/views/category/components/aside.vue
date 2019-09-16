<template>
  <div id="big-category">
    <div class="big-category-item" v-for="item in bigCategory" @click="changeTabIndex(item)"
         :key="item.Id" :class="{active:item.Name === activeItem.Name}">
      <div>{{item.Name}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getBigCategory } from '../service'

  export default {
    computed: {},
    data () {
      return {
        bigCategory: [],
        activeItem: ''
      }
    },
    created () {
      let id = this.$route.params.id
      if (!id) {
        return false
      }
      this.getAsideData(Number(id))
    },
    methods: {
      /**
       * 切换分类
       */
      changeTabIndex (val) {
        this.activeItem = val
        this.$router.replace({name: '分类页', params: {id: val.Id}})
      },
      /**
       * 获取左侧大分类数据
       */
      getAsideData (id) {
        getBigCategory().then((res) => {
          this.bigCategory = res
          this.activeItem = this.bigCategory.find(item => (item.Id === id))
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #big-category {
    width: 22%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .big-category-item {
      cursor: pointer;
      text-align: center;
      font-size: 24rem/@baseFontSize;
      padding: 20rem/@baseFontSize 0;
      position: relative;
    }
    .active {
      font-size: 24rem/@baseFontSize;
      color: @themeColor;
      background-color: #fff;
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        height: 100%;
        width: 5rem/@baseFontSize;
        background-color: @themeColor;
      }
    }
  }
</style>
