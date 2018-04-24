<template>
  <div class="content">
    <router-link :to="{name:'详情页'}">
      <div class="rate-top">
        <div>
          商品评价(共{{rateResponse.length}}人评价)
        </div>
        <div>
          <el-rate v-model="score" disabled show-score text-color="#ff9900" score-template="{value}"
                   style="float: left"></el-rate>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </router-link>
    <div v-if="rateResponse.length>0">
      <ul>
        <li v-for="item in getRecommandRate" :key="item.ReviewId" >
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
            <div class="activities-badge">推荐</div>
            <div class="reflex-context">{{item.ReflexContext}}</div>
            <div class="create-time">
              <div>{{item.CreateTime}}</div>
              <div><i class="iconfont icon-mark"></i><span>0</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['rateResponse'],
    mounted () {
      this.getScore()
    },
    computed: {
      getRecommandRate () {
        var vm = this
        var rateList = []
        for (var i = 0; i < 3; i++) {
          rateList.push(vm.rateResponse[i])
        }
        vm.rateCommandList = rateList
        return this.rateCommandList
      }
    },
    create () {

    },
    data () {
      return {
        score: 0,
        rateCommandList: []
      }
    },
    methods: {
      getScore () {
        this.score = Math.round(parseFloat(Math.random() * 2 + 3) * 100) / 100
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    margin: 2px 0 80px 0;
    .rate-top {
      margin-bottom: 1px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      padding: 5px 20px;
      font-size: 3vw;
      display: flex;
      justify-content: space-between;
      i {
        float: left;
        margin-left: 5px;
        font-size: 17px;
        font-weight: 500;
      }
    }
    .rate-top div:nth-of-type(2) {
      height: 40px;
      position: relative;
      top: 25%;
    }
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
      .activities-badge{
        width:40px;
        border: 1px solid #49aa34;
        color: #49aa34;
        border-radius: 3px;
        text-align: center;
        padding: 3px;
        margin: 10px 10px;
      }
    }
  }
</style>
