<template>
  <div class="orderButton" v-if="button">
    <div :style="{'color':button.color,'border': `1px solid ${button.color}`}">
      {{button.name}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['button'],
    data () {
      return {}
    },
    computed: {},
    mounted () {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .orderButton > div {
    font-size: 1.2rem;
    margin: 0 1vw 1vh 1vw;
    padding: 0.8vh 3vw;
    border-radius: 90px;
    text-align: center;
    cursor: pointer;
  }

  @media screen and (min-width: 640px) {
    .orderButton > div {
      font-size: 1.6rem;
      margin: 0 7px 8px 7px;
      padding: 7px 25px;
    }
  }
</style>
