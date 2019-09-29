import axios from '../../../http/api'

/**
 * 获取大分类数据
 */
export const getBigCategoryRequest = () => {
  return axios({
    method: 'get',
    url: '/products/bigCategory'
  })
}

/**
 * 获取小分类热门数据
 */
export const getHotCategoryRequest = () => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/products/hotCategory'
  })
}

/**
 * 获取小分类其他分类数据
 */
export const getSubCategoryRequest = params => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/products/subCategory',
    params
  })
}

/**
 * 获取分类页轮播图图片
 * @param params
 */
export const getSwipperRequest = params => {
  return axios({
    method: 'get',
    url: '/home/advertisementPhotoshoot',
    params
  })
}
