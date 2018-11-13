<template>
  <div id="payWay">
    <p>支付方式</p>
    <div>
      <div class="payWaySelected">{{payWaySelected}}</div>
      <span class="iconfont icon-more" @click="showModal()"></span>
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
  import Modal from '@/common/modal.vue'
  import Radio from '@/common/radio.vue'

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
  #payWay {
    border-bottom: 1px solid #eee;
    padding: 15px 20px;
    background-color: #fff;
    position: relative;
    p {
      font-size: 1.3rem;
      margin-bottom: 2vh;
    }
    > div {
      display: flex;
      justify-content: space-between;
      .payWaySelected {
        font-weight: bold;
        font-size: 1.3rem;
      }
      .iconfont {
        cursor: pointer;
        font-size: 1.3rem;
      }
    }
    .modalContent {
      padding: 0 15px;
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
      src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYVttl0AAAZ4AAAAHEdERUYAKQAKAAAGWAAAAB5PUy8yPONIZwAAAVgAAABWY21hcAAP6iAAAAHAAAABQmdhc3D//wADAAAGUAAAAAhnbHlmddaCKwAAAxAAAACIaGVhZBLo01EAAADcAAAANmhoZWEHiQOFAAABFAAAACRobXR4DAAAVgAAAbAAAAAQbG9jYQBEAAAAAAMEAAAACm1heHABFAAzAAABOAAAACBuYW1lKeYRVQAAA5gAAAKIcG9zdHCFaXAAAAYgAAAALwABAAAAAQAAu3/0718PPPUACwQAAAAAANfkx6oAAAAA1+THqgBWASsDqwHVAAAACAACAAAAAAAAAAEAAAOA/4AAXAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAEACcABgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5nXmdQOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAAEAAAABAAAVgAAAAMAAAADAAAAHAABAAAAAAA8AAMAAQAAABwABAAgAAAABAAEAAEAAOZ1//8AAOZ1//8ZjgABAAAAAAAAAQYAAAEAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAGAFYBKwOrAdUAAAAMAA0AGQAaACYAAAE1DgEUFhcyPgE0LgEFNQ4BFBYXMj4BNC4BBTUOARQWFzI+ATQuAQNVJDAwJBgmGBgm/pMkMDAkFycXFyf+lCUwMCUXJxcXJwGAVQEwSDABFiksKRZVVQEwSDABFiksKRZVVQEwSDABFiksKRYAAAAAAAASAN4AAQAAAAAAAAAVACwAAQAAAAAAAQAIAFQAAQAAAAAAAgAHAG0AAQAAAAAAAwAIAIcAAQAAAAAABAAIAKIAAQAAAAAABQALAMMAAQAAAAAABgAIAOEAAQAAAAAACgArAUIAAQAAAAAACwATAZYAAwABBAkAAAAqAAAAAwABBAkAAQAQAEIAAwABBAkAAgAOAF0AAwABBAkAAwAQAHUAAwABBAkABAAQAJAAAwABBAkABQAWAKsAAwABBAkABgAQAM8AAwABBAkACgBWAOoAAwABBAkACwAmAW4ACgBDAHIAZQBhAHQAZQBkACAAYgB5ACAAaQBjAG8AbgBmAG8AbgB0AAoAAApDcmVhdGVkIGJ5IGljb25mb250CgAAaQBjAG8AbgBmAG8AbgB0AABpY29uZm9udAAAUgBlAGcAdQBsAGEAcgAAUmVndWxhcgAAaQBjAG8AbgBmAG8AbgB0AABpY29uZm9udAAAaQBjAG8AbgBmAG8AbgB0AABpY29uZm9udAAAVgBlAHIAcwBpAG8AbgAgADEALgAwAABWZXJzaW9uIDEuMAAAaQBjAG8AbgBmAG8AbgB0AABpY29uZm9udAAARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgAAR2VuZXJhdGVkIGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0LgAAaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAaHR0cDovL2ZvbnRlbGxvLmNvbQAAAgAAAAAAAAAKAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAQACAQIEbW9yZQAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwADAAEABAAAAAIAAAAAAAAAAQAAAADVpCcIAAAAANfkx6oAAAAA1+THqg==) format('truetype');
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
    #payWay {
      p {
        font-size: 1.5rem;
      }
      > div {
        .payWaySelected {
          font-size: 1.5rem;
        }
        .iconfont {
          font-size: 1.5rem;
        }
      }
      .comfirm {
        height: 50px;
      }
    }
  }
</style>
