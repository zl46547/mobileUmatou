import axios from '../../../http/api'

/**
 * 获取商品详情
 */
export const getProductDetailRequest = params => {
  return axios({
    method: 'get',
    url: '/productDetail/detail',
    params
  })
}

/**
 * 获取评论列表
 */
export const getRateListRequest = params => {
  return axios({
    method: 'get',
    url: '/productComment/commentList',
    params
  })
}

/**
 * 获取评论基础数据
 */
export const getRateStatisticsRequest = params => {
  return axios({
    method: 'get',
    url: '/productComment/statistics',
    params
  })
}

/**
 * 加入购物车
 */
export const submitAddGoods = data => {
  return axios({
    method: 'post',
    url: '/shoppingCart/addGoods',
    data
  })
}

/**
 * 查询购物车数量
 */
export const getCartCount = params => {
  return axios({
    method: 'get',
    url: '/shoppingCart/getCartCount',
    params
  })
}
