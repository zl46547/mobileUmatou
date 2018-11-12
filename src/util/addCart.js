import store from '@/vuex/store.js' // vuex

export default {
  /**
   * 加入购物车
   * @param productInfo 产品对象信息
   */
  addCart (productInfo) {
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
      list[index].totalMoney = (list[index].buyNum * list[index].PeriodMoney).toFixed(2)
    } else {
      var cartItem = {
        ...productInfo,
        buyNum: 1,
        checked: true,
        totalMoney: productInfo.PeriodMoney
      }
      list.unshift(cartItem)
    }
    store.commit('CAR_LIST', list)
  }
}
