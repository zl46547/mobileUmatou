import {
  getsearchCollectRequest,
  deleteCollectRequest
} from '../api'
import { Toast } from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 获取收藏列表
 */
export const getsearchCollect = async () => {
  try {
    let {data} = await getsearchCollectRequest()
    if (data.Data) {
      return data.Data
    }
    return []
  } catch (e) {
    console.log(e)
  }
}

/**
 * 删除收藏列表
 */
export const deleteCollect = async productId => {
  try {
    let {data} = await deleteCollectRequest(productId)
    if (data.Data) {
      Toast.success('删除成功')
      return data.Data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}
