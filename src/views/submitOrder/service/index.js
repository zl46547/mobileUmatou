import {
  getCouponsRequest
} from '../api'

/**
 * 获取优惠券列表
 * @param params
 */
export const getCoupons = async params => {
  let {data} = await getCouponsRequest(params)
  if (data.Data) {
    return data.Data
  }
  return []
}
