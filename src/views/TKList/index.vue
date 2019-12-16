<template>
  <div id="TK-list">
    <Navigator>
      <span slot="title">海报列表</span>
    </Navigator>
    <div class="content">
      <List
        finished-text="没有更多了"
      >
        <CheckboxGroup v-model="result">
          <Checkbox :name="item" v-for="item in table" :key="item.code">
            <div class="list-item">
              <img :src="item.fileList[0]?item.fileList[0].content:null" alt="">
              <p class="product-name">{{item.productName}}</p>
            </div>
          </Checkbox>
        </CheckboxGroup>
      </List>
      <Button type="default" @click="handleCheckAll" class="btn">全选</Button>
      <Button type="primary" @click="handleDelete">删除</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigator from '../../common/Navigator'
  import {List, Row, Col, Button, Checkbox, CheckboxGroup} from 'vant'
  import utils from '../../util/common'
  import Clipboard from 'clipboard'

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
        result: []
      }
    },
    computed: {},
    methods: {
      handleCheckAll() {
        if (this.result.length > 0) {
          this.result = []
        } else {
          this.result = this.table
        }
      },
      handleDelete() {
        let codeList = this.result.map(item => item.code)
        let newResult = this.result.filter(item => !codeList.contains(item.code))
        this.table = newResult
        utils.setLocal('TAO_KE_LIST', newResult)
      },
      handleCopy() {
        let copyText = ''
        let bq = ['😊', '🙃', '☺', '😋', '😝', '😜', '😘', '😍', '🤗', '😚', '😬', '😀', '👉', '🙋', '🙆',
          '💁', '[色]', '[偷笑]', '[愉快]', '[呲牙]', '[玫瑰]', '[爱心]', '[拥抱]', '[太阳]', '[月亮]', '🎉', '🙏', '🎁',
          '[红包]', '[福]', '[跳跳]', '[转圈]', '[蛋糕]', '[西瓜]', '[啤酒]']
        this.result.forEach(item => {
          copyText += `${bq[Math.floor(Math.random() * 36)]} ${item.keyword}：${item.url} \n\n`
        })
        /* eslint-disable no-new */
        new Clipboard('.btn', {
          text(trigger) {
            return copyText
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  #TK-list {
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
        }

        .product-name {
          flex: 1;
        }
      }
    }
  }
</style>
