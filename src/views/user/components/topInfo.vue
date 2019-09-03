<template>
  <div id="topInfo">
    <img v-if="hour>17 || (hour>=0 && hour<6)"
         src="../../../assets/images/user_bg_night.png"/>
    <img src="../../../assets/images/user_bg_day.png" v-else/>
    <div class="user-info">
      <div class="img-face">
        <img src="../../../assets/images/face.png"/>
      </div>
      <p>码头萌新</p>
      <div class="vip">
        <img src="../../../assets/images/vip.png"/>
        <span>初入码头</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted () {
      // 获取小时
      this.hour = new Date().getHours()
    },
    data () {
      return {
        hour: 0
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #topInfo {
    position: relative;
    > img {
      width: 100%;
    }
    .user-info {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 20%;
      color: #fff;
      .img-face {
        img {
          border-radius: 50%;
          width: 18%;
          height: 18%;
        }
      }
      p {
        margin: 10rem/@baseFontSize;
        font-size: 28rem/@baseFontSize;
      }
      .vip {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 35rem/@baseFontSize;
          margin-right: 10rem/@baseFontSize;
        }
        span {
          font-size: 28rem/@baseFontSize;
        }
      }
    }
  }
</style>
