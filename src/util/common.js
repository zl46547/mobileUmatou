/**
 * 用于设置或者获取localStorage
 * @type {string}
 */
const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
export default {
  getLocal (key = STORAGE_USER_KEY) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    if (isSaveOldData) {
      if (this.getLocal(key)) {
        let oldData = this.getLocal(key)
        return window.localStorage.setItem(JSON.stringify(res.contain(oldData)))
      }
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
  }
}
