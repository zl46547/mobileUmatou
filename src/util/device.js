/* eslint-disable */
const ua = window.navigator.userAgent
const verIOS = ua.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
const verAndroid = ua.toLowerCase().match(/android\s([0-9.]*)/)
const verShiHang = ua.toLowerCase().match(/shihang_app_v([0-9.]*)/)
const verWxDevTool = ua.toLowerCase().match(/wechatdevtools\/(.*?)/)
const device = {
  IOS: /(iPhone|iPad|iPod|iOS)/gi.test(ua),
  IPAD: ua.toLowerCase().match(/iPad/i) === 'ipad',
  IOSVersion: (verIOS && verIOS[1].replace(/_/g, '.')) || -1,
  Android: /android|adr/gi.test(ua),
  AndroidVersion: (verAndroid && verAndroid[1]) || -1,
  Mobile: /(iPhone|iPad|iPod|iOS|Android|adr|Windows Phone|SymbianOS)/gi.test(
    ua
  ),
  Wechat: /MicroMessenger/i.test(ua),
  WeMini: /(iPhone|iPad|iPod|iOS)/gi.test(ua)
    ? window.__wxjs_environment === 'miniprogram'
    : /android|adr/gi.test(ua)
    ? /miniProgram/i.test(ua)
    : false,
  ShiHangApp: /shihang_app/.test(ua.toLowerCase()),
  ShiHangAppVersion: (verShiHang && verShiHang[1]) || -1,
  WxTool: /wechatdevtools/.test(ua.toLowerCase()),
  WxToolVersion: (verWxDevTool && verWxDevTool[1]) || -1,
  Aplipay: navigator.userAgent.indexOf('AlipayClient') > -1,
}
export default device
