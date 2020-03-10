import axios from '../../../http/api'

/**
 * 获取商品详情
 */
export const getProductDetailRequest = params => {
  return axios({
    method: 'get',
    url: '/tkTools/getProductInfo',
    params
  })
}

