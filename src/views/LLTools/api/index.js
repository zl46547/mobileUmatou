import axios from '../../../http/api'

/**
 * 添加商品
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
 * 上传图片
 * @param data
 */
export const uploadRequest = file => {
  return axios({
    method: 'post',
    url: 'upload',
    data: file
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
