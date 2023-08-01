// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: config => {
        return {
            plugins: [new CompressionPlugin({
                test: /\.js$|\.html$|\.jpg$|\.css/,
                threshold: 10240,
                deleteOriginalAssets: false,
            })]
        }
    },
    devServer: {
        // host: "localhost", // 192.168.1.120
        // port: 8080, // 端口号
        // https: false, // https:{type:Boolean}
        // open: false, //配置自动启动浏览器
        // proxy: 'http://192.168.1.21:11001/' // 配置跨域处理,只有一个代理 http://106.14.146.38:8080/ http://localhost/
        proxy: 'http://106.14.146.38:8080/' // 配置跨域处理,只有一个代理 http://106.14.146.38:8080/ 

        // 配置多个代理
        // proxy: {
        //   "/api": {
        //     target: "http://192.168.1.117:11001/",// 要访问的接口域名
        //     ws: true,// 是否启用websockets
        //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        //     pathRewrite: {
        //         '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        //       }
        //   }
        // }
    }
}