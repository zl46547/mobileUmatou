module.exports = {
  proxy: {
    '/api': {    //将www.exaple.com印射为/apis
      // target: 'http://193.112.12.183:5000',  // 接口域名
      target: 'http://192.168.1.103:5000',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    }
  }
}
