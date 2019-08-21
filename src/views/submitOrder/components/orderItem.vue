<template>
  <div id="order-item">
    <div class="title">{{groupItem.groupName}}</div>
    <div class="group-item" v-for="item in groupItem.groupItemList" :key="item.productId">
      <div class="checkbox">
        <div class="checkbox-right">
          <div class="image">
            <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.productInfo.pictureId}/120.jpeg`"
                 alt="购物车图片"/>
          </div>
          <div class="product-info">
            <p>{{item.productInfo.productName}}</p>
            <div class="content">
              <div class="price">
                <p>{{item.productInfo.pvStandard}}</p>
                <p>¥{{item.productInfo.periodMoney}}</p>
              </div>
              <div class="operate">
                <p>X{{item.quantity}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="carList-bottom">
      <p>小计：¥{{groupItem.groupSum}}元</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      groupItem: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style lang="less" scoped>
  #order-item {
    .title {
      padding: 12px;
      font-size: 1.35rem;
      font-weight: bold;
      color: #626262;
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
</style>
