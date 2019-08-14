import {
  handleRegister,
  handleSignIn
} from '../api'

/**
 * 注册
 * @param data
 */
export const submitRegster = async data => {
  let res = await handleRegister(data)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
/**
 * 登录
 * @param data
 */
export const submitSignIn = async data => {
  let res = await handleSignIn(data)
  if (res.data.Data) {
    return res.data.Data
  }
  return null
}
