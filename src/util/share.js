import wx from "wx-jssdk-ts"
import { getWxJsSdk } from "./wxConfig"

export default class Share {
  constructor (data, cb) {
    this.shareData = data
    // this.isForbidden = isForbidden
    this.cb = cb
  }

  static init (data, cb) {
    return new this(data, cb)
  }

  isWx () {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
  }

  isAplipay () {
    return navigator.userAgent.indexOf("AlipayClient") > -1
  }

  execute () {
    this.onWxConfig()
    // if (this.isWx()) {
    //   if (wx.miniProgram) {
    //     this.setMiniProgramShare()
    //   }
    //   return this.onWxConfig()
    // } else {
    //   return Promise.resolve()
    // }
  }

  async onWxConfig () {
    const url = window.location.href.split("#")[0]
    const data = await getWxJsSdk(url)
    if (data.status === 200) {
      const wxConfigs = data.data
      wx.config({
        debug: false,
        appId: wxConfigs.appId,
        timestamp: wxConfigs.timestamp,
        nonceStr: wxConfigs.nonceStr,
        signature: wxConfigs.signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareQQ",
          "onMenuShareAppMessage",
          "showOptionMenu",
          "hideMenuItems",
          "hideOptionMenu",
          "getLocation",
          "chooseWXPay"
        ]
      })
    }
    this.shareData.isForbidden ? this.onWxForbidden() : this.onWxShareInit()
  }

  onWxShareInit () {
    const _self = this
    console.log(wx)
    wx.ready(() => {
      wx.showOptionMenu()
      wx.hideMenuItems({
        menuList: [
          "menuItem:share:timeline",
          // "menuItem:share:qq",
          "menuItem:share:weiboApp",
          "menuItem:share:facebook",
          "menuItem:share:QZone",
          "menuItem:share:email",
          "menuItem:openWithSafari",
          "menuItem:openWithQQBrowser",
          "menuItem:readMode",
          "menuItem:originPage",
          "menuItem:copyUrl",
          "menuItem:delete",
          "menuItem:editTag",
          "menuItem:favorite",
          "menuItem:share:brand",
          "menuItem:profile",
          "menuItem:addContact"
        ]
      })
      wx.onMenuShareAppMessage({
        title: _self.shareData.title,
        link: _self.shareData.link,
        desc: _self.shareData.desc,
        imgUrl: _self.shareData.imgUrl,
        success: function () {
          _self.cb(1, { type: "微信好友", message: "wx share success" })
        },
        cancel: function () {
          _self.cb(0, { type: "微信好友", message: "wx share cancel" })
        }
      })
      wx.onMenuShareTimeline({
        title: _self.shareData.title,
        link: _self.shareData.link,
        desc: _self.shareData.desc,
        imgUrl: _self.shareData.imgUrl,
        success: function () {
          _self.cb(1, { type: "朋友圈", message: "wx share success" })
        },
        cancel: function () {
          _self.cb(0, { type: "朋友圈", message: "wx share cancel" })
        }
      })
    })
  }

  onWxForbidden () {
    // const _self = this
    wx.ready(() => {
      wx.hideOptionMenu()
    })
  }

  miniProgramShareInfo (share) {
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        wx.miniProgram.postMessage({
          data: { share }
        })
      }
    })
  }

  setMiniProgramShare () {
    this.miniProgramShareInfo({
      title: this.shareData.title, // 分享title
      imageUrl: this.shareData.imgUrl, // 分享主图
      path: this.shareData.link // 分享链接
    })
  }

  setAplipayShare () {
    window.my.getEnv(res => {
      if (res.miniprogram || res.miniProgram) {
        window.my.postMessage({
          type: "share",
          value: {
            bgImgUrl: this.shareData.imgUrl,
            title: this.shareData.title,
            path: this.shareData.link
          }
        })
      }
    })
  }
}
