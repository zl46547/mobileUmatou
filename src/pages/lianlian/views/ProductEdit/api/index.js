import axios from '../../../http/api'

/**
 * 获取首页列表
 * @param params
 */
export const getHomeListRequest = params => {
  return axios({
    method: 'get',
    url: 'lianlian/list',
    params
  })
}
/**
 * 添加商品
 * @param data
 */
export const addPoolRequest = data => {
  return axios({
    method: 'post',
    url: 'lianlian/addPool',
    data
  })
}

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
 * 删除商品
 * @param data
 */
export const deleteProductsRequest = data => {
  return axios({
    method: 'post',
    url: 'lianlian/deleteProducts',
    data
  })
}

/**
 * 擦亮商品
 * @param data
 */
export const changeHotRequest = data => {
  return axios({
    method: 'post',
    url: 'lianlian/rubbing',
    data
  })
}

