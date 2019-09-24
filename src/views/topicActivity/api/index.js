import axios from '../../../http/api'

/**
 * 获取主题活动信息
 * @param params
 */
export const getTopicActivityRequest = params => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/topicInfo/getAdvisementData',
    params
  })
}

/**
 * 加入购物车
 */
export const submitAddGoods = productId => {
  return axios({
    method: 'post',
    url: '/shoppingCart/addGoods',
    data: {productId}
  })
}
