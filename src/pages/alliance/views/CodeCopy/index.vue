<template>
    <div class="code-copy">
        <img :src="picUrl" alt="">
        <div class="medicine-bag">
            8緮置内容{{this.code}}}达开τao寶或掂击炼接 https://m.tb.cn/h.eeeeSm至浏.览览.器
        </div>
        <div class="copy-btn" :class="{'copy-btn-active':onCopy}" @click="handleCopy">
            {{buttonText}}
        </div>
        <div id="copy-tip" class="copy-tip">
            <span class="s1">长按框内</span>
            <span class="jt jt-one"></span>
            <span class="s2">全选</span>
            <span class="jt jt-two"></span>
            <span class="s3">复制</span>
            <span class="jt jt-three"></span>
            <span class="s4">打开APP</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import copy from 'copy-to-clipboard'

  export default {
    data(){
      return {
        code:'',
        picUrl:'',
        buttonText:'一键复制',
        onCopy:false
      }
    },
    methods: {
      handleCopy(){
        console.log(this.code)
        copy(this.code)
        this.onCopy = true
        this.buttonText = '复制成功，打开手淘购买'
        setTimeout(()=>{
          this.onCopy = false
          this.buttonText = '一键复制'
        },1500)
      }
    },
    mounted() {
      let {code,picUrl} = this.$route.query
      this.code = `￥${code}￥`
      this.picUrl = picUrl
    }
  }
</script>

<style lang="less" scoped>
    .code-copy {
        height: 100vh;
        padding: 20px;
        background-color: #eee;
        >img{
            width: 100%;
            margin-bottom: 20px;
        }
        .medicine-bag {
            background: white;
            border: 1px dashed #fb6a65;
            padding: .5rem;
            border-radius: 5px;
        }
        .copy-btn {
            background: #fb6a65;
            border-radius: 5px;
            color: white;
            font-size: 14px;
            margin: 16px auto;
            padding: 10px;
            margin-bottom: 2px;
            text-align: center;
        }
        .copy-btn-active{
            background: rgb(120, 189, 51);
        }
        .copy-tip {
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: linear-gradient(to right, #f9c492, #fb6a65);
            color: white;
            font-size: 12px;
            height: 24px;
        }
        .jt {
            position: relative;
            width: 0;
            height: 0;
            border-top: 12px solid transparent;
            border-left: 10px solid white;
            border-bottom: 12px solid transparent;
        }
        .jt::before {
            content: "";
            position: absolute;
            top: -12px;
            left: -13px;
            width: 0;
            height: 0;
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
        }
        .jt-one::before{
            border-left: 10px solid #fab189;
        }
        .jt-two::before{
            border-left: 10px solid #fa9b7e;
        }
        .jt-three::before{
            border-left: 10px solid #fa8673;
        }
    }
</style>
