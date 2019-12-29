<template>
  <div id="TK-tools">
    <Navigator>
      <span slot="title">淘客助手</span>
    </Navigator>
    <div class="operate-btn">
      <Button size="small" type="info" @click="addProduct">添加商品</Button>
      <Button size="small" type="default" @click="handleCheckAll" class="btn">全选</Button>
      <Button size="small" type="primary" @click="handleDelete">删除</Button>
      <Button size="small" type="danger" :disabled="selected.length !==1" @click="handleEdit">编辑</Button>
      <Button size="small" type="warning" ref="copy" :disabled="selected.length !==1" @click="copyCode">复制淘口令</Button>
    </div>
    <div class="content">
      <List
        finished-text="没有更多了"
      >
        <CheckboxGroup v-model="selected">
          <Checkbox :name="item" v-for="item in table" :key="item._id">
            <div class="list-item">
              <img :src="item.fileList[0]?item.fileList[0].url:null" alt="">
              <div :class="{'warning':getStatus(item)}">
                <p class="product-name">{{item.productName}}</p>
                <p class="product-deadline">活动结束时间：{{item.deadline | formatTime}}</p>
              </div>
            </div>
          </Checkbox>
        </CheckboxGroup>
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
  import {List, Row, Col, Button, Checkbox, CheckboxGroup, Toast} from 'vant'
  import {getProducts, deleteProducts} from './service'
  import dayjs from 'dayjs'
  import copy from 'copy-to-clipboard'

  export default {
    components: {
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
        table: [],
        selected: []
      }
    },
    created() {
      this.initTable()
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
      /**
       * 复制淘口令
       */
      copyCode() {
        let code = this.selected[0].code
        copy(code)
        Toast.success('复制成功！')
      },
      /**
       * 初始化表格数据
       */
      initTable() {
        getProducts().then(res => {
          this.table = res
        })
      },
      /**
       * 判断是否截单
       * @param deadline
       * @returns {boolean}
       */
      getStatus({deadline}) {
        return dayjs(deadline).diff(new Date(), 'days') < 0
      },
      /**
       * 全选
       */
      handleCheckAll() {
        if (this.selected.length > 0) {
          this.selected = []
        } else {
          this.selected = this.table
        }
      },
      /**
       * 删除
       */
      handleDelete() {
        let id = this.selected.map(item => item._id)
        deleteProducts({id}).then(res => {
          this.initTable()
        })
      },
      /**
       * 新增
       */
      addProduct() {
        this.$router.push({name: '淘客商品添加'})
      },
      /**
       * 编辑
       */
      handleEdit() {
        this.$router.push({
          name: '淘客商品添加',
          query: {id: this.selected[0]._id}
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-tools {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    .operate-btn {
      background-color: #fff;
      padding: 6rem 0 2rem;
    }
    .content {
      padding: 0 2rem;
      flex: 1;
      background-color: #fff;
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
      .list-item {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        font-size: 1.3rem;

        img {
          display: block;
          width: 5rem;
          height: 5rem;
          margin-right: 10px;
          flex: none;
        }
        .warning {
          color: red;
        }
        .product-deadline {
          font-size: 1.4rem;
          font-weight: bold;
          margin-top: 3px;
        }
      }
    }
  }
</style>
