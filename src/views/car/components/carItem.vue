<template>
  <div class="group-item">
    <div class="group-name van-hairline--bottom">{{groupItem.groupName}}</div>
    <div class="group-item-container"
         v-for="(item,index) in groupItem.groupItemList"
         :key="item.productId"
         @click="handleCheckboxClick(index,item.productId)"
    >
      <i class="iconfont"
         :class="{'icon-checkbox-blank':!item.checked,'icon-checkbox-marked':item.checked}"
      ></i>
      <div class="checkbox-right">
        <img class="image" :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.productInfo.pictureId}/120.jpeg`"
             alt=" 购物车图片"/>
        <div class="product-info">
          <p class="product-name">{{item.productInfo.productName}}</p>
          <div class="content">
            <div class="price">
              <p>{{item.productInfo.pvStandard}}</p>
              <p>¥{{item.productInfo.periodMoney}}</p>
            </div>
            <div class="operate">
              <div class="input-number">
                <p @click.stop="changeNum(-1,item)"
                   :class="{'disabled':item.quantity === 1}"
                >-</p>
                <p>{{item.quantity}}</p>
                <p @click.stop="changeNum(1,item)">+</p>
              </div>
              <div class="delete" @click.stop="deleteItem(item.productId)">
                删除
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { deleteGoods, setGoodsQuantity } from '../service'

  export default {
    props: {
      groupItem: {
        required: true,
        type: Object
      }
    },
    methods: {
      /**
       * 点击复选框
       * @param index
       * @param productId
       */
      handleCheckboxClick (index, productId) {
        let checkedStatus = !this.groupItem.groupItemList[index].checked
        this.$emit('handle-checkbox-click', {productId, checkedStatus})
      },
      /**
       * 删除购物车
       * @param productId
       */
      deleteItem (productId) {
        this.$message({
          description: '删除后订单无法还原,是否继续操作？',
          onConfirm: () => {
            deleteGoods({productIds: [productId]}).then(res => {
              if (res) {
                this.$emit('del-refresh', productId)
              }
            })
          }
        })
      },
      /**
       * 改变购买数量
       * @param value 购物车数量+1或者是-1
       * @param item
       */
      changeNum (value, item) {
        let quantity = item.quantity + value
        if (quantity < 1) {
          quantity = 1
        }
        setGoodsQuantity({quantity, productId: item.productId}).then(res => {
          if (res) {
            this.$emit('change-number', {quantity, productId: item.productId})
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .group-item {
    width: 100%;
    box-shadow: 0 1rem/@baseFontSize 6rem/@baseFontSize #d7d7d7;
    background-color: #fff;
    margin-bottom: 20rem/@baseFontSize;
    border-radius: 5rem/@baseFontSize;
    .group-name {
      padding: 20rem/@baseFontSize;
      font-size: 26rem/@baseFontSize;
      font-weight: bold;
      color: #626262;
    }

    .group-item-container {
      display: flex;
      align-items: center;

      .icon-checkbox-blank {
        font-size: 30rem/@baseFontSize;
        color: #b1b1b1;
      }

      .icon-checkbox-marked {
        font-size: 30rem/@baseFontSize;
        color: @themeColor;
      }

      .iconfont {
        display: block;
        flex: none;
        width: 60rem/@baseFontSize;
        text-align: center;
        cursor: pointer;
      }
      .checkbox-right {
        flex: 1;
        display: flex;
        align-items: center;

        .image {
          display: block;
          width: 150rem/@baseFontSize;
          padding: 20rem/@baseFontSize;
        }

        .product-info {
          flex: 1;
          padding-right: 10px;
          min-width: 0;
          .product-name {
            margin: 25rem/@baseFontSize 0;
            font-size: 28rem/@baseFontSize;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
          }

          .content {
            display: flex;
            justify-content: space-between;

            .price {
              p {
                &:nth-of-type(1) {
                  color: #999;
                  font-size: 28rem/@baseFontSize;
                }

                &:nth-of-type(2) {
                  color: #f05423;
                  font-size: 28rem/@baseFontSize;
                }
              }
            }

            .operate {
              .input-number {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                border: 1px solid #cccccc;

                p {
                  height: 45rem/@baseFontSize;
                  line-height: 45rem/@baseFontSize;
                  text-align: center;
                  font-size: 1.2rem;
                  width: 45rem/@baseFontSize;
                  border-right: 1px solid #cccccc;
                  &:nth-of-type(1) {
                    border-radius: 5rem/@baseFontSize 0 0 5rem/@baseFontSize
                  }
                  &:nth-of-type(2) {
                    width: 50rem/@baseFontSize;
                    font-size: 26rem/@baseFontSize;
                  }
                  &:nth-of-type(3) {
                    border: none;
                    border-radius: 0 5rem/@baseFontSize 5rem/@baseFontSize 0
                  }
                }
              }
              .disabled {
                color: #ccc;
                cursor: not-allowed;
              }
              .delete {
                height: 46rem/@baseFontSize;
                line-height: 46rem/@baseFontSize;
                margin: 10rem/@baseFontSize 0;
                border-radius: 5rem/@baseFontSize;
                font-size: 20rem/@baseFontSize;
                width: 80rem/@baseFontSize;
                text-align: center;
                color: #fff;
                background-color: @red;
                float: right;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
