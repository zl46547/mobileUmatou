import {
  getTopicActivityRequest
} from '../api'

/**
 * 获取主题活动信息
 * @param params
 */
export const getTopicActivity = async params => {
  let {data} = await getTopicActivityRequest(params)
  if (data.data) {
    return data.data
  }
  return null
}
