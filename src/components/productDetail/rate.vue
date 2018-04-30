<template>
  <div class="content">
    <div class="rate-top" @click="toDetailRate">
      <div>
        商品评价(共{{rateResponse.length}}人评价)
      </div>
      <div>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <v-rate-recommend :rateResponse="getRecommandRate" @showimg="showImg"></v-rate-recommend>
  </div>
</template>

<script type="text/ecmascript-6">
  import RateRecommend from './rateDetail.vue'

  export default {
    props: ['rateResponse'],
    components: {
      'VRateRecommend': RateRecommend
    },
    computed: {
      getRecommandRate () {
        var vm = this
        var rateList = []
        for (var i = 0; i < 3; i++) {
          if (Object.prototype.toString.call(vm.rateResponse[i]) !== '[object Undefined]') {
            rateList.push(vm.rateResponse[i])
          }
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
      showImg (val) {
        this.$emit('showimg', val)
      },
      toDetailRate () {
        this.$emit('to-detail-rate', '3')
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    margin: 2px 0 10vh 0;
    .rate-top {
      cursor: pointer;
      margin-bottom: 1px;
      height: 7vh;
      line-height: 11vw;
      background-color: #fff;
      padding: 5px 20px;
      font-size: 2.5vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:nth-of-type(2) {
        display: flex;
      }
      i {
        margin: auto 0;
        margin-left: 5px;
        font-size: 20px;
        font-weight: 500;
      }
    }
    .rate-content {
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      .rate-top {
        height: 55px;
        line-height: 55px;
        padding: 5px 20px;
        font-size: 22px;
        i {
          font-size: 20px;
        }
      }
    }
  }
</style>
