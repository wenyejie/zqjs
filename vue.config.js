const Webpack = require('webpack')
const mock = require('./mock/index')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new Webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },

  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],

  productionSourceMap: isDev,

  css: {

    // css
    modules: false,
    sourceMap: isDev,
    extract: false,
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";'
      }
    }
  },

  lintOnSave: 'error',

  devServer: {
    port: 8889,
    before (app) {
      mock.init(app)
    },
    proxy: {
      '/api': {
        target: 'http://test.zhiqicloud.com:8770/',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  }
}
