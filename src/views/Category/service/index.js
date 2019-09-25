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
  try {
    let {data} = await getBigCategoryRequest()
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 获取小分类热门数据
 */
export const getHotCategory = async () => {
  try {
    let {data} = await getHotCategoryRequest()
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 获取小分类其他数据
 */
export const getSubCategory = async params => {
  try {
    let {data} = await getSubCategoryRequest(params)
    if (data.Data) {
      return data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}

/**
 * 获取分类轮播图图片
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
    console.error(e)
  }
}
