import store from '@/vuex/store.js' // vuex
import { Message } from 'element-ui'
export default {
  /**
   * 加入购物车
   * @param value 产品对象信息
   */
  addCart (value) {
    var productInfo = value
    var list = store.state.car.carList
    var index = -1
    for (var i = 0; i < list.length; i++) {
      if (list[i].ProductId === productInfo.ProductId) {
        index = i
      }
    }
    // 说明存在
    if (index >= 0) {
      list[index].buyNum += 1
      list[index].totalMoney = Math.round(list[index].buyNum * list[index].DefaultMoney * 10) / 10
    } else {
      var cartItem = {}
      cartItem['ProductId'] = productInfo.ProductId
      cartItem['ProductName'] = productInfo.ProductName
      cartItem['PvStandard'] = productInfo.PvStandard
      cartItem['PictureId'] = productInfo.PictureId
      cartItem['DefaultMoney'] = productInfo.DefaultMoney
      cartItem['buyNum'] = 1
      cartItem['totalMoney'] = productInfo.DefaultMoney
      cartItem['checked'] = true
      list.unshift(cartItem)
    }
    store.commit('CAR_LIST', list)
    Message({
      message: '成功加入购物车！',
      type: 'success',
      duration: 800
    })
  }
}
