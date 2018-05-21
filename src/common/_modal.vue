<template>
  <div style="width: 100vw;height: 100vh;background-color: rgba(129, 129, 129, 0.6);position: fixed;top: 0;left: 0;">
    <div style="background-color: #fff;position: relative;top: 30vh;left: 0;height: 70vh;width: 100vw;">
      <div style="display: flex;justify-content: space-between;padding: 3vw">
        <div style="font-size: 5vw;font-weight: bold;"><slot name="title"></slot></div>
        <div style="font-size: 4vw;cursor: pointer" @click="closeModal">X</div>
      </div>
      <div style="height: 52vh;">
        <slot name="content"></slot>
      </div>
      <div style="cursor:pointer;margin:auto;width: 60vw;height: 45px;background-color: #ff2b1c;display: flex;border-radius: 90px;align-self: flex-end">
        <p style="margin: auto;color: #fff;">确定</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    methods: {
      closeModal () {
        this.$emit('close-modal', false)
      }
    }
  }
</script>

<style lang="less" scoped>

  @media screen and (min-width: 768px) {
  }
</style>
