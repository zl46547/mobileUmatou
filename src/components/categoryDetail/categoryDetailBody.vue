<template>
  <div class="main" v-if="data">
    <el-row>
      <el-col :span="12" v-for="k in data" :key="k.ProductId" class="detail">
        <router-link :to="'/productDetail/'+k.ProductId">
          <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/' +k.PictureId+ '/500.jpeg'" alt="">
        </router-link>
        <div class="product-detail">
          <p class="productName">{{k.ProductName}}</p>
          <p class="pvStandard">{{k.PvStandard}}</p>
          <div class="price">
            <p class="periodMoney">¥{{k.PeriodMoney}}</p>
            <div @click="addCart(k)">
              <i class="iconfont icon-cart"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import addCartUtil from '../../util/addCart'

  export default {
    data () {
      return {
        id: '',
        data: []
      }
    },
    methods: {
      addCart (val) {
        addCartUtil.addCart(val)
      }
    },
    mounted () {
      var id = this.$route.params.id
      this.id = id
      this.$api({
        method: 'get',
        url: '/shihang/category/categoryDetail/' + id + '.json'
      }).then((res) => {
        this.data = res.data.data.Data.SourceData
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
    height: 81vh;
    &::-webkit-scrollbar {
      display: none
    }
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .el-row {
      width: 100%;
      padding: 1px;
      .detail {
        background-color: #fff;
        border: 2px solid #e6e6e6;
        a {
          display: block;
          color: #666;
          img {
            width: 100%;
          }
        }
        .product-detail {
          p {
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 5px 8px;
            width: 60%;
            overflow: hidden;
            margin-left: 2vw;
          }
          .productName {
            font-size: 3vw;
          }
          .pvStandard {
            color: #999899;
            font-size: 2vw;
          }
          .price {
            display: flex;
            justify-content: space-between;
            .periodMoney {
              font-size: 3vw;
              color: #f05423;
            }
            > div {
              width: 4vw;
              height: 4vw;
              border: 1px solid #ccc;
              border-radius: 50%;
              display: flex;
              margin: 1vw;
              align-items: center;
              i {
                font-size: 2vw;
                margin: auto;
                color: #e55b2f;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .main {
      background-color: #ebebeb;
      width: 768px;
      height: 645px;
      .el-row {
        width: 768px;
        .detail {
          a {
            img {
              width: 384px;
            }
          }
          .product-detail {
            p {
              margin-left: 15px;
            }
            .productName {
              font-size: 18px;
            }
            .pvStandard {
              font-size: 16px;
            }
            .price {
              .periodMoney {
                font-size: 18px;
              }
              > div {
                width: 24px;
                height: 24px;
                margin: 10px;
                i {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
