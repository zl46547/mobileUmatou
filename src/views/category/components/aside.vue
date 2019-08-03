<template>
  <div id="big-category" v-if="bigCategory">
    <div class="big-category-item" v-for="(k) in bigCategory" @click="changeTabIndex(k)"
         :key="k.Id" :class="{active:k.Name === activeItem.Name}">
      <div>{{k.Name}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getBigCategory} from '../service'
  export default {
    computed: {},
    data() {
      return {
        bigCategory: '',
        activeItem: ''
      }
    },
    mounted() {
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
      changeTabIndex(val) {
        this.activeItem = val
        this.$router.replace({name: '分类页', params: {id: val.Id}})
      },
      /**
       * 获取左侧大分类数据
       */
      getAsideData(id) {
        getBigCategory().then((res) => {
          this.bigCategory = res
          this.activeItem = this.bigCategory.find(item => (item.Id === id))
          // this.changeTabIndex(this.activeItem)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #big-category {
    width: 22%;
    height: calc(100vh - 110px);
    overflow-y: auto;
    background-color: rgb(247, 247, 247);
    &::-webkit-scrollbar {
      display: none;
    }
    .big-category-item {
      cursor: pointer;
      text-align: center;
      font-size: 1.3rem;
      padding: 10px 0;
      border-left: 2px solid rgb(247, 247, 247);
    }
    .active {
      font-size: 1.35rem;
      color: #55c955;
      background-color: #fff;
      border-left: 2px solid #55c955;
    }
  }
  @media screen and (min-width: 400px) {
    #big-category {
      height: calc(100vh - 115px);
      .big-category-item {
        font-size: 1.35rem;
        padding: 15px 0;
      }
      .active {
        font-size: 1.4rem;
      }
    }
  }
  @media screen and (min-width: 500px) {
    #big-category {
      height: calc(100vh - 115px);
    }
  }
</style>
