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
 * 上下架商品
 * @param data
 */
export const upAndDownProductRequest = data => {
  return axios({
    method: 'post',
    url: 'tkTools/upAndDownProduct',
    data
  })
}

/**
 * 查看商品详情
 * @param id
 */
export const getProductDetailRequest = id => {
  return axios({
    method: 'get',
    url: 'tkTools/getProductDetail',
    params: {id}
  })
}

/**
 * 查看商品列表
 */
export const getProductsRequest = (customerGuid, status) => {
  return axios({
    method: 'get',
    url: 'tkTools/getProducts',
    params: {customer_guid: customerGuid, status}
  })
}

/**
 * 查看选品分类
 */
export const getFavoritesRequest = () => {
  return axios({
    method: 'get',
    url: 'tkTools/getFavorites'
  })
}

/**
 * 查看选品列表
 */
export const getFavoritesItemRequest = params => {
  return axios({
    method: 'get',
    url: 'tkTools/getFavoritesItem',
    params
  })
}
