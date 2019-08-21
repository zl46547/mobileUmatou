<template>
  <div id="payWay">
    <div class="pay-way-select-wapper" @click="showModal()">
      <p class="title">支付方式</p>
      <div class="pay-way-selected">{{payWaySelected}}</div>
      <p class="arrow-right"><span class="iconfont icon-arrow-right"></span></p>
    </div>
    <Actionsheet v-model="openModal" title="支付方式">
      <div class="modal-content">
        <div class="modal-body">
          <v-radio :radioList="PWRadioList"
                   :hasSelected="payWaySelected"
                   @radio-selected="radioSelected"
          />
        </div>
        <div class="confirm" @click="handleConfirm">
          确定
        </div>
      </div>
    </Actionsheet>
    <!--<v-modal v-if="openModal" @close-modal="closeMoadl">-->
    <!--<span slot="title">支付方式</span>-->
    <!--<div slot="content">-->

    <!--</div>-->
    <!--</v-modal>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/modal.vue'
  import Radio from '@/common/radio.vue'
  import {Actionsheet} from 'vant'

  export default {
    data() {
      return {
        openModal: false,
        payWaySelected: '请选择支付方式',
        tempSelected: '在线支付',
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
      Actionsheet,
      'VModal': Modal,
      'VRadio': Radio
    },
    computed: {},
    mounted() {
      this.$emit('pay-way-selected', this.payWaySelected)
    },
    methods: {
      showModal() {
        this.openModal = true
      },
      closeMoadl(val) {
        this.openModal = val
        this.tempSelected = this.payWaySelected
      },
      radioSelected(val) {
        this.tempSelected = val
      },
      handleConfirm() {
        this.openModal = false
        this.payWaySelected = this.tempSelected
        this.$emit('pay-way-selected', this.payWaySelected)
      }
    }
  }
</script>

<style lang="less" scoped>
  #payWay {
    border-bottom: 1px solid #eee;
    padding: 15px;
    background-color: #fff;
    position: relative;

    .pay-way-select-wapper {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;

      .title {
        color: #333;
        width: 6rem;
        text-align: right;
        font-size: 1.3rem;
        margin-right: 1rem;
      }

      .pay-way-selected {
        font-size: 1.2rem;
        color: #c0c0c0;
      }

      .arrow-right {
        color: #333;
        font-size: 1rem;
        flex: 1;
        text-align: right;
      }
    }

    .modal-content {
      height: 50vh;
      position: relative;
      .modal-body{
        padding: 2rem;
      }
      .confirm {
        position: absolute;
        bottom: 0;
        cursor: pointer;
        font-size: 1.3rem;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        background-color: #ff2b1c;
        color: #fff;
        text-align: center;
        width: 100%;
      }
    }

    /*> div {*/
    /*display: flex;*/
    /*justify-content: space-between;*/

    /*.iconfont {*/
    /*cursor: pointer;*/
    /*font-size: 1.3rem;*/
    /*}*/
    /*}*/
    /*.modalContent {*/
    /*padding: 0 15px;*/
    /*}*/

    /*@font-face {*/
    /*font-family: 'iconfont';*/
    /*src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');*/
    /*font-weight: normal;*/
    /*font-style: normal;*/
    /*}*/
    /*.iconfont {*/
    /*font-family:"iconfont";*/
    /*font-style:normal;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*}*/

    /*.icon-more:before { content: "\e675"; }*/
  }

  /*@media screen and (min-width: 400px) {*/
  /*#payWay {*/
  /*p {*/
  /*font-size: 1.5rem;*/
  /*}*/
  /*> div {*/
  /*.payWaySelected {*/
  /*font-size: 1.5rem;*/
  /*}*/
  /*.iconfont {*/
  /*font-size: 1.5rem;*/
  /*}*/
  /*}*/
  /*.comfirm {*/
  /*height: 50px;*/
  /*}*/
  /*}*/
  /*}*/
</style>
