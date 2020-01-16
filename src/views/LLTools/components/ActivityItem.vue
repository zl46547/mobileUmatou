<template>
  <div class="activity-item">
    <img :src="detail.faceImg" alt="商品"/>
    <div class="product-detail">
      <div class="title van-hairline--bottom">
        {{detail.title}}
      </div>
      <div class="content-bottom">
        <div class="content-bottom-price">
          <div class="current-price">{{detail.salePriceStr}}</div>
          <div class="origin-price">{{detail.originPriceStr}}</div>
        </div>
        <span>销售量：{{detail.saleAmount}}</span>
      </div>
      <!-- customer:用户，adminActivity：管理员活动页面 adminPool：管理员选品池页面 -->
      <div class="operate-btn van-hairline--top" v-if="userType !=='customer'">
        <div class="btn-item image"
             v-if="detail.checked && userType ==='adminActivity'"
             @click.stop="handleCreateImage(detail)">
          <i class="iconfont icon-image"></i>
          <span>生成图片</span>
        </div>
        <div class="btn-item"
             v-if="!detail.checked && userType ==='adminPool'"
             @click.stop="handleAdd(detail)">
          <i class="iconfont icon-add"></i>
          <span>添加</span>
        </div>
        <div class="btn-item has-marked" v-if="detail.checked && userType ==='adminPool'">
          <i class="iconfont icon-checkbox-marked"></i>
          <span>已添加</span>
        </div>
        <div class="btn-item delete"
             v-if="detail.checked"
             @click.stop="handleDelete(detail)"
        >
          <i class="iconfont icon-close"></i>
          <span>删除</span>
        </div>
        <div class="btn-item" :class="{'is-hot':getHotStatus(detail)}"
             v-if="detail.checked"
             @click.stop="handleChangeHot(detail)"
        >
          <i class="iconfont icon-hot"></i>
          <span>擦亮</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addPool, deleteProducts, changeHot} from '../service'
  import dayjs from 'dayjs'

  export default {
    data() {
      return {}
    },
    props: {
      detail: {
        require: true
      },
      userType: {
        type: String
      }
    },
    methods: {
      handleCreateImage(props) {

      },
      getHotStatus(props) {
        let startTime = dayjs(dayjs().format('YYYY-MM-DD'))
        let endTime = dayjs(dayjs(props.last_modified_time).format('YYYY-MM-DD'))
        return startTime.diff(endTime, 'days') === 0
      },
      handleAdd(props) {
        addPool(props).then(res => {
          this.$emit('refresh', props.id)
        })
      },
      handleDelete({id}) {
        deleteProducts({id}).then(res => {
          this.$emit('refresh', id)
        })
      },
      handleChangeHot({id}) {
        changeHot({id}).then(res => {
          this.$emit('refreshRubbing', id)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .van-dialog {
    background-color: transparent;
    border-radius: 8px;
    margin-top: 50%;
    transform: translate(-50%, -70%);
  }

  .wrapper {
    .close-btn {
      margin-top: 1rem;
      text-align: center;
      font-size: 3rem;
      color: #fff;
    }
  }

  .activity-item {
    margin-top: 1rem;
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    border-radius: 1rem;

    img {
      border-radius: 8px 8px 0 0;
      width: 100%;
    }

    .product-detail {
      padding: 10rem/@baseFontSize 20rem/@baseFontSize;

      .title {
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 28rem/@baseFontSize;
        word-break: break-all;
        padding: .5rem;
      }

      .content-bottom {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rem/@baseFontSize;;

        .content-bottom-price {
          display: flex;
          align-items: center;

          .current-price {
            color: @priceColor;
            font-size: 32rem/@baseFontSize;
          }

          .origin-price {
            font-size: 24rem/@baseFontSize;
            text-decoration: line-through;
            margin-left: 1rem;
          }
        }
      }

      .operate-btn {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: flex-end;
        align-items: center;

        .btn-item {
          padding: 10rem/@baseFontSize 0;
          text-align: center;
          width: 8rem;
        }

        .has-marked {
          color: #00b625;
        }

        .delete, .is-hot {
          color: #ff3a00;
        }
        .image{
          color: #1989fa;
        }
      }
    }
  }
</style>
