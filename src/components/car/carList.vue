<template>
  <div class="carList" v-if="dataList">
    <div v-for="(item,i) in dataList" :key="i"
         style="margin-bottom: 2vh;background-color: #fff;box-shadow: 0px 2px 6px #bfbfbf">
      <div class="checkbox" style="display: table;justify-content: flex-start;padding: 2vh 0">
        <div class="checkbox-left" style="padding: 0 2vw;display:table-cell; vertical-align:middle;"
             @click="checkProduct(item)">
          <i class="icon iconfont icon-round" style="font-size: 6vw;"
             v-if="getCheckedItem.indexOf(item.ProductName)<0"></i>
          <i class="icon iconfont icon-roundcheck" style="font-size: 6vw;color: #00d300;"
             v-if="getCheckedItem.indexOf(item.ProductName)>=0"></i>
        </div>
        <div class="checkbox-right" style="margin: 2vw;display: flex">
          <div>
            <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'" alt="购物车图片"
                 style="width: 25vw;height: 25vw;padding: 2vw;border: 1px solid #ccc;border-radius: 5px">
          </div>
          <div style="padding: 0 5vw;">
            <p style="text-overflow: ellipsis;padding-bottom: 3vw;color: #333;">{{item.ProductName}}</p>
            <div style="display: table">
              <div style="width: 20vw;display: table-cell;vertical-align: middle;">
                <p style="color: #999;font-size: 4vw;">{{item.PvStandard}}</p>
                <p style="color: #f05423;font-size: 5vw;">¥{{item.DefaultMoney}}</p>
              </div>
              <div style="width: 100%;">
                <div style="display: flex;justify-content: center;background-color: #fff;">
                  <div
                    style="display:flex;font-size: 4vw;width: 7vw;height: 7vw;border: 1px solid #cccccc;border-radius: 4px 0 0 4px">
                    <p style="margin:auto;" @click="changeNum(-1,i)">-</p></div>
                  <div style="display:flex;font-size: 4vw;width: 8vw;height: 7vw;border: 1px solid #cccccc;"><p
                    style="margin:auto;">{{item.buyNum}}</p></div>
                  <div
                    style="display:flex;font-size: 4vw;width: 7vw;height: 7vw;border: 1px solid #cccccc;border-radius: 0 4px 4px 0">
                    <p style="margin:auto;" @click="changeNum(1,i)">+</p></div>
                </div>
                <div style="margin-top: 1vh;height: 5vh;float: right;">
                  <p @click="deleteItem(i)"
                     style="padding: 1vh 0vw;text-align:center;color: #fff;width: 20vw;background-color: red;border-radius: 4px;">
                    删除</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carList-buttom"
           style="height: 7vh;border-top: 1px solid #ccc;color: #f05423;display: flex;align-items: center">
        <p style="padding: 0 12vw">小计：¥{{item.totalMoney}}元</p>
      </div>
    </div>
    <!-- 合计 -->
    <div style="background-color: #fefefe;position: fixed;width: 100vw;height: 9vh;bottom: 9vh">
      <div style="display: flex;justify-content: space-between">
        <div style="margin: auto 0;display: table;padding-left: 2vw">
          <i class="icon iconfont icon-round" v-if="!checkAllStatus"
             style="font-size: 6vw;display: table-cell;vertical-align: bottom" @click="checkAll"></i>
          <i class="icon iconfont icon-roundcheck"
             style="display: table-cell;vertical-align: bottom;font-size: 6vw;color: #00d300;" v-if="checkAllStatus"
             @click="checkAll"></i>
          <p style="padding: 0 5vw 0 3vw;display: table-cell;vertical-align: bottom">全选</p>
          <div style="display: table">
            <span style="font-size: 6vw;display: table-cell;vertical-align: middle">合计：</span>
            <span style="font-size: 5vw;color: #ff2b1c;display: table-cell;vertical-align: bottom">¥{{getLastTotalMoney}}</span>
          </div>
        </div>
        <div style="background-color: #ff822a;color: #fff;height: 9vh;display:flex;text-align: center;padding: 0 2vw">
          <div style="margin: auto"><span>去结算</span><span>（{{checkedcarsList.length}}）</span></div>
        </div>
      </div>
    </div>
    <!-- 脚部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from '@/common/_footer.vue'
  import { MessageBox } from 'mint-ui'

  export default {
    components: {
      'VFooter': Footer
    },
    mounted () {
      this.dataList = this.$store.state.car.carList
    },
    data () {
      return {
        checkAllStatus: false,
        checkedcarsList: [], // 选中的购物车
        dataList: []
      }
    },
    methods: {
      // 删除购物车列表
      deleteItem (index) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          // 删除选中列表内的数据
          if (this.checkedcarsList.length > 0) {
            for (var i = 0; i < this.checkedcarsList.length; i++) {
              if ((JSON.stringify(this.checkedcarsList[i]) === (JSON.stringify(this.dataList[index])))) {
                this.checkedcarsList.splice(i, 1)
                break
              }
            }
          }
          // 删除数据源内的数据
          this.dataList.splice(index, 1)
          // 提交vuex，修改localStorage购物车列表数据
          this.$store.commit('CAR_LIST', this.dataList)
        }, () => {
          // 取消的内容
        })
      },
      checkAll () {
        if (this.checkAllStatus) {
          this.checkedcarsList = []
          this.checkAllStatus = false
        } else {
          // 这里不能直接写成：this.checkedcarsList = this.dataList
          // 一个对象赋值给另一个对象会存在指向性问题，两个对象指向同一块内存区域
          // 当修改一处值时，另一处也会跟着改
          this.checkedcarsList = JSON.parse(JSON.stringify(this.dataList))
          this.checkAllStatus = true
        }
      },
      /**
       * 改变购买数量
       * @param val 购物车数量+1或者是-1
       * @param index 操作的下标
       */
      changeNum (val, index) {
        var num = this.dataList[index].buyNum + val
        if (num <= 0) {
          this.dataList[index].buyNum = 1
        } else {
          this.dataList[index].buyNum += val
        }
        var totalMoney = parseInt(this.dataList[index].DefaultMoney * 100 * this.dataList[index].buyNum) / 100
        this.dataList[index].totalMoney = totalMoney
        // 提交vuex，修改localStorage购物车列表数据
        this.$store.commit('CAR_LIST', this.dataList)
      },
      /**
       * 复选框
       * @param val 当前操作的列表对象
       */
      checkProduct (val) {
        // 已被选中的列表
        var index = -1
        if (this.checkedcarsList.length > 0) {
          for (var i = 0; i < this.checkedcarsList.length; i++) {
            if ((JSON.stringify(this.checkedcarsList[i]) === (JSON.stringify(val)))) {
              index = i
              break
            }
          }
        }
        if (index >= 0) {
          // 表示已在选中列表中，此时应该是将其移除
          this.checkedcarsList.splice(index, 1)
        } else {
          this.checkedcarsList.push(val)
        }
        // 修改全选的状态
        if (this.dataList.length === this.checkedcarsList.length) {
          this.checkAllStatus = true
        } else {
          this.checkAllStatus = false
        }
      }
    },
    computed: {
      getCheckedItem () {
        var list = []
        if (this.checkedcarsList.length > 0) {
          this.checkedcarsList.forEach(function (e) {
            list.push(e.ProductName)
          })
        }
        return list
      },
      getLastTotalMoney () {
        var money = 0
        if (this.checkedcarsList.length > 0) {
          this.checkedcarsList.forEach(function (e) {
            money += e.totalMoney
          })
        }
        return parseInt(money * 100) / 100
      }
    }
  }
</script>

<style lang="less" scoped>
  .carList {
    padding-top: 7vh;
    padding-bottom: 17vh;
    width: 100vw;
    height: 100%;
  }

  @media screen and (min-width: 768px) {
  }
</style>
