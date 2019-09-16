import {
  getSwipperRequest,
  getShortcutIconRequest,
  getFlashSaleRequest,
  getDefaultHomeRequest
} from '../api'

import {Toast} from 'vant'
/**
 * 获取首页轮播图图片
 * @param params
 */
export const getSwipper = async params => {
  try {
    let {data} = await getSwipperRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取首页轮播图图片异常')
    console.log(e)
  }
}

/**
 * 获取菜单数据
 */
export const getShortcutIcon = async () => {
  try {
    let {data} = await getShortcutIconRequest()
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取菜单数据异常')
    console.log(e)
  }
}

/**
 * 获取限时抢购数据
 */
export const getFlashSale = async () => {
  try {
    let {data} = await getFlashSaleRequest()
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取限时抢购数据异常')
    console.log(e)
  }
}
/**
 * 获取首页列表数据
 */
export const getDefaultHome = async () => {
  try {
    let {data} = await getDefaultHomeRequest()
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    Toast.fail('获取首页列表数据异常')
    console.log(e)
  }
}
