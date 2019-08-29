import {
  addCouponsRequest
} from '../api'

/**
 * 添加优惠券
 * @param data
 */
export const addCoupons = async data => {
  let res = await addCouponsRequest(data)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
