<template>
  <div class="payWay">
    <p>支付方式</p>
    <div>
      <div class="payWaySelected">{{payWaySelected}}</div>
      <i class="iconfont icon-more" @click="showModal()"></i>
    </div>
    <v-modal v-if="openModal" @close-modal="closeMoadl">
      <span slot="title">支付方式</span>
      <div slot="content">
        <div class="modalContent">
          <v-radio :radioList="PWRadioList" :hasSelected="payWaySelected" @radio-selected="radioSelected"></v-radio>
        </div>
        <div class="comfirm" @click="comfirm">
          <p>确定</p>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/_modal.vue'
  import Radio from '@/common/_radio.vue'

  export default {
    data () {
      return {
        payWaySelected: '在线支付',
        tempSelected: '在线支付',
        openModal: false,
        PWRadioList: [
          {
            id: 0,
            name: '在线支付'
          },
          {
            id: 1,
            name: '货到付款'
          }
        ]
      }
    },
    components: {
      'VModal': Modal,
      'VRadio': Radio
    },
    computed: {},
    mounted () {
      this.$emit('pay-way-selected', this.payWaySelected)
    },
    methods: {
      showModal () {
        this.openModal = true
      },
      closeMoadl (val) {
        this.openModal = val
        this.tempSelected = this.payWaySelected
      },
      radioSelected (val) {
        this.tempSelected = val
      },
      comfirm () {
        this.openModal = false
        this.payWaySelected = this.tempSelected
        this.$emit('pay-way-selected', this.payWaySelected)
      }
    }
  }
</script>

<style lang="less" scoped>
  .payWay {
    padding: 3vw;
    background-color: #fff;
    position: relative;
    p {
      font-size: 1.4rem;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .payWaySelected {
        font-weight: bold;
        font-size: 1.5rem;
      }
      .iconfont {
        cursor: pointer;
        font-size: 1.5rem;
      }
    }
    .modalContent {
      padding: 0 3vw;
    }
    .comfirm {
      position: absolute;
      bottom: 3vh;
      left: 50%;
      transform: translate(-50%);
      cursor: pointer;
      width: 60vw;
      height: 7vh;
      background-color: #ff2b1c;
      display: flex;
      border-radius: 90px;
      align-self: flex-end;
      p {
        margin: auto;
        color: #fff;
      }
    }
  }

  @media screen and (min-width: 640px) {
    .payWay {
      padding: 20px 25px;
      p {
        font-size: 1.6rem;
        margin-bottom: 25px;
      }
      > div {
        .payWaySelected {
          font-size: 1.7rem;
        }
        .iconfont {
          font-size: 1.7rem;
        }
      }
      .modalContent {
        padding: 0 30px;
      }
      .comfirm {
        bottom: 30px;
        width: 300px;
        height: 50px;
      }
    }
  }
</style>
