import {
  getBigCategoryRequest,
  getHotCategoryRequest,
  getSubCategoryRequest,
  getSwipperRequest
} from '../api'

/**
 * 获取大分类数据
 */
export const getBigCategory = async () => {
  let {data} = await getBigCategoryRequest()
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取小分类热门数据
 */
export const getHotCategory = async () => {
  let {data} = await getHotCategoryRequest()
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取小分类其他数据
 */
export const getSubCategory = async params => {
  let {data} = await getSubCategoryRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}

/**
 * 获取分类轮播图图片
 * @param params
 */
export const getSwipper = async params => {
  let {data} = await getSwipperRequest(params)
  if (data.Data) {
    return data.Data
  }
  return null
}
