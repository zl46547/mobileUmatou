import { uploadRequest } from '../../AddUser/api'

/**
 * 上传图片
 * @param file
 */
export const upload = async file => {
  try {
    let res = await uploadRequest(file)
    if (res.data.Data) {
      return res.data.Data
    }
    return null
  } catch (e) {
    console.error(e)
  }
}
