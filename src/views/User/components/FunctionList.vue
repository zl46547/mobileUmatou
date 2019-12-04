<template>
  <div id="functionList">
    <div class="function" v-for="item in functionList" :key="item.id" @click="showFunction(item)">
      <i class="iconfont" :class="item.icon" :style="{'color':item.color}"></i>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  export default {
    data () {
      return {
        hour: 0,
        functionList: [
          {
            name: '地址管理',
            icon: 'icon-address',
            color: '#00caff'
          },
          {
            name: '收藏',
            icon: 'icon-collect',
            color: '#e23a00'
          },
          {
            name: '制作海报',
            icon: 'icon-friend',
            color: '#ff3fb3'
          },
          {
            name: '充值',
            icon: 'icon-chongzhi',
            color: '#aaa'
          },
          {
            name: '签到',
            icon: 'icon-qiandao',
            color: '#aaa'
          },
          {
            name: '浏览足迹',
            icon: 'icon-zuji',
            color: '#aaa'
          },
          {
            name: '主题',
            icon: 'icon-theme',
            color: '#aaa'
          },
          {
            name: '会员中心',
            icon: 'icon-vip',
            color: '#aaa'
          },
          {
            name: '客户服务',
            icon: 'icon-kefu',
            color: '#aaa'
          },
          {
            name: '关于我们',
            icon: 'icon-friend',
            color: '#aaa'
          }
        ]
      }
    },
    methods: {
      showFunction(item) {
        if (item.name === '地址管理') {
          this.$router.push({name: '地址管理', params: {type: 1}})
          return false
        }
        if (item.name === '收藏') {
          this.$router.push({name: '收藏'})
          return false
        }
        if (item.name === '制作海报') {
          this.$router.push({name: '制作海报'})
          return false
        }
        Toast({
          message: '该功能暂未开发'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #functionList {
    margin-top: 10rem/@baseFontSize;
    padding: 30rem/@baseFontSize 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    flex-wrap: wrap;
    .function {
      cursor: pointer;
      width: 25%;
      text-align: center;
      padding: 10rem/@baseFontSize 0;
      .iconfont {
        font-size: 50rem/@baseFontSize;
        margin-bottom: 10rem/@baseFontSize;
      }
      p {
        text-align: center;
        font-size: 26rem/@baseFontSize;
        margin-top: 10rem/@baseFontSize;
      }
    }
  }
</style>
