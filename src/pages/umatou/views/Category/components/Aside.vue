<template>
  <div id="big-category">
    <div class="big-category-item"
         :class="{active:item.Name === activeItem.Name}"
         v-for="item in bigCategory"
         @click="changeTabIndex(item)"
         :key="item.Id"
    >
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
      this.getAsideData()
    },
    methods: {
      /**
       * 切换分类
       */
      changeTabIndex (val) {
        this.activeItem = val
        this.$emit('change-tab', val)
      },
      /**
       * 获取左侧大分类数据
       */
      getAsideData () {
        getBigCategory().then((res) => {
          this.bigCategory = res
          this.activeItem = this.bigCategory[0]
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  #big-category {
    width: 22%;
    height: 100%;
    overflow-y: auto;
    background-color: #f7f7f7;
    &::-webkit-scrollbar {
      display: none;
    }
    .big-category-item {
      cursor: pointer;
      text-align: center;
      font-size: 26rem/@baseFontSize;
      padding: 26rem/@baseFontSize 0;
      position: relative;
    }
    .active {
      font-size: 26rem/@baseFontSize;
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
