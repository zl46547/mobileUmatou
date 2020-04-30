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

/**
 * 查看商品详情
 * @param id
 */
export const getProductDetailRequest = id => {
  return axios({
    method: 'get',
    url: 'lianlian/detail',
    params: {id}
  })
}
