module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://39.104.78.79', // 代理地址
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-pxtorem")({
                        rootValue: 16, // 换算的基数, 按设计稿的750/75
                        propList: ["*"]
                    })
                ]
            }
        }
    }
}
