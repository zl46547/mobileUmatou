import axios from '../../../http/api'

/**
 * 获取购物车列表
 * @param params
 */
export const getCartListRequest = params => {
  return axios({
    method: 'get',
    url: '/shoppingCart/getCartList',
    params
  })
}

/**
 * 获取购物车列表
 * @param data
 */
export const deleteGoodsRequest = data => {
  return axios({
    method: 'POST',
    url: '/shoppingCart/deleteGoods',
    data
  })
}
