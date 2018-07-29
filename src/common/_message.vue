<template>
  <div id="alert">
    <div class="mask">
      <div class="content">
        <div>
          <slot name="title"></slot>
        </div>
        <main>
          <div class="description">
            <slot name="description"></slot>
          </div>
          <div class="button">
            <div class="cancel">取消</div>
            <div class="comfirm">确定</div>
          </div>
        </main>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['showAlert']
  }
</script>

<style lang="less" scoped>
  #alert {
    .mask {
      z-index: 999;
      position: fixed;
      left: 50%;
      margin-left: -50%;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      background-color: rgba(0, 0, 0, 0.5);
      .content {
        margin: auto;
        width: 80vw;
        background-color: rgb(249, 249, 249);
        padding: 2.5vh 2vw;
        border-radius: 3px;
        main {
          margin: auto;
          .button {
            display: flex;
            align-items: center;
            justify-content: center;
            .cancel, .comfirm {
              width: 40%;
              padding: 2vh 0;
              text-align: center;
              border-radius: 5px;
              cursor: pointer;
            }
            .cancel {
              margin-right: 5vw;
              border: 1px solid #0bd235;
              color: #0bd235;
            }
            .comfirm {
              color: #fff;
              background-color: #0bd235;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    #alert {
      .mask {
        width:640px;
        margin-left: -320px;
        .content {
          width: 510px;
          padding: 20px 15px;
          main {
            .button {
              .cancel, .comfirm {
                padding: 15px 0;
              }
              .cancel {
                margin-right: 35px;
              }
            }
          }
        }
      }
    }
  }
</style>
