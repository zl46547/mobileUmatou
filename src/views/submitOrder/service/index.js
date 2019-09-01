import {
  getCouponsRequest,
  getDefaultAddressRequest
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

/**
 * 获取默认地址
 * @param customerGuid
 */
export const getDefaultAddress = async customerGuid => {
  let {data} = await getDefaultAddressRequest(customerGuid)
  if (data.Data) {
    return data.Data
  }
  return null
}
