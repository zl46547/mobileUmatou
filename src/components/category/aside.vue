<template>
  <aside class="aside" v-if="datas">
    <ul>
      <li v-for="(k,i) in datas.category" @click="changeTabIndex(i)" :key="k.title">
        <router-link :to="{path:'/category/'+k.Name}" :class="{active:i==tabIndex}">{{k.Name}}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['datas'],
    computed: {
      tabIndex () {
        return this.$store.state.category.tabIndex
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
  .aside{
    flex: 3.2;
    height:100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: rgb(247,247,247);
    &::-webkit-scrollbar{display: none}
    >ul{
      height:100%;
      width:100%;
      background-color: rgb(247,247,247);
      li{
        background-color: rgb(247,247,247);
        text-align: center;
        a{
          display: block;
          padding:4vw 0;
          position: relative;
          font-size:16px;
        }
        .active{
          position: relative;
          font-size:18px;
          color: #55c955;
          background-color: #fff;
          &::before{
            width:3px;
            height:28px;
            content: "";
            position: absolute;
            left: 0;
            top:50%;
            margin-top: -14px;
            background-color: #55c955;
          }
        }
      }
    }
  }
</style>
