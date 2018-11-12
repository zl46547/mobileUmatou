<template>
  <div id="rate">
    <div v-if="rateData">
      <div v-for="(item,i) in rateData" :key="i">
        <!-- 头像、昵称、评论星级 -->
        <div class="rate-recommond-list-top">
          <div>
            <img v-if="item.CustomerFace" :src="item.CustomerFace" mode="scaleToFill"
                 @click="showCustomerFace(item.CustomerFace)"/>
            <img src="../../../assets/images/face.png" v-else/>
          </div>
          <div>
            <div class="customer-name">{{item.CustomerName}}</div>
            <v-star :satisfyValue="parseInt(item.ProQuality)"></v-star>
          </div>
        </div>
        <div class="rate-recommond-list-content">
          <!-- 评论标签 -->
          <div class="div-badge" v-if="item.Tags.length>0">
            <div class="activities-badge" v-for="(tag,tagIndex) in item.Tags" :key="tagIndex">{{tag}}</div>
          </div>
          <!-- 评论内容 -->
          <div class="reflex-context">{{item.ReflexContext}}</div>
          <!-- 附图 -->
          <div class="rate-img" v-if="item.Pics && item.Pics.length > 0">
            <img v-for="(rateImgItem,rateImgIndex) in item.Pics" :key="rateImgIndex" v-lazy="rateImgItem" alt=""
                 @click="imgClick(item.Pics,rateImgIndex)"/>
          </div>
          <!-- 评论时间、游客回复 -->
          <div class="create-time">
            <div>{{item.CreateTime}}</div>
            <div>
              <span class="iconfont icon-rate"></span>
              <span>{{item.ReflexCount}}</span>
            </div>
          </div>
          <!-- 客服回复 -->
          <div v-if="item.ServiceReflexs != null">
            <p class="service-reflexs">[客服回复]:{{item.ServiceReflexs[0]}}</p>
          </div>
        </div>
      </div>
      <!-- 显示大图 -->
      <div v-if="showImageObj" @click="closeImageObj">
        <div class="bigImg">
          <div>
            <img :src="showImageObj.imgList[showImageObj.index]" alt=""/>
          </div>
        </div>
      </div>
      <!-- 显示大图 -->
      <div v-if="showCustomerFaceObj" @click="closeImageObj">
        <div class="bigImg">
          <div>
            <img :src="showCustomerFaceObj" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/common/star.vue'
  export default {
    mounted() {
    },
    props: ['rateData'],
    components: {
      'VStar': Star
    },
    data() {
      return {
        showImageObj: '',
        showCustomerFaceObj: ''
      }
    },
    methods: {
      /**
       * 点击图片，显示大图
       * @param imgs 所有的图片列表
       * @param index 点击的图片下标
       */
      imgClick (imgs, index = 0) {
        var vm = this
        var data = {}
        data['showBigImg'] = true
        data['imgList'] = imgs
        data['index'] = index
        vm.showImageObj = data
      },
      /**
       * 点击图片，显示头像大图
       * @param img 点击的图片
       */
      showCustomerFace (img) {
        var vm = this
        vm.showCustomerFaceObj = img
      },
      /**
       * 关闭图片
       */
      closeImageObj () {
        this.showImageObj = ''
        this.showCustomerFaceObj = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  #rate {
    background-color: #fff;
    .rate-recommond-list-top {
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
        .icon-rate {
          font-size: 1.4rem;
        }
        span {
          padding-left: 3px;
        }
      }
      .div-badge {
        display: flex;
        margin-top: 12px;
        .activities-badge {
          font-size: 1.26rem;
          border: 1px solid #49aa34;
          color: #49aa34;
          border-radius: 4px;
          text-align: center;
          padding: 4px 10px;
          margin-right: 10px;
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
    /* 显示大图 */
    .bigImg {
      z-index: 99;
      overflow: hidden;
      width: 100%;
      position: fixed;
      top: 0;
      bottom: 50px;
      left: 50%;
      max-width:640px;
      transform: translateX(-50%);
      background-color: rgba(3, 3, 3, 0.5);
      > div {
        display: flex;
        width: 100%;
        height: 100vh;
        img {
          margin: auto;
          width: 100%;
          height: 60%;
        }
      }
    }

    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-star:before {
      content: "\e650";
    }

    .icon-rate:before {
      content: "\e642";
    }
  }
  @media screen and (min-width: 400px) {
    #rate {
      .rate-recommond-list-top {
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
          .icon-rate {
            font-size: 1.6rem;
          }
          span {
            /*padding-left: 3px;*/
          }
        }
        .div-badge {
          margin-top: 16px;
          .activities-badge {
            font-size: 1.5rem;
            padding: 4px 14px;
            margin-right: 14px;
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
