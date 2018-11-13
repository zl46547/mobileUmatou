<template>
  <div id="ticket">
    <p>发票</p>
    <div>
      <div class="ticketSelected">
        {{selectedItem.ticketType}}({{selectedItem.ticketContent}} - {{selectedItem.ticketTitle}})
      </div>
      <span class="iconfont icon-more" @click="showModal()"></span>
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
  import Modal from '@/common/modal.vue'
  import Radio from '@/common/radio.vue'

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
  #ticket {
    padding: 15px 20px;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #eee;
    p {
      font-size: 1.3rem;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .ticketSelected {
        font-weight: bold;
        font-size: 1.3rem;;
      }
      .iconfont {
        cursor: pointer;
        font-size: 1.3rem;;
      }
    }
    .modalContent {
      padding: 0 15px;
      .subTitle {
        font-size: 1.25rem;;
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
      width: 60%;
      height: 40px;
      background-color: #ff2b1c;
      display: flex;
      border-radius: 90px;
      align-self: flex-end;
      p {
        margin: auto;
        color: #fff;
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family:"iconfont";
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-more:before { content: "\e675"; }
  }
  @media screen and (min-width: 400px) {
    #ticket {
      p {
        font-size: 1.5rem;
      }
      > div {
        .ticketSelected {
          font-size: 1.5rem;;
        }
        .iconfont {
          font-size: 1.5rem;;
        }
      }
      .modalContent {
        .subTitle {
          font-size: 1.45rem;;
        }
      }
      .comfirm {
        height: 50px;
      }
    }
  }
</style>
