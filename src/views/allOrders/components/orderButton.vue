<template>
  <div class="orderButton" v-if="button">
    <div :style="{'color':button.color,'border': '1px solid '+ button.color}">
      {{button.name}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      button: {
        default: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .orderButton > div {
    font-size: 1rem;
    margin-left: 10px;
    padding: 8px 15px;
    border-radius: 90px;
    text-align: center;
    cursor: pointer;
  }
</style>
