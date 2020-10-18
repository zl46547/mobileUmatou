import axios from '../../../../../http/api'


/**
 * 上传图片
 * @param file
 */
export const uploadRequest = file => {
  return axios({
    method: 'post',
    url: 'upload',
    data: file
  })
}
