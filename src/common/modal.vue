<template>
  <div id="modal">
    <div class="mask" @click.stop="closeModal"></div>
    <div class="modal-content">
      <div class="modal-top">
        <div>
          <slot name="title"></slot>
        </div>
        <div class="close" @click.stop="closeModal">X</div>
      </div>
      <div class="modalContent">
        <slot name="content"></slot>
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
  #modal {
    z-index: 999;
    width: 100%;
    max-width:640px;
    height: 100vh;
    left: 50%;
    transform: translate(-50%);
    position: fixed;
    top: 0;
    .mask{
      background-color: rgba(129, 129, 129, 0.6);
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
    }
    .modal-content {
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 70vh;
      width: 100%;
      max-width:640px;
      .modal-top {
        height:50px;
        display: flex;
        justify-content: space-between;
        > div {
          margin: auto 0;
          padding: 0 20px;
          font-size: 1.4rem;
          font-weight: bold;
        }
        .close {
          font-size: 1.3rem;
          cursor: pointer
        }
      }
      .modalContent{
        height:calc(70vh - 50px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
          display: none
        }
      }
    }
  }
</style>
