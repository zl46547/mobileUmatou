<template>
  <div class="rate-item">
    <!-- 头像、昵称、评论星级 -->
    <div class="rate-basic">
      <div>
        <img v-if="rateItem.customerFace" :src="rateItem.customerFace"
             @click="showCustomerFace(rateItem.customerFace)"/>
        <img src="../../../assets/images/face.png" v-else/>
      </div>
      <div>
        <div class="customer-name">{{rateItem.customerName}}</div>
        <Star :satisfyValue="parseInt(rateItem.star)"></Star>
      </div>
    </div>
    <div class="rate-recommond-list-content">
      <!-- 评论内容 -->
      <div class="reflex-context">{{rateItem.content}}</div>
      <!-- 附图 -->
      <div class="rate-img" v-if="rateItem.pictureCollection && rateItem.pictureCollection.length > 0">
        <img v-for="(rateImgItem,rateImgIndex) in rateItem.pictureCollection" :key="rateImgIndex" v-lazy="rateImgItem"
             alt=""
             @click="imgClick(rateItem.pictureCollection,rateImgIndex)"/>
      </div>
      <!-- 评论时间、游客回复 -->
      <div class="create-time">
        <div>{{moment(rateItem.createDate).format("YYYY-MM-DD HH:mm:ss")}}</div>
        <div>
          <i class="iconfont icon-message"></i>
          <span>{{rateItem.replyCount}}</span>
        </div>
      </div>
      <!-- 客服回复 -->
      <div v-if="rateItem.serviceReflexs != null">
        <p class="service-reflexs">[客服回复]:{{rateItem.csReplyCollection[0]}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/common/star.vue'
  import moment from 'moment'
  import { ImagePreview } from 'vant'
  export default {
    props: {
      rateItem: {
        default: () => {},
        type: Object
      }
    },
    components: {
      Star
    },
    data() {
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
      imgClick(images, index) {
        ImagePreview(images)
      },
      /**
       * 点击图片，显示头像大图
       * @param images 点击的图片
       */
      showCustomerFace(images) {
        ImagePreview([images])
      }
    }
  }
</script>

<style lang="less" scoped>
  .rate-item{
    .rate-basic {
      display: flex;
      align-items: center;
      padding: 12px 12px 0 16px;

      img {
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 20px;
        cursor: pointer;
      }

      .customer-name {
        font-size: 1.3rem;
      }
    }
    .rate-recommond-list-content {
      padding-bottom: 10px;
      > div {
        padding: 0 12px 0 16px;
      }
      .reflex-context {
        font-size: 1.3rem;
        margin-top: 12px;
      }
      .create-time {
        display: flex;
        justify-content: space-between;
        font-size: 1.3rem;
        margin-top: 12px;

        .icon-message {
          font-size: 1.4rem;
        }
      }

      .rate-img {
        display: flex;
        margin-top: 12px;

        img {
          width: 100px;
          height: 100px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
        }
      }

      .service-reflexs {
        color: red;
        font-size: 1.3rem;
      }
    }
  }
  @media screen and (min-width: 400px) {
    #rate {
      .rate-basic {
        padding: 16px 16px 0 20px;
        img {
          width: 80px;
          height: 80px;
        }
        .customer-name {
          font-size: 1.5rem;
        }
      }
      .rate-recommond-list-content {
        > div {
          padding: 0 16px 0 20px;
        }
        .reflex-context {
          font-size: 1.5rem;
          margin-top: 16px;
        }
        .create-time {
          font-size: 1.5rem;
          margin-top: 16px;
          .icon-message {
            font-size: 1.6rem;
          }
        }
        .rate-img {
          margin-top: 16px;

          img {
            margin-right: 14px;
          }
        }
        .service-reflexs {
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
