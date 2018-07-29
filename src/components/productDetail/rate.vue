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
      /**
       * 获取前3条评论
       * @returns {Array|*}
       */
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
    data () {
      return {
        rateCommandList: []
      }
    },
    methods: {
      showImg (val) {
        this.$emit('showimg', val)
      },
      toDetailRate () {
        this.$emit('to-detail-rate', '2')
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .rate-top {
      cursor: pointer;
      margin-top: 3vh;
      margin-bottom: 1px;
      height: 7vh;
      background-color: #fff;
      padding: 5px 20px;
      font-size: 4vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 5vw;
        font-weight: 500;
      }
    }
  }

  @media screen and (min-width: 640px) {
    .content {
      .rate-top {
        font-size: 22px;
        i {
          font-size: 20px;
        }
      }
    }
  }
</style>
