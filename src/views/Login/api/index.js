import axios from '../../../http/api'

/**
 * 注册
 * @param data
 */
export const handleRegister = data => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

/**
 * 登录
 * @param data
 */
export const handleSignIn = data => {
  return axios({
    method: 'post',
    url: '/signIn',
    data
  })
}
