import axios from '../../../http/api'

/**
 * 获取首页轮播图图片
 * @param params
 */
export const getSwipperRequest = params => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/home/advertisementPhotoshoot',
    params
  })
}

/**
 * 获取菜单数据
 */
export const getShortcutIconRequest = () => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/home/shortcutIcon'
  })
}
/**
 * 获取限时抢购数据
 */
export const getFlashSaleRequest = () => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/home/flashSale'
  })
}

/**
 * 获取首页列表数据
 */
export const getDefaultHomeRequest = () => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/home/defaultHome'
  })
}
