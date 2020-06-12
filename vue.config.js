module.exports = {
    productionSourceMap: false,
    publicPath: './',
    // where to put static assets (js/css/img/font/...)
    // 是否在保存时使用‘eslint-loader’进行检查
    // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    outputDir: process.env.DIST_NAME,
    assetsDir: 'static',
    pages: {
        assist: {
            entry: './src/pages/assist/assist.js',
            title: '助力',
            template: 'public/assist.html',
            filename: 'assist.html',
            chunks: ['chunk-vendors', 'chunk-common', 'assist']
        },
        lianlian: {
            entry: './src/pages/lianlian/lianlian.js',
            title: '联联周边',
            template: 'public/lianlian.html',
            filename: 'lianlian.html',
            chunks: ['chunk-vendors', 'chunk-common', 'lianlian']
        },
        umatou: {
            entry: './src/pages/umatou/umatou.js',
            title: '优鲜码头',
            template: 'public/umatou.html',
            filename: 'umatou.html',
            chunks: ['chunk-vendors', 'chunk-common', 'umatou']
        },
        alliance: {
            entry: './src/pages/alliance/alliance.js',
            title: '联盟',
            template: 'public/alliance.html',
            filename: 'alliance.html',
            chunks: ['chunk-vendors', 'chunk-common', 'alliance']
        },
        index: {
            entry: './src/pages/index/index.js',
            title: '首页',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    devServer: {
        proxy: {
            '/api': {    //将www.exaple.com印射为/apis
                // target: 'http://192.168.1.101:5000',  // 家里mac
                target: 'http://10.1.44.233:5000',  // 公司mac
                // target: 'http://193.112.12.183:5000',  // 线上域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''   //需要rewrite的,
                }
            }
        }
    }
};
