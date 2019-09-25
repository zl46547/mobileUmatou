import {
  addCouponsRequest
} from '../api'
import {Toast} from 'vant'
/**
 * 添加优惠券
 * @param data
 */
export const addCoupons = async data => {
  try {
    let res = await addCouponsRequest(data)
    if (res.data.Data) {
      Toast.success('添加成功')
      return res.data.Data
    }
    Toast.fail('添加失败')
    return null
  } catch (e) {
    console.log(e)
  }
}
