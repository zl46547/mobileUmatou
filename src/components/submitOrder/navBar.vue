<template>
  <div class="navBar">
    <div class="navBarItem" v-for="(item,i) in nav_bar_list"
         :key="i" :class="{'isActive':i === activeItem}"
         @click="clickItem(i)">{{item.name}}({{item.num}})
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['nav_bar_list'],
    data () {
      return {
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
      width: 35vw;
      text-align: center;
    }
    .isActive {
      color: #ff3e5e;
      border-bottom: 2px solid #ff3e5e;
    }
  }

  @media screen and (min-width: 768px) {
    .navBar {
      .navBarItem {
        padding: 10px 15px;
        font-size: 24px;
        width: 180px;
      }
    }
  }
</style>
