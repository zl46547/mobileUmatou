<template>
  <div id="accountList">
    <div class="myAccount" v-for="item in myAccountList" :key="item.id">
      <p>{{item.value}}</p>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        myAccountList: [
          {
            id: '0',
            name: '码头币',
            value: '200'
          },
          {
            id: '1',
            name: '积分',
            value: '1314'
          },
          {
            id: '2',
            name: '红包',
            value: '40.5'
          },
          {
            id: '3',
            name: '优惠券',
            value: '2'
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  #accountList {
    margin-top:10px;
    padding: 2vh 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.3rem;
    background-color: #fff;
    .myAccount {
      cursor: pointer;
      p {
        text-align: center;
      }
    }
  }
  @media screen and (min-width: 400px) {
    #accountList {
      font-size: 1.5rem;
    }
  }
</style>
