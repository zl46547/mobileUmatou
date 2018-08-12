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
        <div class="lastTimeInfo">
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
      padding: 2% 6%;
      .activities-badge{
        width:40px;
        border: 1px solid red;
        color: #ff1908;
        border-radius: 3px;
        text-align: center;
        font-size:1.1rem;
        padding: 3px;
        margin-right: 10px;
      }
      p{
        padding-top: 3px;
        font-size:1.2rem;
      }
    }
    .service{
      background-color: #fff;
      .service-tip{
        color: #f05423;
        display: flex;
        padding: 1% 3%;
        i{
          font-size:1.6rem;
          padding:0 10px;
        }
        .lastTimeInfo{
          font-size:1.2rem;
        }
      }
      .service-refund{
        padding: 1% 3% 2% 3%;
        font-size:1.2rem;
        i{
          color: #79cf80;
          font-size:1.6rem;
          padding:0 10px;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .content{
      .activities{
        .activities-badge{
          width:50px;
          font-size:1.3rem;
          margin-right: 10px;
        }
        p{
          font-size:1.5rem;
        }
      }
      .service{
        .service-tip{
          i{
            font-size:1.8rem;
          }
          .lastTimeInfo{
            font-size:1.4rem;
          }
        }
        .service-refund{
          font-size:1.4rem;
          i{
            font-size:1.8rem;
          }
        }
      }
    }
  }
</style>
