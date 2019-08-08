<template>
  <div id="service">
    <div class="activities" v-for="(activityItem,activityIndex) in activity" :key="activityIndex">
      <div class="activities-badge">{{activityItem.typeName}}</div>
      <div class="descrption">{{activityItem.description}}</div>
    </div>
    <div class="product-service">
      <div class="service-tip" v-if="lastTime.lastTimeInfo">
        <span class="iconfont icon-clock"></span>
        <span >{{lastTime.lastTimeInfo}}</span>
      </div>
      <div class="service-refund">
        <div class="service-item" v-for="(serviceItem,serviceIndex) in service" :key="serviceIndex">
          <span class="iconfont icon-checked"></span><span>{{serviceItem.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['service', 'activity', 'lastTime']
  }
</script>

<style lang="less" scoped>
  #service {
    width: 100%;
    background-color: #fff;
    padding-top: 10px;
    .activities {
      display: flex;
      align-items: center;
      padding: 0 20px 10px 20px;
      .activities-badge {
        width: 34px;
        border: 1px solid red;
        color: #ff1908;
        border-radius: 3px;
        text-align: center;
        padding: 1px;
        margin-right: 10px;
        font-size: 1rem;
      }
      .descrption {
        font-size: 1.32rem;
      }
    }
    .product-service {
      background-color: #fff;
      font-size: 1.35rem;
      .service-tip {
        padding-bottom: 10px;
        color: #f05423;
        display: flex;
        align-items: center;
        .iconfont {
          padding: 0 10px;
          font-size: 1.4rem;
        }
      }
      .service-refund {
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        .iconfont{
          color: #79cf80;
          padding: 10px 10px;
          font-size: 1.4rem;
        }
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-checked:before {
      content: "\e606";
    }

    .icon-clock:before {
      content: "\e641";
    }
  }
  @media screen and (min-width: 400px) {
    #service {
      padding-top: 20px;
      .activities {
        padding: 0 20px 20px 20px;
        .descrption {
          font-size: 1.42rem;
        }
      }
      .product-service {
        font-size: 1.4rem;
        .service-tip {
          .iconfont {
            padding: 0 10px 0 20px;
            font-size: 1.6rem;
          }
        }
        .service-refund {
          .iconfont{
            padding: 10px 10px 0 20px;
            font-size: 1.6rem;
          }
        }
      }
    }
  }
</style>
