import {
  getProductDetailRequest,
  getRateListRequest,
  getRateStatisticsRequest,
  submitAddGoods,
  getCartCount,
  addCollectRequest,
  productIsCollectRequest
} from '../api'
import {Toast} from 'vant'
/**
 * 获取商品详情
 */
export const getProductDetail = async params => {
  try {
    let {data} = await getProductDetailRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取商品详情异常')
    console.log(e)
  }
}

/**
 * 获取评论列表
 */
export const getRateList = async params => {
  try {
    let {data} = await getRateListRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取评论列表异常')
    console.log(e)
  }
}

/**
 * 获取评论基础数据
 */
export const getRateStatistics = async params => {
  try {
    let {data} = await getRateStatisticsRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取评论基础数据异常')
    console.log(e)
  }
}

/**
 * 加入购物车
 */
export const handleAddGoods = async params => {
  try {
    let {data} = await submitAddGoods(params)
    if (data.Data) {
      Toast.success('加入成功')
      return data.Data
    }
    Toast.fail('加入失败')
    return null
  } catch (e) {
    Toast.fail('加入购物车异常')
    console.log(e)
  }
}

/**
 * 获取购物车数量
 */
export const fetchCartCount = async params => {
  try {
    let {data} = await getCartCount(params)
    if (data.Data) {
      return data.Data.count
    }
    return 0
  } catch (e) {
    Toast.fail('获取购物车数量异常')
    console.log(e)
  }
}

/**
 * 加入收藏
 */
export const addCollect = async params => {
  try {
    let {data} = await addCollectRequest(params)
    if (data.Data) {
      Toast.success('收藏成功')
    }
    return data.Data
  } catch (e) {
    Toast.fail('收藏异常')
    console.log(e)
  }
}

/**
 * 判断商品是否已收藏
 */
export const productIsCollect = async params => {
  try {
    let {data} = await productIsCollectRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('判断商品是否已收藏异常')
    console.log(e)
  }
}
