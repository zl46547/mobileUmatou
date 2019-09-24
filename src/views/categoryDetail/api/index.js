import axios from '../../../http/api'

/**
 * 获取分类详情
 */
export const getCategoryDetailRequest = params => {
  return axios({
    method: 'get',
    url: '/products/categoryDetail',
    params
  })
}

/**
 * 加入购物车
 */
export const addGoodsRequest = productId => {
  return axios({
    method: 'post',
    url: '/shoppingCart/addGoods',
    data: {productId}
  })
}
