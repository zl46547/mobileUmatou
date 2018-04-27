<template>
  <div class="content">
    <div v-if="rateResponse.length>0">
      <ul>
        <li v-for="item in rateResponse" :key="item.ReviewId" >
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
            <div class="div-badge">
              <div class="activities-badge" v-for="(tag,i) in item.Tags" :key="i" v-if="item.Tags.length>0">{{tag}}</div>
            </div>
            <div class="reflex-context">{{item.ReflexContext}}</div>
            <div class="rate-img">
              <img v-for="(imgItem,i) in item.Pics" :key="i" :src="imgItem" alt="" v-if="item.Pics.length>0">
            </div>
            <div class="create-time">
              <div>{{item.CreateTime}}</div>
              <div><i class="iconfont icon-mark"></i><span>0</span></div>
            </div>
            <div v-if="item.ServiceReflexs != null">
              <p class="service-reflexs">[客服回复]:{{item.ServiceReflexs[0]}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['rateResponse']
  }
</script>

<style lang="less" scoped>
  .content {
    margin-top: 0px;
    .rate-recommond-list-top {
      display: flex;
      justify-content: flex-start;
      background-color: #fff;
      padding: 20px 10px 0px 10px;
      img {
        width: 15vw;
        height: 15vw;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 20px;
      }
      p {
        padding-top: 3.5vw;
      }
    }
    .rate-recommond-list-content{
      padding-bottom: 10px;
      >div{
        padding:0 10px 10px 10px
      }
      .create-time{
        display: flex;
        justify-content: space-between;
        height:5vw;
        line-height:5vw;
        .icon-mark{
          font-size:20px;
        }
        span{
          padding-left: 4px;
        }
      }
      .div-badge{
        display: flex;
        margin: 2vw 0;
        .activities-badge{
          width:auto;
          border: 1px solid #49aa34;
          color: #49aa34;
          border-radius: 3px;
          text-align: center;
          padding: 0.8vw 1.5vh;
          margin: 0 1.5vw;
        }
      }
      .rate-img{
        img{
          width: 20vw;
          height: 20vw;
          border-radius: 5px;
          margin: 0 1vw;
        }
      }
      .service-reflexs{
        color: red;
      }
    }
  }

  /*@media screen and (min-width: 768px) {*/
    /*.content {*/
      /*margin-top: 0px;*/
      /*.rate-top {*/
        /*height: 55px;*/
        /*line-height: 55px;*/
        /*padding: 5px 20px;*/
        /*font-size: 22px;*/
      /*}*/
      /*.rate-recommond-list-top {*/
        /*display: flex;*/
        /*justify-content: flex-start;*/
        /*background-color: #fff;*/
        /*padding: 10px 5px 0px 10px;*/
        /*img {*/
          /*width: 75px;*/
          /*height: 75px;*/
        /*}*/
        /*p {*/
          /*padding-top: 20px;*/
        /*}*/
      /*}*/
      /*.rate-recommond-list-content{*/
        /*>div{*/
          /*padding:0 15px 15px 15px*/
        /*}*/
        /*.create-time{*/
          /*height:25px;*/
          /*line-height:25px;*/
          /*.icon-mark{*/
            /*font-size:30px;*/
          /*}*/
        /*}*/
        /*.activities-badge{*/
          /*font-size:10px;*/
          /*padding: 8px 10px;*/
          /*margin:10px 5px 5px 5px;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
</style>
