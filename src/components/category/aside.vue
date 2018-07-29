<template>
  <aside class="aside" v-if="bigCategory">
    <ul>
      <li v-for="(k,i) in getAllBigCategory" @click="changeTabIndex(i)" :key="k.Id">
        <router-link :to="{path:'/category/'+k.Id}" :class="{active:i==tabIndex}">{{k.Name}}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['bigCategory'],
    computed: {
      tabIndex () {
        return this.$store.state.category.tabIndex
      },
      getAllBigCategory () {
        var vm = this
        var obj = {
          'Id': 0,
          'Name': '推荐分类',
          'PictureId': 999999
        }
        vm.bigCategory.unshift(obj)
        return vm.bigCategory
      }
    },
    methods: {
      changeTabIndex (i) {
        this.$store.commit('CHANGE_TABINDEX', i)
      }
    }
  }
</script>

<style lang="less" scoped>
  .aside {
    width:22vw;
    height: 84vh;
    -webkit-overflow-scrolling: touch;
    background-color: rgb(247, 247, 247);
    &::-webkit-scrollbar {
      display: none
    }
    > ul {
      height: 100%;
      width: 100%;
      background-color: rgb(247, 247, 247);
      li {
        background-color: rgb(247, 247, 247);
        text-align: center;
        a {
          display: block;
          padding: 4vw 0;
          position: relative;
          font-size: 3vw;
        }
        .active {
          position: relative;
          font-size: 4vw;
          color: #55c955;
          background-color: #fff;
          &::before {
            width: 3px;
            height: 100%;
            content: "";
            position: absolute;
            left: 0;
            top: 0%;
            background-color: #55c955;
          }
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .aside {
      width:135px;
      > ul {
        li {
          a {
            padding: 16px 0;
            position: relative;
            font-size: 16px;
          }
          .active {
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
