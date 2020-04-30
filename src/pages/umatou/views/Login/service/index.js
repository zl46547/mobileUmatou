import {
  handleRegister,
  handleSignIn
} from '../api'
import {Toast} from 'vant'
Toast.setDefaultOptions({duration: 1000})

/**
 * 注册
 * @param data
 */
export const submitRegster = async data => {
  try {
    let res = await handleRegister(data)
    if (res.data.Data) {
      Toast.success('注册成功')
      return res.data.Data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}
/**
 * 登录
 * @param data
 */
export const submitSignIn = async data => {
  try {
    let res = await handleSignIn(data)
    if (res.data.Data) {
      Toast.success('登陆成功')
      return res.data.Data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}
