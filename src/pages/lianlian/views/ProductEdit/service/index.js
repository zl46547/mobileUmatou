import {
  getHomeListRequest,
  addPoolRequest,
  deleteProductsRequest,
  changeHotRequest,
  getProductsRequest
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

