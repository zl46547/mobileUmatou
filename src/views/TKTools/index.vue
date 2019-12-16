<template>
  <div id="TK-tools">
    <Navigator>
      <span slot="title">淘客助手</span>
    </Navigator>
    <div class="content">
      <Button type="info" @click="addProduct">添加商品</Button>
      <Button type="default" @click="handleCheckAll" class="btn">全选</Button>
      <Button type="primary" @click="handleDelete">删除</Button>
      <List
        finished-text="没有更多了"
      >
        <CheckboxGroup v-model="selected">
          <Checkbox :name="item" v-for="item in table" :key="item._id">
            <div class="list-item">
              <img :src="item.fileList[0]?item.fileList[0].content:null" alt="">
              <div :class="{'warning':getStatus(item)}">
                <p class="product-name">{{item.productName}}</p>
                <p class="product-deadline">活动结束时间：{{item.deadline |formatTime}}</p>
              </div>
            </div>
          </Checkbox>
        </CheckboxGroup>
      </List>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import {List, Row, Col, Button, Checkbox, CheckboxGroup} from 'vant'
  import {getProducts, deleteProducts} from './service'
  import dayjs from 'dayjs'

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
      initTable() {
        getProducts().then(res => {
          this.table = res
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

  #TK-tools {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .content {
      margin-top: 4rem;
      padding: 0 2rem;
      flex: 1;
      background-color: #fff;
      overflow-y: auto;

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
        .warning{
          color: red;
        }
        .product-deadline{
          font-size: 1.4rem;
          font-weight: bold;
          margin-top: 3px;
        }
      }
    }
  }
</style>
