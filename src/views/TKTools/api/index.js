import axios from '../../../http/api'

/**
 * 添加商品
 * @param data
 */
export const addProductRequest = data => {
  return axios({
    method: 'post',
    url: 'tkTools/addProduct',
    data
  })
}
/**
 * 删除商品
 * @param data
 */
export const deleteProductsRequest = data => {
  return axios({
    method: 'post',
    url: 'tkTools/deleteProducts',
    data
  })
}

/**
 * 编辑商品
 * @param data
 */
export const updateProductRequest = data => {
  return axios({
    method: 'post',
    url: 'tkTools/updateProduct',
    data
  })
}

/**
 * 查看商品列表
 */
export const getProductsRequest = id => {
  return axios({
    method: 'get',
    url: 'tkTools/getProducts',
    params: {id}
  })
}
