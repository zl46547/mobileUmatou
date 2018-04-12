<template>
  <div class="main" v-if="datas">
    <h2>详细分类页</h2>
    <ul>
      <li v-for="k in datas.categoryDetail[id]" :key="k.ProductId">
      <router-link :to="{name:'详细页'}">
      <!--<img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/' +k.PictureId+ '/160.jpeg'" alt="">-->
      <!--<span>{{k.Name}}</span>-->
      </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        datas: {
          id: '',
          datas:[]
        }
      }
    },
    mounted () {
      var id = this.$route.params.id
      this.id = id
      this.$api({
        method: 'get',
        url: '/shihang/category/categoryDetail.json'
      }).then((res) => {
        console.log(JSON.stringify(res.data))
//        this.allData = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    watch: {
      $route () {

      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    flex: 9.8;
    height: 100%;
    &::-webkit-scrollbar {
      display: none
    }
    > h2 {
      font-size: 20px;
      padding: 2vw 4vw;
      color: #333;
      letter-spacing: 2px;
    }
    > ul {
      width: 100%;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      li {
        /*background-color: rgb(247,247,247);*/
        width: 33%;
        text-align: center;
        a {
          color: #666;
          display: block;
          img {
            display: block;
            width: 60%;
            margin: 4vw auto;
          }
          span {
            text-align: center;
          }
        }
      }
    }
  }
</style>
