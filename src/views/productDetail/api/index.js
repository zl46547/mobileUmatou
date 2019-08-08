import axios from '../../../http/api'

/**
 * 获取分类详情
 */
export const getProductDetailRequest = params => {
  return axios({
    method: 'get',
    url: '/productDetail/detail',
    params
  })
}
