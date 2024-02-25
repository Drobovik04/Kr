const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devtool: 'source-map',
  publicPath: process.env.BASE_URL,
  assetsDir: process.env.BASE_URL
})
