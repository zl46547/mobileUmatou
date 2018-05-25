<template>
  <div class="modal">
    <div>
      <div class="modal-top">
        <div>
          <slot name="title"></slot>
        </div>
        <div class="close" @click="closeModal">X</div>
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
  .modal {
    z-index: 9;
    width: 100vw;
    height: 100vh;
    background-color: rgba(129, 129, 129, 0.6);
    left: 50%;
    transform: translate(-50%);
    position: fixed;
    top: 0;
    > div {
      background-color: #fff;
      position: absolute;
      top: 30vh;
      left: 0;
      height: 70vh;
      width: 100vw;
      .modal-top {
        display: flex;
        justify-content: space-between;
        padding: 3vw;
        > div {
          font-size: 5vw;
          font-weight: bold;
        }
        .close {
          font-size: 4vw;
          cursor: pointer
        }
      }
      .modalContent{
        height:52vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
          display: none
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .modal {
      width: 768px;
      height: 100vh;
      > div {
        width: 768px;
        .modal-top {
          padding: 20px;
          > div {
            font-size: 22px;
          }
          .close {
            font-size: 30px;
          }
        }
      }
    }
  }
</style>
