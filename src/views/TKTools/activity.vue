<template>
  <div id="TK-activity">
    <Navigator>
      <span slot="title">内部活动</span>
    </Navigator>
    <div class="content" ref="activityContent">
      <section class="topic-pic"></section>
      <section class="topic-banner topic-today"></section>
      <div class="list-container">
        <ActivityItem v-for="item in topicToday" :key="item._id" :detail="item"/>
      </div>
      <section class="topic-banner topic-previous"></section>
      <div class="list-container">
        <ActivityItem v-for="item in topicPrevious" :key="item._id" :detail="item"/>
      </div>
      <section class="topic-banner topic-free"></section>
      <div id="empty" v-if="topicToday.length<=0 && topicPrevious.length<=0">
        <i class="iconfont icon-empty-list"></i>
        <div>您的列表空空如也</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import ActivityItem from './components/ActivityItem'
  import {List, Row, Col, Button, Checkbox, CheckboxGroup} from 'vant'
  import {getProducts, deleteProducts} from './service'
  import dayjs from 'dayjs'

  export default {
    components: {
      ActivityItem,
      Checkbox,
      CheckboxGroup,
      List,
      Row,
      VCol: Col,
      Navigator,
      Button
    },
    data() {
      return {
        topicToday: [],
        topicPrevious: [],
        selected: []
      }
    },
    created() {
      this.initTable()
    },
    mounted() {
      this.$refs.activityContent.scrollTop = this.$store.state.common.scrollTop
    },
    filters: {
      formatTime(value) {
        if (!value) {
          return null
        }
        return dayjs(value).format('YYYY-MM-DD')
      }
    },
    methods: {
      initTable() {
        getProducts().then(res => {
          this.topicToday = res.filter(item => dayjs(item.create_time).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD'))
          this.topicPrevious = res.filter(item => dayjs(item.create_time).format('YYYY-MM-DD') !== dayjs().format('YYYY-MM-DD'))
        })
      },
      getStatus({deadline}) {
        return dayjs(deadline).diff(new Date(), 'days') < 0
      },
      handleCheckAll() {
        if (this.selected.length > 0) {
          this.selected = []
        } else {
          this.selected = this.table
        }
      },
      handleDelete() {
        let id = this.selected.map(item => item._id)
        deleteProducts({id}).then(res => {
          this.initTable()
        })
      },
      addProduct() {
        this.$router.push({name: '淘客商品添加'})
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-activity {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: #feca43;

    .content {
      margin-top: 4rem;
      flex: 1;
      overflow-y: auto;
      .list-container{
        padding: 1rem;
        box-sizing: content-box;
        display: flex;
        flex-wrap: wrap;
      }
      .topic-today{
        background: url(../../assets/images/topic-today.jpg) no-repeat center;
      }
      .topic-previous{
        background: url(../../assets/images/topic-previous.jpg) no-repeat center;
      }
      .topic-free{
        background: url(../../assets/images/topic-free.jpg) no-repeat center;
      }
      .topic-banner{
        width: 100%;
        height: 12rem;
        background-size: cover;
        background-origin: content-box;
      }
      .topic-pic{
        width: 100%;
        height: 45rem;
        background: url(../../assets/images/topic-mian.jpg) no-repeat center;
        background-size: cover;
        background-origin: content-box;
      }
      #empty {
        text-align: center;
        margin-top: 40%;
        .iconfont {
          color: #c2c2c2;
          margin: auto;
          font-size: 6rem;
        }
        >div{
          font-size: 1.6rem;
          white-space: nowrap;
          padding: 1.5vh;
          text-align: center;
        }
      }
    }
  }
</style>
