<template>
  <div class="indexAdv">
    <div>
      <v-header>
        <h1 slot="title">{{advData.title}}</h1>
      </v-header>
      <div class="content-body" :style="{'background-color':advData.backgroundColor}">
        <v-adverise :adverise="advData"></v-adverise>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Adverise from '@/components/indexAdv/adv.vue'
  import utils from '@/util/common.js'

  export default {
    components: {
      'VHeader': Header,
      'VAdverise': Adverise
    },
    data () {
      return {
        type: '',
        advData: ''
      }
    },
    mounted () {
      this.type = this.$route.params.type
      this.getAdvData()
    },
    methods: {
      getAdvData () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/index/adv/' + this.type + '.json'
        }).then((res) => {
          if (!utils.isEmpty(res.data)) {
            vm.advData = res.data.Data
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .indexAdv {
    width: 100%;
    overflow: hidden;
    .content-body {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media screen and (min-width: 640px) {
  }
</style>
