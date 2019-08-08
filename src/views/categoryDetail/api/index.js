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
