import {
  getHomeListRequest,
  addPoolRequest,
  deleteProductsRequest,
  changeHotRequest,
  getProductsRequest,
  uploadRequest,
  updateProductRequest,
  getProductDetailRequest,
  upAndDownProductRequest
} from '../api'
import {Toast} from 'vant'

Toast.setDefaultOptions({duration: 1000})

/**
 * 查询联联官网商品列表
 */
export const getHomeList = async params => {
  try {
    let res = await getHomeListRequest(params)
    if (res.data.data) {
      return res.data.data.list
    }
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 添加商品
 * @param data
 */
export const addPool = async data => {
  try {
    let res = await addPoolRequest(data)
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
 * 查询商品列表
 * @param customerGuid
 * @param status
 */
export const getProducts = async (customerGuid, status) => {
  try {
    let res = await getProductsRequest(customerGuid, status)
    if (res.data.Data) {
      return res.data.Data
    }
    return null
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
 * 擦亮商品
 * @param data
 */
export const changeHot = async data => {
  try {
    let res = await changeHotRequest(data)
    if (res.data.Data) {
      Toast.success('擦亮成功')
      return res.data.Data
    }
    Toast.fail('擦亮失败')
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
 * 上下架商品
 * @param data
 */
export const upAndDownProduct = async data => {
  try {
    let res = await upAndDownProductRequest(data)
    if (res.data.Data) {
      Toast.success(res.data.Data)
    } else {
      Toast.fail('操作失败')
    }
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
