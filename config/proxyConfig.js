module.exports = {
  proxy: {
    '/api': {    //将www.exaple.com印射为/apis
      target: 'http://192.168.1.105:5000',  // 家里mac
      // target: 'http://192.168.1.101:5000',  // 公司mac
      // target: 'http://193.112.12.183:5000',  // 线上域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    }
  }
}
