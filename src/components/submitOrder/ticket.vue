<template>
  <div class="ticket">
    <p>发票</p>
    <div>
      <div class="ticketSelected">
        {{selectedItem.ticketType}}({{selectedItem.ticketContent}} - {{selectedItem.ticketTitle}})
      </div>
      <i class="iconfont icon-more" @click="showModal()"></i>
    </div>
    <v-modal v-if="openModal" @close-modal="closeMoadl">
      <span slot="title">发票</span>
      <div slot="content">
        <div class="modalContent">
          <div class="subTitle">发票类型</div>
          <v-radio :radioList="ticketTypeList" :hasSelected="selectedItem.ticketType"
                   @radio-selected="typeRadioSelected"></v-radio>
          <div class="subTitle">发票抬头</div>
          <v-radio :radioList="ticketTitle" :hasSelected="selectedItem.ticketTitle"
                   @radio-selected="titleRadioSelected"></v-radio>
          <div class="subTitle">发票内容</div>
          <v-radio :radioList="ticketContent" :hasSelected="selectedItem.ticketContent"
                   @radio-selected="contentRadioSelected"></v-radio>
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
        selectedItem: {
          ticketType: '普通发票',
          ticketTitle: '个人',
          ticketContent: '商品明细'
        },
        ticketTypeTempSelected: '普通发票',
        ticketTitleTempSelected: '个人',
        ticketContentTempSelected: '商品明细',
        openModal: false,
        ticketTypeList: [
          {
            id: 0,
            name: '普通发票'
          },
          {
            id: 1,
            name: '电子发票'
          },
          {
            id: 2,
            name: '增值税发票'
          }
        ],
        ticketTitle: [
          {
            id: 0,
            name: '个人'
          },
          {
            id: 1,
            name: '单位'
          }
        ],
        ticketContent: [
          {
            id: 0,
            name: '商品明细'
          },
          {
            id: 1,
            name: '商品类别'
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
      var selectedTicket = `${this.selectedItem.ticketType}(${this.selectedItem.ticketContent} - ${this.selectedItem.ticketTitle})`
      this.$emit('selected-ticket', selectedTicket)
    },
    methods: {
      showModal () {
        this.openModal = true
      },
      closeMoadl (val) {
        this.openModal = val
        this.ticketTypeTempSelected = this.selectedItem.ticketType
        this.ticketTitleTempSelected = this.selectedItem.ticketTitle
        this.ticketContentTempSelected = this.selectedItem.ticketContent
      },
      typeRadioSelected (val) {
        this.ticketTypeTempSelected = val
      },
      titleRadioSelected (val) {
        this.ticketTitleTempSelected = val
      },
      contentRadioSelected (val) {
        this.ticketContentTempSelected = val
      },
      comfirm () {
        this.openModal = false
        this.selectedItem.ticketType = this.ticketTypeTempSelected
        this.selectedItem.ticketTitle = this.ticketTitleTempSelected
        this.selectedItem.ticketContent = this.ticketContentTempSelected
        var selectedTicket = `${this.selectedItem.ticketType}(${this.selectedItem.ticketContent} - ${this.selectedItem.ticketTitle})`
        this.$emit('selected-ticket', selectedTicket)
      }
    }
  }
</script>

<style lang="less" scoped>
  .ticket {
    padding: 3vw;
    background-color: #fff;
    position: relative;
    p {
      font-size: 4vw;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .ticketSelected {
        font-weight: bold;
        font-size: 5vw;
      }
      .iconfont {
        cursor: pointer;
        font-size: 5vw;
      }
    }
    .modalContent {
      padding: 0 3vw;
      .subTitle {
        font-size: 4vw;
        font-weight: bold;
        padding: 1vh 0;
      }
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
    .ticket {
      padding: 20px 25px;
      p {
        font-size: 24px;
        margin-bottom: 15px;
      }
      > div {
        .ticketSelected {
          font-size: 24px;
        }
        .iconfont {
          font-size: 24px;
        }
      }
      .modalContent {
        padding: 0 15px;
        .subTitle {
          font-size: 18px;
          padding: 10px 0;
        }
      }
      .comfirm {
        bottom: 20px;
        width: 300px;
        height: 50px;
      }
    }
  }
</style>
