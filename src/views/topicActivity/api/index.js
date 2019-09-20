import axios from '../../../http/api'

/**
 * 获取主题活动信息
 * @param params
 */
export const getTopicActivityRequest = params => {
  return axios({
    showLoading: true,
    method: 'get',
    url: '/topicInfo/getAdvisementData',
    params
  })
}
