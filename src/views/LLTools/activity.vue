<template>
  <div id="LL-activity">
    <div class="content">
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ActivityItem
          :detail="item"
          user-type="adminActivity"
          v-for="item in table"
          :key="item.id"
          @refresh="refresh"
          @refreshRubbing="refreshRubbing"
        />
      </List>
      <div id="empty" v-if="table.length<=0">
        <i class="iconfont icon-empty-list"></i>
        <div>您的列表空空如也</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Navigator from '../../common/Navigator'
  import ActivityItem from './components/ActivityItem'
  import {List} from 'vant'
  import {getProducts} from './service'

  export default {
    components: {
      ActivityItem,
      List,
      Navigator
    },
    data() {
      return {
        table: [],
        loading: false,
        finished: false,
        pageIndex: 0
      }
    },
    methods: {
      toActivity() {
        this.$router.push({
          name: '联联主页',
          query: {customerGuid: 'e20d8d0d-eaf3-12d4-b4a525b5ba8e'}
        })
      },
      onLoad() {
        this.pageIndex = this.pageIndex + 1
        this.initTable()
      },
      /**
       * 初始化表格数据
       */
      async initTable() {
        let table = await getProducts()
        this.table = table.map(item => {
          item.checked = true
          return item
        })
        // 加载状态结束
        this.loading = false
      },
      refresh(id) {
        let index = this.table.findIndex(item => item.id === id)
        this.table[index].checked = !this.table[index].checked
        this.table[index].last_modified_time = new Date()
      },
      refreshRubbing(id) {
        let index = this.table.findIndex(item => item.id === id)
        this.table[index].last_modified_time = new Date()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #LL-activity {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .content {
      padding: 0 1rem;
      flex: 1;
      overflow-y: auto;

      #empty {
        text-align: center;
        margin-top: 40%;

        .iconfont {
          color: #c2c2c2;
          margin: auto;
          font-size: 6rem;
        }

        > div {
          font-size: 1.6rem;
          white-space: nowrap;
          padding: 1.5vh;
          text-align: center;
        }
      }
    }
  }
</style>
