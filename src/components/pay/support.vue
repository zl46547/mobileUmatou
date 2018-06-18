<template>
  <div class="payWay">
    <v-modal v-if="getModalStatus" @close-modal="closeMoadl">
      <span slot="title">打赏鸡腿</span>
      <div slot="content">
        <div class="modalContent">
          <img src="../../assets/images/support.jpg"/></div>
        <div class="comfirm" @click="comfirm">
          <p>残忍拒绝</p>
          <p>已加鸡腿</p>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/_modal.vue'
  import Radio from '@/common/_radio.vue'

  export default {
    props: ['modal'],
    data () {
      return {
      }
    },
    components: {
      'VModal': Modal,
      'VRadio': Radio
    },
    computed: {
      getModalStatus () {
        return this.modal
      }
    },
    mounted () {
      this.$emit('pay-way-selected', this.payWaySelected)
    },
    methods: {
      closeMoadl (val) {
        this.$emit('close-modal', false)
      },
      comfirm () {
        this.$emit('close-modal', false)
      }
    }
  }
</script>

<style lang="less" scoped>
  .payWay {
    position: relative;
    p {
      font-size: 4vw;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .payWaySelected {
        font-weight: bold;
        font-size: 5vw;
      }
      .iconfont {
        cursor: pointer;
        font-size: 5vw;
      }
    }
    .modalContent {
      text-align: center;
      img{
        width: 100vw;
      }
    }
    .comfirm {
      position: absolute;
      bottom: 2vh;
      left: 50%;
      transform: translate(-50%);
      cursor: pointer;
      display: flex;
      justify-content: center;
      border-radius: 90px;
      align-self: flex-end;
      p {
        padding: 2vh 4vw;
        color: #fff;
      }
      p:nth-of-type(1){
        background-color: #c7c7c7;border-radius: 90px 0 0 90px;
      }
      p:nth-of-type(2){
        background-color: #F56C6C;border-radius:0 90px 90px 0;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .payWay {
      p {
        font-size: 20px;
        margin-bottom: 25px;
      }
      > div {
        .payWaySelected {
          font-size: 24px;
        }
        .iconfont {
          font-size: 24px;
        }
      }
      .modalContent {
        img{
          width: 410px;
        }
      }
      .comfirm {
        bottom: 10px;
        p {
          padding: 16px 30px;
          color: #fff;
        }
      }
    }
  }
</style>
