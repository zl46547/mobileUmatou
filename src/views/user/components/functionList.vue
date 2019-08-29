<template>
  <div id="functionList">
    <div class="function" v-for="item in functionList" :key="item.id" @click="showFunction()">
      <i class="iconfont" :class="item.icon" :style="{'color':item.color}"></i>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  export default {
    mounted () {
    },
    data () {
      return {
        hour: 0,
        functionList: [
          {
            name: '充值',
            icon: 'icon-chongzhi',
            color: '#c14089'
          },
          {
            name: '地址管理',
            icon: 'icon-dizhi',
            color: '#e5cf0d'
          },
          {
            name: '收藏',
            icon: 'icon-like',
            color: '#ff4646'
          },
          {
            name: '浏览足迹',
            icon: 'icon-zuji',
            color: '#59678c'
          },
          {
            name: '主题',
            icon: 'icon-theme',
            color: '#9a7fd1'
          },
          {
            name: '会员中心',
            icon: 'icon-huiyuan',
            color: '#588dd5'
          },
          {
            name: '发票申请',
            icon: 'icon-fapiao',
            color: '#7eb00a'
          },
          {
            name: '客户服务',
            icon: 'icon-kefu',
            color: '#5ab1ef'
          },
          {
            name: '体验店',
            icon: 'icon-tiyandian',
            color: '#97b552'
          },
          {
            name: '新手礼物',
            icon: 'icon-liwu',
            color: '#ffb980'
          },
          {
            name: '关于我们',
            icon: 'icon-friend',
            color: '#2ec7c9'
          }
        ]
      }
    },
    methods: {
      showFunction() {
        Toast({
          message: '该功能暂未开发'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #functionList {
    margin-top: 10px;
    padding: 2vh 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    flex-wrap: wrap;
    .function {
      cursor: pointer;
      width: 25%;
      text-align: center;
      padding: 1.1vh 0;
      .iconfont {
        font-size: 2.4rem;
        margin-bottom: 10px;
      }
      p {
        text-align: center;
        font-size: 1.1rem;
        margin-top: 5px;
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    .iconfont {
      font-family: "iconfont";
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-chongzhi:before {
      content: "\e604";
    }

    .icon-tiyandian:before {
      content: "\e621";
    }

    .icon-friend:before {
      content: "\e678";
    }

    .icon-huiyuan:before {
      content: "\e61f";
    }

    .icon-theme:before {
      content: "\e66f";
    }

    .icon-zuji:before {
      content: "\e602";
    }

    .icon-liwu:before {
      content: "\e61c";
    }

    .icon-fapiao:before {
      content: "\e932";
    }

    .icon-like:before {
      content: "\e613";
    }

    .icon-kefu:before {
      content: "\e624";
    }

    .icon-dizhi:before {
      content: "\e695";
    }
  }
  @media screen and (min-width: 400px) {
    #functionList {
      .function {
        .iconfont {
          font-size: 2.6rem;
        }
        p {
          font-size: 1.5rem;
          margin-top: 5px;
        }
      }
    }
  }
</style>
