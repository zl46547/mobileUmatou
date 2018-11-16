<template>
  <div id="rate">
    <div class="topTate">
      <div v-for="(item,index) in rateList" :key="index" :class="{'active':isActive.label == item.label}"
           @click="changeRate(item)">
        <span class="iconfont" :class="item.icon"></span>
        <span class="label">{{item.label}}</span>
      </div>
    </div>
    <v-field placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买它的人吧" type="textarea" rows="4"></v-field>
    <div class="rate-star">
      <div class="title">店铺评分</div>
      <div class="rate-star-item">
        <span class="label">描述相符:</span>
        <v-star :satisfyValue="0" :needHandleClick="true"></v-star>
      </div>
      <div class="rate-star-item">
        <span class="label">物流服务:</span>
        <v-star :satisfyValue="0" :needHandleClick="true"></v-star>
      </div>
      <div class="rate-star-item">
        <span class="label">服务态度:</span>
        <v-star :satisfyValue="0" :needHandleClick="true"></v-star>
      </div>
    </div>
    <footer @click="handleRate">
      发表评论
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/common/star.vue'
  import { Toast, Field } from 'mint-ui'

  export default {
    components: {
      'VStar': Star,
      'VField': Field
    },
    data () {
      return {
        isActive: '',
        rateList: [
          {
            label: '好评',
            icon: 'icon-haoping'
          },
          {
            label: '中评',
            icon: 'icon-zhongping'
          },
          {
            label: '差评',
            icon: 'icon-chaping'
          }
        ],
        order: ''
      }
    },
    mounted () {
      var vm = this
      vm.isActive = vm.rateList[0]
      vm.order = vm.$route.query.order
    },
    computed: {},
    methods: {
      changeRate(val) {
        var vm = this
        vm.isActive = val
      },
      handleRate() {
        var vm = this
        vm.$store.commit('MY_ORDERS', {isUpdate: true, allOrders: vm.order})
        Toast({
          message: '评价成功'
        })
        setTimeout(() => {
          vm.$router.push({name: '用户页'})
        }, 1500)
      }
    }
  }
</script>

<style lang="less" scoped>
  #rate {
    background-color: #f2f2f2;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    .topTate {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .iconfont {
        font-size: 1.5rem;
      }
      .label {
        font-size: 1.3rem;
      }
      .active {
        color: #ff2b1c;
      }
    }
    .rate-star {
      margin-top: 10px;
      background-color: #fff;
      .title {
        font-size: 1.35rem;
        padding: 10px 14px;
        border-bottom: 1px solid #eee;
      }
      .rate-star-item {
        display: flex;
        align-items: center;
        .label {
          font-size: 1.32rem;
          padding: 12px 14px;
        }
      }
    }
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      cursor: pointer;
      color: #fff;
      font-size: 1.3rem;
      height: 45px;
      line-height: 45px;
      text-align: center;
      max-width: 640px;
      background-color: #ff5900;
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

    .icon-zhongping:before {
      content: "\e680";
    }

    .icon-chaping:before {
      content: "\e628";
    }

    .icon-haoping:before {
      content: "\e61e";
    }

    .icon-starmarkhighligh:before {
      content: "\e90d";
    }
  }
  @media screen and (min-width: 400px) {
    #rate {
      .topTate {
        padding: 15px 18px;
        .iconfont {
          font-size: 1.8rem;
        }
        .label {
          font-size: 1.5rem;
        }
      }
      .rate-star {
        margin-top: 15px;
        .title {
          font-size: 1.55rem;
        }
        .rate-star-item {
          .label {
            font-size: 1.5rem;
          }
        }
      }
      footer {
        font-size: 1.5rem;
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>
