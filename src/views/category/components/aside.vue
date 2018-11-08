<template>
  <div class="big-category" v-if="bigCategory">
    <div class="big-category-item" v-for="(k) in bigCategory" @click="changeTabIndex(k)"
         :key="k.Id" :class="{active:k.Name == activeItem.Name}">
      <div>{{k.Name}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    computed: {},
    data() {
      return {
        bigCategory: '',
        activeItem: ''
      }
    },
    mounted() {
      var vm = this
      vm.getAsideData()
    },
    methods: {
      changeTabIndex(val) {
        var vm = this
        vm.activeItem = val
        vm.$router.replace({name: '分类页', params: {id: val.Id}})
      },
      getAsideData() {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/category/bigCategory.json'
        }).then((res) => {
          vm.bigCategory = res.data.Data
          vm.bigCategory.unshift({
            'Id': 0,
            'Name': '推荐分类',
            'PictureId': 999999
          })
          vm.activeItem = vm.bigCategory[0]
          vm.changeTabIndex(vm.activeItem)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .big-category {
    width: 22vw;
    height: calc(100vh - 55px);
    overflow-y: auto;
    background-color: rgb(247, 247, 247);
    &::-webkit-scrollbar {
      display: none;
    }
    .big-category-item {
      text-align: center;
      font-size: 0.3rem;
      padding: 10px 0;
      border-left: 2px solid rgb(247, 247, 247);
    }
    .active {
      font-size: 0.35rem;
      color: #55c955;
      background-color: #fff;
      border-left: 2px solid #55c955;
    }
  }
</style>
