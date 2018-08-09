<template>
  <div class="rate-content">
    <div v-if="formateRes">
      <ul>
        <li v-for="(item,i) in formateRes" :key="i">
          <!-- 头像、昵称、评论星级 -->
          <div class="rate-recommond-list-top">
            <div>
              <img v-if="item.CustomerFace !== null" :src="item.CustomerFace" alt="">
              <img v-if="item.CustomerFace === null" src="../../assets/images/face.png" alt="">
            </div>
            <div>
              <p>{{item.CustomerName}}</p>
              <el-rate v-model="item.ProQuality" disabled show-score text-color="#ff9900"
                       score-template="{value}"></el-rate>
            </div>
          </div>
          <div class="rate-recommond-list-content">
            <!-- 评论标签 -->
            <div class="div-badge">
              <div class="activities-badge" v-for="(tag,i) in item.Tags" :key="i" v-if="item.Tags.length>0">{{tag}}</div>
            </div>
            <!-- 评论内容 -->
            <div class="reflex-context">{{item.ReflexContext}}</div>
            <!-- 附图 -->
            <div class="rate-img">
              <img v-for="(imgItem,i) in item.Pics" :key="i" :src="imgItem" alt="" v-if="item.Pics.length>0"
                   @click="imageClick(item.Pics,i)">
            </div>
            <!-- 评论时间、游客回复 -->
            <div class="create-time">
              <div>{{item.CreateTime}}</div>
              <div><i class="iconfont icon-mark"></i><span>0</span></div>
            </div>
            <!-- 客服回复 -->
            <div v-if="item.ServiceReflexs != null">
              <p class="service-reflexs">[客服回复]:{{item.ServiceReflexs[0]}}</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- 显示大图 -->
      <div v-if="showImageObj" @click="closeImageObj">
        <div class="bigImg">
          <div>
            <img :src="showImageObj.imageList[showImageObj.index]" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['rateResponse'],
    /* 接口中CreateTime带有'T',该计算属性主要是去除'T' */
    computed: {
      formateRes () {
        if (this.rateResponse.length > 0) {
          this.rateResponse.forEach(function (e) {
            e.CreateTime = e.CreateTime.replace('T', ' ')
          })
        }
        return this.rateResponse
      }
    },
    data() {
      return {
        showImageObj: ''
      }
    },
    methods: {
      /**
       * 点击图片，显示大图
       * @param imageList 所有的图片列表
       * @param index 点击的图片下标
       */
      imageClick (imageList, index) {
        var vm = this
        var data = {}
        data['showBigImg'] = true
        data['imageList'] = imageList
        data['index'] = index
        vm.showImageObj = data
      },
      /**
       * 关闭图片
       */
      closeImageObj () {
        this.showImageObj = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .rate-content {
    .rate-recommond-list-top {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 2vh 2vw 0 4vw;
      img {
        width: 15vw;
        height: 15vw;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 20px;
      }
      p {
        font-size:1.2rem;
      }
    }
    .rate-recommond-list-content {
      padding-bottom: 10px;
      > div {
        padding: 0 10px 10px 10px
      }
      .reflex-context {
        margin-left: 2vw;
        font-size:1.2rem;
      }
      .create-time {
        display: flex;
        justify-content: space-between;
        height: 5vw;
        line-height: 5vw;
        font-size:1.2rem;
        .icon-mark {
          font-size: 1.5rem;
        }
        span {
          padding-left: 4px;
        }
      }
      .div-badge {
        display: flex;
        margin-top: 3vh;
        .activities-badge {
          font-size:1.1rem;
          border: 1px solid #49aa34;
          color: #49aa34;
          border-radius: 4px;
          text-align: center;
          padding: 0.6vw 1.3vh;
          margin-left: 2vw;
        }
      }
      .rate-img {
        img {
          width: 20vw;
          height: 20vw;
          border-radius: 5px;
          margin: 0 1vw;
          cursor: pointer;
        }
      }
      .service-reflexs {
        color: red;
      }
    }
    /* 显示大图 */
    .bigImg {
      z-index: 99;
      overflow: hidden;
      width: 100vw;
      position: fixed;
      top: 0;
      bottom: 0;
      background-color: rgba(3, 3, 3, 0.5);
      > div {
        display: flex;
        width: 100vw;
        height: 100vw;
        background-color: red;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
          margin: auto;
          width: 100%;
          height: 100vw;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .rate-content {
      .rate-recommond-list-top {
        padding: 10px 5px 0px 20px;
        img {
          width: 75px;
          height: 75px;
        }
        p {
          font-size:1.4rem;
        }
      }
      .rate-recommond-list-content {
        > div {
          padding: 0 15px 15px 15px
        }
        .reflex-context {
          margin-left: 10px;
          font-size:1.4rem;
        }
        .create-time {
          height: 25px;
          line-height: 25px;
          font-size:1.4rem;
          .icon-mark {
            font-size: 1.7rem;
          }
          span {
            padding-left: 4px;
          }
        }
        .div-badge {
          .activities-badge {
            font-size:1.3rem;
            padding: 5px 8px;
            margin-left: 10px;
          }
        }
        .rate-img {
          img {
            width: 100px;
            height: 100px;
            margin: 0 5px;
          }
        }
      }
      /* 显示大图 */
      .bigImg {
        width: 640px;
        > div {
          width: 640px;;
          height: 640px;;
          img {
            margin: auto;
            width: 640px;
            height: 640px;
          }
        }
      }
    }
  }
</style>
