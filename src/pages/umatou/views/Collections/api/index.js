import axios from '../../../http/api'

/**
 * 获取收藏列表
 */
export const getsearchCollectRequest = () => {
  return axios({
    method: 'get',
    url: '/products/searchCollect'
  })
}

/**
 * 根据productId删除收藏
 * @param productId
 */
export const deleteCollectRequest = productId => {
  return axios({
    method: 'post',
    url: '/products/deleteCollect',
    data: {productId}
  })
}
