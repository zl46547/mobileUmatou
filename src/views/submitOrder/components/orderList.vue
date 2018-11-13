<template>
  <div id="orderList">
    <div class="groupCarList" v-if="groupCarList.length>0">
      <div class="carList" v-for="(groupItem,groupIndex) in groupCarList" :key="groupIndex">
        <div class="title">{{groupItem.financeCName}}</div>
        <div class="group-item" v-for="(item,itemIndex) in groupItem.groupCarItem" :key="itemIndex">
          <div class="checkbox">
            <div class="checkbox-right">
              <div class="image">
                <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'"
                     alt="购物车图片"/>
              </div>
              <div class="product-info">
                <p>{{item.ProductName}}</p>
                <div class="content">
                  <div class="price">
                    <p>{{item.PvStandard}}</p>
                    <p>¥{{item.PeriodMoney}}</p>
                  </div>
                  <div class="operate">
                    <p>X{{item.buyNum}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carList-bottom">
          <p>小计：¥{{groupItem.sumMoney}}元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import store from '@/vuex/store.js'
  export default {
    components: {},
    mounted () {
      var vm = this
      vm.getGroupCarList()
    },
    data () {
      return {
        carList: [],
        groupCarList: []
      }
    },
    methods: {
      /**
       * 获取分组后的购物车列表
       */
      getGroupCarList() {
        var vm = this
        vm.carList = store.state.car.selectedCarList
        var groupCarListTempl = vm.carList.groupBy(function (t) {
          return t.FinanceCName
        })
        var groupCarList = []
        groupCarListTempl.forEach(function (groupCarItem) {
          var sumMoney = groupCarItem.select(function (e) {
            return e.PeriodMoney * e.buyNum
          }).sum()
          groupCarList.push({
            groupCarItem: groupCarItem,
            sumMoney: sumMoney.toFixed(2),
            financeCName: groupCarItem[0].FinanceCName
          })
        })
        vm.groupCarList = groupCarList
      }
    }
  }
</script>

<style lang="less" scoped>
  #orderList {
    overflow: hidden;
    .groupCarList {
      margin: 0 10px;
    }
    .carList {
      width: 100%;
      box-shadow: 0 1px 6px #d7d7d7;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-top: 10px;
      }
      .title {
        padding: 12px;
        font-size: 1.35rem;
        font-weight: bold;
        color: #626262;
        font-family: "Microsoft JhengHei";
        border-bottom: 1px solid #ddd;
      }
      .group-item {
        border-bottom: 1px solid #eee;
        background-color: #fff;
        .checkbox {
          display: flex;
          align-items: center;
          width: 100%;
          .checkbox-right {
            display: flex;
            align-items: center;
            width:100%;
            .image {
              width: 100px;
              padding: 20px 10px;
              img {
                width: 100%;
              }
            }
            .product-info {
              width: calc(100% - 120px);
              margin-right: 20px;
              > p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 5px;
                color: #333;
                font-size: 1.35rem;
              }
              .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .price {
                  p {
                    &:nth-of-type(1) {
                      color: #999;
                      font-size: 1.3rem;
                    }
                    &:nth-of-type(2) {
                      color: #f05423;
                      font-size: 1.4rem;
                    }
                  }
                }
                .operate {
                  p {
                    color: #333;
                    font-size: 1.35rem;
                  }
                }
              }
            }
          }
        }
      }
      .carList-bottom {
        border-radius: 5px;
        color: #f05423;
        display: flex;
        align-items: center;
        p {
          font-size: 1.35rem;
          padding: 14px 20px
        }
      }
    }
  }

  @media screen and (min-width: 400px) {
    #orderList {
      .groupCarList {
        margin: 0 18px;
      }
      .carList {
        margin-bottom: 18px;
        &:first-of-type {
          margin-top: 18px;
        }
        .title {
          font-size: 1.55rem;
        }
        .group-item {
          .checkbox {
            .checkbox-right {
              .image {
                width: 130px;
                padding: 20px;
                img {
                  width: 100%;
                }
              }
              .product-info {
                width: calc(100% - 140px);
                margin-right: 30px;
                > p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  margin-bottom: 5px;
                  color: #333;
                  font-size: 1.35rem;
                }
                .content {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .price {
                    p {
                      &:nth-of-type(1) {
                        color: #999;
                        font-size: 1.3rem;
                      }
                      &:nth-of-type(2) {
                        color: #f05423;
                        font-size: 1.4rem;
                      }
                    }
                  }
                  .operate {
                    p {
                      color: #333;
                      font-size: 1.35rem;
                    }
                  }
                }
              }
            }
          }
        }
        .carList-bottom {
          p {
            font-size: 1.55rem;
          }
        }
      }
    }
  }
</style>
