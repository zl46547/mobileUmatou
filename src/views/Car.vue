<template>
  <div class="content">
    <div>
      <v-header>
        <h1 slot="title">购物车</h1>
      </v-header>
    </div>
    <v-car-list></v-car-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import CarList from '@/components/car/carList.vue'
  import utils from '@/util/common.js'

  export default {
    components: {
      'VHeader': Header,
      'VCarList': CarList
    },
    data () {
      return {
        datas: ''
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        var url = 'https://wechatx.34580.com/sz/ProductRequests/ProductMultiConditionRequest'
        var requestData = {
          'sourcetype': 9,
          'json': {
              'CategoryIds': [144],
              'PageIndex': 1,
              'PageSize': 20,
              'OrderDirectionType': 0,
              'OrderFieldType': 0,
              'sourcetype': '9'
            }
        }
        utils.ajax(url, requestData, function (val) {
          console.log(JSON.stringify(val))
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
  }
</style>
