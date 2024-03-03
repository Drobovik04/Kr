const { defineConfig } = require('@vue/cli-service')
const CopyPlugin = require('copy-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
        //? '/modals/' //production
        ? '' //for local machine
        : '/',
  assetsDir: 'images',
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/images', to: 'images' }
        ]
      })
    ]
  }
})
