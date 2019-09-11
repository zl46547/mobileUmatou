<template>
  <div class="mask" v-if="visible">
    <div class="content">
      <div class="title van-hairline--bottom">
        {{title}}
      </div>
      <main>
        <div class="description">
          {{description}}
        </div>
        <div class="button">
          <div class="cancel" @click="onCancel">取消</div>
          <div class="confirm" @click="onConfirm">确定</div>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['title', 'description', 'visible'],
    methods: {
      onCancel() {
        this.$emit('is-confirm', false)
      },
      onConfirm() {
        this.$emit('is-confirm', true)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  .mask {
    max-width: 640px;
    min-width: 320px;
    width: 100%;
    z-index: 999;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    top: 0;
    height: 100vh;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    .content {
      margin: auto;
      width: 400rem/@baseFontSize;
      background-color: rgb(249, 249, 249);
      border-radius: 5rem/@baseFontSize;
      animation: bounce-in .5s;
      .title {
        padding: 20rem/@baseFontSize;
        text-align: center;
        font-size: 30rem/@baseFontSize;
        font-weight: bold;
      }
      main {
        margin: auto;
        .description {
          padding: 30rem/@baseFontSize;
          text-align: center;
          font-size: 28rem/@baseFontSize;
        }
        .button {
          padding-bottom: 20rem/@baseFontSize;
          display: flex;
          align-items: center;
          justify-content: center;
          .cancel, .confirm {
            width: 30%;
            padding: 15rem/@baseFontSize;
            text-align: center;
            border-radius: 5rem/@baseFontSize;
            cursor: pointer;
            font-size: 28rem/@baseFontSize;
          }
          .cancel {
            margin-right: 15rem/@baseFontSize;
            border: 1px solid @themeColor;
            color: @themeColor;
          }
          .confirm {
            color: #fff;
            background-color: @themeColor;
          }
        }
      }
    }
    @keyframes bounce-in {
      0% {
        transform: translateY(-100vh);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
</style>
