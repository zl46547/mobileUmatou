import axios from '../../../http/api'

/**
 * 获取购物车列表
 * @param customerGuid
 */
export const getCartListRequest = customerGuid => {
  return axios({
    method: 'get',
    url: '/shoppingCart/getCartList',
    params: {customerGuid}
  })
}

/**
 * 删除购物车
 * @param data
 */
export const deleteGoodsRequest = data => {
  return axios({
    method: 'POST',
    url: '/shoppingCart/deleteGoods',
    data
  })
}

/**
 * 改变购物车数量
 * @param data
 */
export const setGoodsQuantityRequest = data => {
  return axios({
    method: 'POST',
    url: '/shoppingCart/setGoodsQuantity',
    data
  })
}
