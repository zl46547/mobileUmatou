<template>
  <div class="radio-group" v-if="radioList">
    <div class="radio"
         @click="checkRadio(item.name)"
         :class="{'isChecked':item.name === radioSelected}"
         v-for="(item,i) in radioList" :key="i">{{item.name}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['radioList', 'hasSelected'],
    data () {
      return {
        radioSelected: ''
      }
    },
    mounted () {
      var vm = this
      vm.radioSelected = vm.hasSelected
    },
    methods: {
      checkRadio (val) {
        this.radioSelected = val
        this.$emit('radio-selected', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .radio-group {
    display: flex;
    .radio {
      cursor: pointer;
      padding: 1.5vh 3vw;
      border-radius: 90px;
      margin: 1vw;
      color: #ccc;
      border: 1px solid #ccc;
    }
    .isChecked {
      color: #ff2b1c;
      border: 1px solid #ff2b1c;
    }
  }

  @media screen and (min-width: 768px) {
  }
</style>
