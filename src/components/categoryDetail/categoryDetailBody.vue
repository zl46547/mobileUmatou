<template>
  <div class="main" v-if="data">
    <el-row>
      <el-col :span="12" v-for="k in data" :key="k.ProductId">
        <router-link :to="'/productDetail/'+k.ProductId">
          <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/' +k.PictureId+ '/500.jpeg'" alt="">
          <p class="productName">{{k.ProductName}}</p>
          <p class="pvStandard">{{k.PvStandard}}</p>
          <p class="periodMoney">¥{{k.PeriodMoney}}</p>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        id: '',
        data: []
      }
    },
    mounted () {
      var id = this.$route.params.id
      this.id = id
      this.$api({
        method: 'get',
        url: '/shihang/category/categoryDetail/' + id + '.json'
      }).then((res) => {
        this.data = res.data.Data.SourceData
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style lang="less" scoped>
  .main {
    background-color: #ebebeb;
    width: 100%;
    height: 100%;
    .el-row {
      width: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      margin: 12vw 0 15vw 0;
      padding: 1px;
      a {
        display: block;
        background-color: #fff;
        margin: 2px;
        color: #666;
        img {
          width: 100%;
        }
        p {
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 5px 8px;
          width: 60%;
          overflow: hidden;
          margin-left: 20px;
        }
        .productName {
          font-size: 16px;
        }
        .pvStandard {
          color: #999899;
          font-size: 12px;
        }
        .periodMoney {
          font-size: 20px;
          color: #f05423;
        }
      }
    }
  }
</style>
