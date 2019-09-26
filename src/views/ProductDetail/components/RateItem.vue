<template>
  <div class="rate-item">
    <!-- 头像、昵称、评论星级 -->
    <div class="rate-basic">
      <img v-if="rateItem.customerFace" :src="rateItem.customerFace"
           @click="showCustomerFace(rateItem.customerFace)"/>
      <img src="../../../assets/images/face.png" v-else/>
      <div>
        <div class="customer-name">{{rateItem.customerName}}</div>
        <Rate v-model="rateItem.star" readonly></Rate>
      </div>
    </div>
    <div class="rate-recommond-container">
      <!-- 评论内容 -->
      <p class="reflex-context">{{rateItem.content}}</p>
      <!-- 附图 -->
      <div class="rate-img-container"
           v-if="rateItem.pictureCollection && rateItem.pictureCollection.length > 0"
      >
        <img v-for="(rateImgItem,rateImgIndex) in rateItem.pictureCollection"
             :key="rateImgIndex"
             v-lazy="rateImgItem"
             alt="评论图片"
             @click="imgClick(rateItem.pictureCollection,rateImgIndex)"/>
      </div>
      <!-- 评论时间、游客回复 -->
      <div class="create-time">
        <p>{{moment(rateItem.createDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
        <p>
          <i class="iconfont icon-message"></i>
          <span>{{rateItem.replyCount}}</span>
        </p>
      </div>
      <!-- 客服回复 -->
      <div v-if="rateItem.serviceReflexs">
        <p class="service-reflexs">[客服回复]:{{rateItem.csReplyCollection[0]}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Rate, ImagePreview } from 'vant'
  import moment from 'moment'

  export default {
    props: {
      rateItem: {
        default: () => {},
        type: Object
      }
    },
    components: {
      Rate
    },
    data () {
      return {
        moment
      }
    },
    methods: {
      /**
       * 点击图片，显示大图
       * @param images 所有的图片列表
       * @param index 点击的图片下标
       */
      imgClick (images, index) {
        ImagePreview(images)
      },
      /**
       * 点击图片，显示头像大图
       * @param images 点击的图片
       */
      showCustomerFace (images) {
        ImagePreview([images])
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .rate-item {
    .rate-basic {
      display: flex;
      align-items: center;
      padding: 22rem/@baseFontSize 22rem/@baseFontSize 0 26rem/@baseFontSize;

      img {
        display: block;
        width: 80rem/@baseFontSize;
        height: 80rem/@baseFontSize;
        border-radius: 50%;
        margin-right: 20px;
        cursor: pointer;
      }

      .customer-name {
        font-size: 1.5rem;
      }
    }
    .rate-recommond-container {
      padding: 20rem/@baseFontSize;
      .reflex-context {
        font-size: 1.3rem;
        margin-top: 22rem/@baseFontSize;
      }
      .rate-img-container {
        display: flex;
        margin-top: 22rem/@baseFontSize;

        img {
          width: 100rem/@baseFontSize;
          height: 100rem/@baseFontSize;
          border-radius: 5rem/@baseFontSize;
          cursor: pointer;
          margin-right: 20rem/@baseFontSize;
        }
      }
      .create-time {
        display: flex;
        justify-content: space-between;
        font-size: 1.3rem;
        margin-top: 22rem/@baseFontSize;

        .icon-message {
          font-size: 24rem/@baseFontSize;
        }
      }
      .service-reflexs {
        color: @red;
        font-size: 1.3rem;
      }
    }
  }
</style>
