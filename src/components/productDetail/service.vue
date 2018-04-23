<template>
  <div class="content">
    <div class="activities">
      <div class="activities-badge">换购</div>
      <p>{{response.ProductActivities[0].Descrption}}</p>
    </div>
    <div class="service">
      <div class="service-tip">
        <div>
          <i class="el-icon-time"></i>
        </div>
        <div>
          <p>{{response.ProductInfo.LastTimeInfo}}</p>
        </div>
      </div>
      <div class="service-refund">
          <i class="el-icon-circle-check-outline"></i><span>{{response.ProductInfoServices[0].Name}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['response'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .content{
    width:100%;
    background-color: #fff;
    .activities{
      display: flex;
      padding:20px;
      .activities-badge{
        width:40px;
        border: 1px solid red;
        color: #ff1908;
        border-radius: 3px;
        text-align: center;
        padding: 3px;
        margin-right: 10px;
      }
      p{
        padding-top: 3px;
      }
    }
    .service{
      background-color: #fff;
      .service-tip{
        color: #f05423;
        display: flex;
        i{
          padding:0px 10px;
        }
      }
      .service-refund{
        i{
          color: #79cf80;
          padding:10px 10px;
        }
      }
    }
  }
</style>
