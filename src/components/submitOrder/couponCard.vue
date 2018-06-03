<template>
  <div class="sawtooth" style="display: flex;align-items: center;" :style="{'background-color':coupon.backgroundColor}">
    <div class="content">
      <div class="par">
        <p class="sign">￥</p>
        <p class="amount">{{coupon.Amount}}</p>
        <p>优惠券</p>
      </div>
      <p class="description">{{coupon.Description}}</p>
    </div>
    <div class="copy">
      副券<p>{{coupon.BeginTime}}<br>{{coupon.EndTime}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['coupon'],
    data () {
      return {}
    },
    components: {},
    computed: {},
    methods: {}
  }
</script>

<style lang="less" scoped>

  .sawtooth {
    position: relative;
    width: 80vw;
    height: 23vw;
    /* 相对定位，方便让before和after伪元素绝对定位偏移 */
    /* 把超出p的部分隐藏起来 */
    overflow: hidden;
    .content{
      padding: 3vh 5vw;
      width: 40vw;
      border-right: 2px dashed rgba(255, 255, 255, .3);
      .par {
        display: table;
        p {
          font-size: 4.5vw;
          color: rgba(255, 255, 255, .8);
          vertical-align: bottom;
          display: table-cell;
        }
        .amount {
          font-size: 9.5vw;
          color: #fff;
          padding-right: 1vw;
          line-height: 0.8;
        }
        .sign {
          font-size: 6vw;
        }
      }
      .description {
        color: #fff;
        font-size: 3.5vw;
        margin-top: 1vh;
      }
    }
    .copy {
      text-align: center;
      padding: 3vw 2vw;
      width: 30vw;
      vertical-align: text-bottom;
      font-family: "Microsoft Himalaya";
      font-size: 7vw;
      color: rgb(255, 255, 255);
      p {
        font-size: 5vw;
      }
    }
  }

  .sawtooth:before, .sawtooth:after {
    content: ' ';
    width: 0;
    height: 24vw;
    position: absolute;
  }

  .sawtooth:before {
    /* 圆点型的border */
    border-right: 11px dotted white;
    /* 偏移一个半径，让圆点的一半覆盖p */
    left: -3px;
    top: 8px;
  }

  .sawtooth:after {
    /* 圆点型的border */
    border-left: 11px dotted white;
    /* 偏移一个半径，让圆点的一半覆盖p */
    right: -3px;
    top: 8px;
  }

  @media screen and (min-width: 768px) {
    .sawtooth {
      width: 580px;
      height: 150px;
      .content{
        padding: 15px 30px;
        width: 300px;
        .par {
          p {
            font-size: 25px;
          }
          .amount {
            font-size: 60px;
            padding-right: 5px;
            line-height: 0.8;
          }
          .sign {
            font-size: 30px;
          }
        }
        .description {
          font-size: 20px;
          margin-top: 8px;
        }
      }
      .copy {
        padding: 15px 10px;
        width: 180px;
        font-size: 38px;
        p {
          font-size: 28px;
        }
      }
    }
    .sawtooth:before, .sawtooth:after {
      height: 130px;
    }

    .sawtooth:before {
      border-right: 16px dotted white;
      left: -6px;
      top: 11px;
    }

    .sawtooth:after {
      /* 圆点型的border */
      border-left: 16px dotted white;
      /* 偏移一个半径，让圆点的一半覆盖p */
      right: -6px;
      top: 11px;
    }
  }
</style>
