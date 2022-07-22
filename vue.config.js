const { defineConfig } = require('@vue/cli-service')
const isPord = process.env.NODE_ENV === 'production'
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: isPord ? './' : '/',  //处理 相对路径问题
  productionSourceMap: false  // 优化不要map文件
})
