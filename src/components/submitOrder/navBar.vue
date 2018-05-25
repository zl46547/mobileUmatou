<template>
  <div class="navBar">
    <div class="navBarItem" v-for="(item,i) in navBarList"
         :key="i" :class="{'isActive':i === activeItem}"
         @click="clickItem(i)">{{item.name}}({{item.num}})
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        navBarList: [
          {
            name: '可用优惠券',
            num: 1
          },
          {
            name: '不可用优惠券',
            num: 5
          }
        ],
        activeItem: 0
      }
    },
    computed: {},
    methods: {
      clickItem (val) {
        this.activeItem = val
        this.$emit('clicked-nav-bar', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .navBar {
    display: flex;
    justify-content: space-around;
    .navBarItem {
      padding: 1vh 2vw;
      font-size: 4vw;
      width:120px;
      text-align: center;
    }
    .isActive {
      color: #ff3e5e;
      border-bottom: 2px solid #ff3e5e;
    }
  }

  @media screen and (min-width: 768px) {
  }
</style>
