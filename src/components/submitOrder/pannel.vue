<template>
  <div class="payWay" v-if="selectObj">
    <p>{{selectObj.title}}</p>
    <div>
      <div class="payWaySelected">{{selectObj.selected}}</div>
      <i class="iconfont icon-more" @click="showModal()"></i>
    </div>
    <v-modal v-if="openModal" @close-modal = "closeMoadl">
      <span slot="title">{{selectObj.title}}</span>
      <div slot="content" v-if="selectObj.type ==='PW'">
        1111
      </div>
      <div slot="content" v-if="selectObj.type ==='FP'">
        2222
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/common/_modal.vue'

  export default {
    props: ['selectObj'],
    data () {
      return {
        openModal: false
      }
    },
    components: {
      'VModal': Modal
    },
    computed: {},
    methods: {
      showModal () {
        this.openModal = true
      },
      closeMoadl (val) {
        this.openModal = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .payWay {
    padding: 5vw 3vw;
    background-color: #fff;
    margin: 2vh 0;
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
  }

  @media screen and (min-width: 768px) {
    .payWay {
      padding: 30px 20px;
      margin: 30px 0;
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
    }
  }
</style>
