import axios from '../../../http/api'

/**
 * 查看商品列表
 */
export const getProductsRequest = () => {
  return axios({
    method: 'get',
    url: 'lianlian/getProducts'
  })
}

