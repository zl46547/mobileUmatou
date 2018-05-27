<template>
  <div class="sawtooth" style="display: flex;align-items: center;" :style="{'background-color':coupon.backgroundColor}">
    <div class="par">
      <sub class="sign">￥</sub><span>{{coupon.Amount}}</span><sub>优惠券</sub>
      <p>{{coupon.Description}}</p></div>
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

  .sawtooth .par {
    float: left;
    padding: 16px 15px;
    width: 50vw;
    border-right: 2px dashed rgba(255, 255, 255, .3);
    text-align: left;
  }

  .sawtooth .par p {
    color: #fff;
  }

  .sawtooth .par span {
    font-size: 10vw;
    color: #fff;
    margin-right: 2vw;
    vertical-align: middle;
  }

  .sawtooth .par .sign {
    font-size: 6vw;
  }

  .sawtooth .par sub {
    top: -1vw;
    font-size: 5vw;
    color: rgba(255, 255, 255, .8);
  }

  .sawtooth .copy {
    text-align: center;
    padding: 3vw 2vw;
    width: 30vw;
    vertical-align: text-bottom;
    font-family: "Microsoft Himalaya";
    font-size: 7vw;
    color: rgb(255, 255, 255);
  }

  .sawtooth .copy p {
    font-size: 5vw;
  }
</style>
