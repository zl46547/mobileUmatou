<template>
  <div id="LL-tools">
    <Navigator>
      <span slot="title">联联助手</span>
    </Navigator>
    <div class="content">
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ActivityItem
          :detail="item"
          user-type="adminPool"
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
  /* eslint-disable no-new */

  import Navigator from '../../common/Navigator'
  import ActivityItem from './components/ActivityItem'
  import {List} from 'vant'
  import {getHomeList, getProducts} from './service'

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
        pageIndex: 0,
        selected: []
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
        this.selected = await getProducts()
        let {data} = await getHomeList({
          pageSize: 10,
          pageIndex: this.pageIndex
        })
        // 加载状态结束
        this.loading = false
        if (this.pageIndex > 0) {
          this.table = this.table.concat(this.checkIsSelected(data))
        } else {
          this.table = this.checkIsSelected(data)
        }
      },
      refresh(id) {
        let index = this.table.findIndex(item => item.id === id)
        this.table[index].checked = !this.table[index].checked
        this.table[index].last_modified_time = new Date()
      },
      refreshRubbing(id) {
        let index = this.table.findIndex(item => item.id === id)
        this.table[index].last_modified_time = new Date()
      },
      checkIsSelected(list) {
        return list.map(item => {
          let index = this.selected.findIndex(i => i.id === item.id)
          item.checked = index >= 0
          if (index >= 0) {
            item.last_modified_time = this.selected[index].last_modified_time
          }
          return item
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";
  #LL-tools {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    .content {
      margin-top: 80rem/@baseFontSize;
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
