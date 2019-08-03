import {
  getSwipperRequest,
  getShortcutIconRequest,
  getFlashSaleRequest,
  getDefaultHomeRequest
} from '../api'

/**
 * 获取首页轮播图图片
 * @param params
 */
export const getSwipper = async params => {
  let {data} = await getSwipperRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取菜单数据
 */
export const getShortcutIcon = async () => {
  let {data} = await getShortcutIconRequest()
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取限时抢购数据
 */
export const getFlashSale = async () => {
  let {data} = await getFlashSaleRequest()
  if (data.Data) {
    return data.Data
  }
  return null
}
/**
 * 获取首页列表数据
 */
export const getDefaultHome = async () => {
  let {data} = await getDefaultHomeRequest()
  if (data.Data) {
    return data.Data
  }
  return null
}
