import axios from '../../../http/api'

/**
 * 上传图片
 * @param file
 */
export const uploadRequest = file => {
  return axios({
    method: 'post',
    url: 'upload',
    data: file
  })
}

/**
 * 复制淘口令
 * @param data
 */
export const copyCodeRequest = data => {
  return axios({
    method: 'post',
    url: 'helpEach/copyCode',
    data
  })
}
/**
 * 添加商品
 * @param data
 */
export const addProductRequest = data => {
  return axios({
    method: 'post',
    url: 'helpEach/addProduct',
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
    url: 'helpEach/deleteProducts',
    data
  })
}

/**
 * 查看商品列表
 */
export const getProductsRequest = () => {
  return axios({
    method: 'get',
    url: 'helpEach/getProducts'
  })
}
