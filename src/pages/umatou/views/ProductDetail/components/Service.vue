<template>
  <div class="service">
    <div class="activities"
         v-for="(activityItem,activityIndex) in activity"
         :key="activityIndex"
    >
      <div class="activities-badge">{{activityItem.typeName}}</div>
      <div class="description">{{activityItem.description}}</div>
    </div>
    <div class="product-service">
      <div class="service-tip" v-if="lastTime.lastTimeInfo">
        <span class="iconfont icon-zhong"></span>
        <span class="last-time">{{lastTime.lastTimeInfo}}</span>
      </div>
      <div class="service-refund">
        <div class="service-item"
             v-for="(serviceItem,serviceIndex) in service"
             :key="serviceIndex"
        >
          <span class="iconfont icon-success"></span>
          <span class="name">{{serviceItem.name}}</span>
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
  @import "../../../../../less/variables";

  .service {
    background-color: #fff;
    padding: 20rem/@baseFontSize;
    .activities {
      margin-bottom: 10rem/@baseFontSize;
      display: flex;
      align-items: center;
      .activities-badge {
        width: 50rem/@baseFontSize;
        border: 1px solid @red;
        color: @red;
        border-radius: 3rem/@baseFontSize;
        text-align: center;
        margin-right: 10rem/@baseFontSize;
        font-size: 1.2rem;
      }
      .description {
        font-size: 1.32rem;
      }
    }
    .product-service {
      font-size: 1.35rem;
      .service-tip {
        padding-bottom: 20rem/@baseFontSize;
        color: @red;
        display: flex;
        align-items: center;
        .icon-zhong {
          padding: 0 20rem/@baseFontSize;
          font-size: 1.6rem;
        }
      }
      .service-refund {
        margin-top: 20rem/@baseFontSize;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .iconfont{
          color: @green;
          font-size: 1.6rem;
          font-weight: bold;
        }
        .name{
          font-size: 1.4rem;
          margin-right: 20rem/@baseFontSize;
        }
      }
      .service-item{
        line-height: 2;
        white-space: nowrap;
      }
    }
  }
</style>
