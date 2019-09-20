import {
  getTopicActivityRequest
} from '../api'
import { Toast } from 'vant'

/**
 * 获取主题活动信息
 * @param params
 */
export const getTopicActivity = async params => {
  try {
    let {data} = await getTopicActivityRequest(params)
    if (data.data) {
      return data.data
    }
    return null
  } catch (e) {
    Toast.fail('获取主题活动信息异常')
    console.log(e)
  }
}
