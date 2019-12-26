import {
  addProductRequest,
  deleteProductsRequest,
  getProductsRequest,
  uploadRequest,
  updateProductRequest,
  getProductDetailRequest
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 添加商品
 * @param data
 */
export const addProduct = async data => {
  try {
    let res = await addProductRequest(data)
    if (res.data.Data) {
      Toast.success('添加成功')
      return res.data.Data
    }
    Toast.fail('添加失败')
  } catch (e) {
    console.error(e)
  }
}
/**
 * 删除商品
 * @param data
 */
export const deleteProducts = async data => {
  try {
    let res = await deleteProductsRequest(data)
    if (res.data.Data) {
      Toast.success('删除成功')
      return res.data.Data
    }
    Toast.fail('编辑失败')
  } catch (e) {
    console.error(e)
  }
}
/**
 * 编辑商品
 * @param data
 */
export const updateProduct = async data => {
  try {
    let res = await updateProductRequest(data)
    if (res.data.Data) {
      Toast.success('编辑成功')
      return res.data.Data
    }
    Toast.fail('编辑失败')
  } catch (e) {
    console.error(e)
  }
}
/**
 * 查看商品详情
 * @param id
 */
export const getProductDetail = async id => {
  try {
    let res = await getProductDetailRequest(id)
    if (res.data.Data) {
      return res.data.Data
    }
  } catch (e) {
    console.error(e)
  }
}
/**
 * 查询商品列表
 * @param id
 */
export const getProducts = async () => {
  try {
    let res = await getProductsRequest()
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
/**
 * 上传图片
 * @param file
 */
export const upload = async file => {
  try {
    let res = await uploadRequest(file)
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
