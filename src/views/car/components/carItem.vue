<template>
  <div id="group-item">
    <div class="group-name">{{groupItem.groupName}}</div>
    <div class="group-item-container" v-for="(item,index) in groupItem.groupItemList" :key="index">
      <div class="checkbox">
        <div class="checkbox-left" @click="handleCheckboxClick(index,item.productId)">
          <i class="iconfont icon-checkbox-blank" v-if="!item.checked"></i>
          <i class="iconfont icon-checkbox-marked" v-if="item.checked"></i>
        </div>
        <div class="checkbox-right">
          <div class="image">
            <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.productInfo.pictureId}/120.jpeg`" alt=" 购物车图片"/>
          </div>
          <div class="product-info">
            <p>{{item.productInfo.productName}}</p>
            <div class="content">
              <div class="price">
                <p>{{item.productInfo.pvStandard}}</p>
                <p>¥{{item.productInfo.periodMoney}}</p>
              </div>
              <div class="operate">
                <div class="inputNumber">
                  <div @click="changeNum(-1,item.productId)">
                    <p>-</p>
                  </div>
                  <div>
                    <p>{{item.quantity}}</p>
                  </div>
                  <div @click="changeNum(1,item.productId)">
                    <p>+</p>
                  </div>
                </div>
                <div class="delete">
                  <p @click="deleteItem(item.productId)">删除</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {deleteGoods} from '../service'
  import {Toast} from 'vant'

  export default {
    props: {
      groupItem: {
        required: true,
        type: Object
      }
    },
    mounted() {
    },
    data() {
      return {
      }
    },
    methods: {
      /**
       * 点击复选框
       * @param index
       * @param productId
       */
      handleCheckboxClick(index, productId) {
        let checkedStatus = !this.groupItem.groupItemList[index].checked
        this.$emit('handle-checkbox-click', {productId, checkedStatus})
        // this.whetherIsCheckAll()
      },
      deleteItem(productId) {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        this.$message({
          description: '删除后订单无法还原,是否继续操作？',
          onComfirm: () => {
            deleteGoods({productIds: [productId], customerGuid}).then(res => {
              if (res) {
                Toast('删除成功')
                this.$emit('del-refresh', productId)
              }
            })
            // let index = -1
            // for (let i = 0; i < this.carList.length; i++) {
            //   if (this.carList[i].ProductId === productId) {
            //     index = i
            //   }
            // }
            // this.isComfirmDel(index)
          }
        })
      },
      changeNum() {

      }
    },
    computed: {}
  }
</script>

<style lang="less" scoped>
  #group-item {
    width: 100%;
    box-shadow: 0 1px 6px #d7d7d7;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 5px;

    &:first-of-type {
      margin-top: 10px;
    }

    .group-name {
      padding: 12px;
      font-size: 1.35rem;
      font-weight: bold;
      color: #626262;
      border-bottom: 1px solid #ddd;
    }

    .group-item-container {
      border-bottom: 1px solid #eee;
      background-color: #fff;

      .checkbox {
        display: flex;
        align-items: center;
        width: 100%;

        .checkbox-left {
          width: 10%;
          text-align: center;
          cursor: pointer;

          .icon-checkbox-blank {
            font-size: 1.5rem;
            color: #b1b1b1;
          }

          .icon-checkbox-marked {
            font-size: 1.5rem;
            color: #00d300;
          }
        }

        .checkbox-right {
          width: 90%;
          display: flex;
          align-items: center;

          .image {
            width: 100px;
            padding: 20px 10px;

            img {
              width: 100%;
            }
          }

          .product-info {
            width: calc(100% - 120px);
            padding-right: 10px;

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
                .inputNumber {
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  border: 1px solid #cccccc;

                  div {
                    font-size: 1.2rem;
                    width: 25px;
                    border-right: 1px solid #cccccc;

                    &:last-of-type {
                      border: none;
                    }

                    p {
                      height: 28px;
                      line-height: 28px;
                      text-align: center;
                    }
                  }

                  div:nth-of-type(1) {
                    border-radius: 4px 0 0 4px
                  }

                  div:nth-of-type(2) {
                    width: 35px;

                    p {
                      font-size: 1.2rem;
                    }
                  }

                  div:nth-of-type(3) {
                    border-radius: 0 4px 4px 0
                  }
                }

                .delete {
                  margin-top: 1vh;
                  font-size: 1.3rem;
                  float: right;
                  cursor: pointer;

                  p {
                    padding: 5px 0;
                    text-align: center;
                    color: #fff;
                    width: 80px;
                    background-color: red;
                    border-radius: 4px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
