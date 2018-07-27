<template>
  <div class="payWay">
    <v-modal v-if="getModalStatus" @close-modal="closeMoadl">
      <span slot="title">打赏鸡腿</span>
      <div slot="content">
        <div class="imgContent">
          <img src="../../assets/images/support.jpg"/>
        </div>
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
    > div {
      display: flex;
      justify-content: space-between;
    }
    .imgContent {
      text-align: center;
      img{
        height: 46vh;
      }
    }
    .comfirm {
      height:16vh;
      cursor: pointer;
      display: flex;
      justify-content: center;
      border-radius: 90px;
      align-items: center;
      p {
        color: #fff;
        height:8vh;
        display: flex;
        align-items: center;
        padding: 0 4vw;
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
      .comfirm {
        p {
          padding: 0 30px;
        }
      }
    }
  }
</style>
