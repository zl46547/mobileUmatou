import axios from '../http/api'

/**
 * 获取微信配置
 * @param url
 */
export const getWxJsSdk = url => {
  return axios({
    method: 'get',
    url: '/wx/getWxConfig',
    params:{
      url
    }
  })
}
